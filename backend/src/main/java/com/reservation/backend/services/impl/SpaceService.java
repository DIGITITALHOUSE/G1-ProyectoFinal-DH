package com.reservation.backend.services.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.reservation.backend.dtos.*;
import com.reservation.backend.entities.Reservation;
import com.reservation.backend.entities.Space;
import com.reservation.backend.entities.SpaceType;
import com.reservation.backend.exceptions.NotFoundException;
import com.reservation.backend.repositories.IReservationRepository;
import com.reservation.backend.repositories.ISpaceRepository;
import com.reservation.backend.repositories.ISpaceTypeRepository;
import com.reservation.backend.services.ISpaceImageService;
import com.reservation.backend.services.ISpaceService;
import com.reservation.backend.specifications.SpaceSpecifications;

import org.apache.log4j.Logger;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SpaceService implements ISpaceService {
    private static final Logger logger = Logger.getLogger(SpaceService.class);
    private final ISpaceRepository spaceRepository;
    private final ISpaceTypeRepository spaceTypeRepository;
    private final ISpaceImageService spaceImageService;
    private final IReservationRepository reservationRepository;

    public SpaceService(ISpaceRepository spaceRepository, ISpaceTypeRepository spaceTypeRepository,
            ISpaceImageService spaceImageService, IReservationRepository reservationRepository) {
        this.spaceRepository = spaceRepository;
        this.spaceTypeRepository = spaceTypeRepository;
        this.spaceImageService = spaceImageService;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public SpaceResponseDto create(SpaceRequestDto spaceRequestDto) {
        logger.info("Creating space with name: " + spaceRequestDto.getName());

        // Mapeo de DTO a entidad
        Space space = mapToEntity(spaceRequestDto);

        // Guardamos el espacio
        space = spaceRepository.save(space);

        SpaceResponseDto spaceResponseDto = mapToDto(space);

        // Guardar imágenes asociadas si las hay
        if (spaceRequestDto.getImages() != null) {
            SpaceImageRequestDto spaceImageRequestDto = new SpaceImageRequestDto();
            spaceImageRequestDto.setImages(spaceRequestDto.getImages());
            spaceImageRequestDto.setSpaceId(space.getId());
            List<SpaceImageResponseDto> images = spaceImageService.save(spaceImageRequestDto);
            spaceResponseDto.setSpaceImages(images);
        }

        logger.info("Space created with id: " + space.getId());
        return spaceResponseDto;
    }

    @Override
    public List<SpaceResponseDto> findAll() {
        logger.info("Finding all spaces");
        List<SpaceResponseDto> spaces = spaceRepository.findAll().stream()
                .map(this::mapToDto)
                .toList();
        logger.info("Spaces found: " + spaces.size());
        return spaces;
    }

    @Override
    public SpaceResponseDto findById(Long id) {
        logger.info("Finding space by id: " + id);
        Space space = spaceRepository.findById(id).orElseThrow(
                () -> {
                    logger.error("Space with id: " + id + " not found");
                    return new NotFoundException("Space with id " + id + " not found");
                });
        logger.info("Space found with id: " + id);
        return mapToDto(space);
    }

    @Override
    public SpaceResponseDto update(Long id, SpaceRequestToUpdateDto spaceRequestToUpdateDto) {
        logger.info("Updating space with id: " + id);

        Space space = spaceRepository.findById(id).orElseThrow(
                () -> {
                    logger.error("Space with id: " + id + " not found");
                    return new NotFoundException("Space with id " + id + " not found");
                });

        // Actualización de campos
        if (spaceRequestToUpdateDto.getName() != null)
            space.setName(spaceRequestToUpdateDto.getName());
        if (spaceRequestToUpdateDto.getDescription() != null)
            space.setDescription(spaceRequestToUpdateDto.getDescription());
        if (spaceRequestToUpdateDto.getCapacity() != null)
            space.setCapacity(spaceRequestToUpdateDto.getCapacity());
        if (spaceRequestToUpdateDto.getHourPrice() != null)
            space.setHourPrice(spaceRequestToUpdateDto.getHourPrice());
        if (spaceRequestToUpdateDto.getDirection() != null)
            space.setDirection(spaceRequestToUpdateDto.getDirection());
        if (spaceRequestToUpdateDto.getCity() != null)
            space.setCity(spaceRequestToUpdateDto.getCity());
        if (spaceRequestToUpdateDto.getCountry() != null)
            space.setCountry(spaceRequestToUpdateDto.getCountry());
        if (spaceRequestToUpdateDto.getZipCode() != null)
            space.setZipCode(spaceRequestToUpdateDto.getZipCode());
        if (spaceRequestToUpdateDto.getState() != null)
            space.setState(spaceRequestToUpdateDto.getState());
        if (spaceRequestToUpdateDto.getExtras() != null)
            space.setExtras(spaceRequestToUpdateDto.getExtras().toString());

        // Actualización del campo "icono"
        if (spaceRequestToUpdateDto.getIcono() != null)
            space.setIcono(spaceRequestToUpdateDto.getIcono());

        space = spaceRepository.save(space);
        logger.info("Space updated with id: " + id);
        return mapToDto(space);
    }

    @Override
    public void delete(Long id) {
        logger.info("Deleting space with id: " + id);
        Optional<Space> spaceFind = spaceRepository.findById(id);
        if (spaceFind.isEmpty()) {
            throw new NotFoundException("Space with id " + id + " not found");
        }
        spaceRepository.deleteById(id);
        logger.info("Space deleted with id: " + id);
    }

    @Override
    public List<SpaceResponseDto> searchSpaces(String keyword, LocalDate date, Long spaceTypeId) {
        logger.info("Searching spaces by keyword: " + keyword + ", date: " + date + ", spaceTypeId: " + spaceTypeId);
        // Split the keyword into individual words by ", "
        String[] keywords = keyword.split(", ");
        Specification<Space> specs = Specification.where(SpaceSpecifications.filterByKeyword(keywords[0]))
                .or(SpaceSpecifications.filterByCountry(keywords[1]))
                .and(SpaceSpecifications.includeAvailableSpaces(date))
                .and(SpaceSpecifications.filterBySpaceType(spaceTypeId));

        List<SpaceResponseDto> spaces = spaceRepository.findAll(specs).stream()
                .map(this::mapToDto)
                .toList();
        logger.info("Spaces found: " + spaces.size());
        return spaces;
    }

    @Override
    public JsonNode checkAvailability(Long spaceId, LocalDate date) {
        logger.info("Checking availability for space with id: " + spaceId + " and date: " + date);
        Space space = spaceRepository.findById(spaceId).orElseThrow(
                () -> {
                    logger.error("Space with id: " + spaceId + " not found");
                    return new NotFoundException("Space with id " + spaceId + " not found");
                });
        List<Reservation> reservations = reservationRepository.findBySpace_IdAndReservationDate(spaceId, date);
        List<ObjectNode> availability = new ArrayList<>();

        LocalTime openAt = space.getOpenAt().toLocalTime();
        LocalTime closeAt = space.getCloseAt().toLocalTime();

        while (!openAt.isAfter(closeAt.minusHours(1))) {
            LocalTime currentHour = openAt;

            // Comprobar si este horario está ocupado por alguna reserva
            boolean isAvailable = reservations.stream().noneMatch(reservation -> {
                LocalTime reservationStart = reservation.getStartHour().toLocalTime();
                LocalTime reservationEnd = reservation.getEndHour().toLocalTime();
                return !currentHour.isBefore(reservationStart) && currentHour.isBefore(reservationEnd);
            });

            // Crear un nodo JSON con la hora y la disponibilidad
            ObjectNode hourNode = JsonNodeFactory.instance.objectNode();
            hourNode.put("hour", currentHour.toString());
            hourNode.put("available", isAvailable);
            availability.add(hourNode);

            openAt = openAt.plusHours(1);
        }
        ObjectNode result = JsonNodeFactory.instance.objectNode();
        result.set("availability", JsonNodeFactory.instance.arrayNode().addAll(availability));
        return result;
    }

    @Override
    public List<String> getCityCountryRecommendations(String searchTerm) {
        logger.info("Getting city and country recommendations for search term: " + searchTerm);
        if (searchTerm == null || searchTerm.isEmpty()) {
            return new ArrayList<>();
        }
        return spaceRepository.findCityCountryBySearchTerm(searchTerm);
    }

    private SpaceResponseDto mapToDto(Space space) {
        SpaceResponseDto spaceResponseDto = new SpaceResponseDto();
        spaceResponseDto.setId(space.getId());
        spaceResponseDto.setName(space.getName());
        spaceResponseDto.setDescription(space.getDescription());
        spaceResponseDto.setCapacity(space.getCapacity());
        spaceResponseDto.setHourPrice(space.getHourPrice());
        spaceResponseDto.setDirection(space.getDirection());
        spaceResponseDto.setCity(space.getCity());
        spaceResponseDto.setCountry(space.getCountry());
        spaceResponseDto.setLatitude(space.getLatitude());
        spaceResponseDto.setLongitude(space.getLongitude());
        spaceResponseDto.setZipCode(space.getZipCode());
        spaceResponseDto.setState(space.getState());
        spaceResponseDto.setExtras(space.getExtras());
        spaceResponseDto.setOpenAt(space.getOpenAt());
        spaceResponseDto.setCloseAt(space.getCloseAt());

        // Mapeo del campo icono
        spaceResponseDto.setIcono(space.getIcono());

        if (space.getExtras() != null) {
            try {
                spaceResponseDto.setExtras(space.getExtras());
            } catch (Exception e) {
                logger.error("Error parsing extras JSON", e);
                spaceResponseDto.setExtras(null);
            }
        }

        if (space.getSpaceType() != null) {
            spaceResponseDto.setSpaceTypeName(space.getSpaceType().getName());
        }

        if (space.getSpaceImages() != null) {
            List<SpaceImageResponseDto> spaceImageResponseDtoList = spaceImageService
                    .findAll(Optional.of(space.getId()));
            spaceResponseDto.setSpaceImages(spaceImageResponseDtoList);
        }

        return spaceResponseDto;
    }

    private Space mapToEntity(SpaceRequestDto spaceRequestDto) {
        Space space = new Space();
        space.setName(spaceRequestDto.getName());
        space.setDescription(spaceRequestDto.getDescription());
        space.setCapacity(spaceRequestDto.getCapacity());
        space.setHourPrice(spaceRequestDto.getHourPrice());
        space.setDirection(spaceRequestDto.getDirection());
        space.setCity(spaceRequestDto.getCity());
        space.setCountry(spaceRequestDto.getCountry());
        space.setLatitude(spaceRequestDto.getLatitude());
        space.setLongitude(spaceRequestDto.getLongitude());
        space.setZipCode(spaceRequestDto.getZipCode());
        space.setState(spaceRequestDto.getState() != null ? spaceRequestDto.getState() : "Publicado");
        space.setExtras(spaceRequestDto.getExtras());
        // TODO Convertir las horas recibidas a Time, hardcoded
        space.setOpenAt(Time.valueOf("09:00:00"));
        space.setCloseAt(Time.valueOf("18:00:00"));
        // Establecer el campo "icono" si se proporciona
        space.setIcono(spaceRequestDto.getIcono());

        if (spaceRequestDto.getSpaceTypeId() != null) {
            Optional<SpaceType> spaceTypeOptional = spaceTypeRepository.findById(spaceRequestDto.getSpaceTypeId());
            spaceTypeOptional.ifPresent(space::setSpaceType);
        }

        return space;
    }
}
