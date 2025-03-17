package com.reservation.backend.services.impl;

import com.reservation.backend.dtos.*;
import com.reservation.backend.entities.Space;
import com.reservation.backend.entities.SpaceType;
import com.reservation.backend.exceptions.NotFoundException;
import com.reservation.backend.repositories.ISpaceRepository;
import com.reservation.backend.repositories.ISpaceTypeRepository;
import com.reservation.backend.services.ISpaceImageService;
import com.reservation.backend.services.ISpaceService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpaceService implements ISpaceService {
    private static final Logger logger = Logger.getLogger(SpaceService.class);
    private final ISpaceRepository spaceRepository;
    private final ISpaceTypeRepository spaceTypeRepository;
    private final ISpaceImageService spaceImageService;

    public SpaceService(ISpaceRepository spaceRepository, ISpaceTypeRepository spaceTypeRepository, ISpaceImageService spaceImageService) {
        this.spaceRepository = spaceRepository;
        this.spaceTypeRepository = spaceTypeRepository;
        this.spaceImageService = spaceImageService;
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
                }
        );
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
                }
        );

        // Actualización de campos
        if (spaceRequestToUpdateDto.getName() != null) space.setName(spaceRequestToUpdateDto.getName());
        if (spaceRequestToUpdateDto.getDescription() != null) space.setDescription(spaceRequestToUpdateDto.getDescription());
        if (spaceRequestToUpdateDto.getCapacity() != null) space.setCapacity(spaceRequestToUpdateDto.getCapacity());
        if (spaceRequestToUpdateDto.getHourPrice() != null) space.setHourPrice(spaceRequestToUpdateDto.getHourPrice());
        if (spaceRequestToUpdateDto.getDirection() != null) space.setDirection(spaceRequestToUpdateDto.getDirection());
        if (spaceRequestToUpdateDto.getCity() != null) space.setCity(spaceRequestToUpdateDto.getCity());
        if (spaceRequestToUpdateDto.getCountry() != null) space.setCountry(spaceRequestToUpdateDto.getCountry());
        if (spaceRequestToUpdateDto.getZipCode() != null) space.setZipCode(spaceRequestToUpdateDto.getZipCode());
        if (spaceRequestToUpdateDto.getState() != null) space.setState(spaceRequestToUpdateDto.getState());
        if (spaceRequestToUpdateDto.getExtras() != null) space.setExtras(spaceRequestToUpdateDto.getExtras().toString());

        // Actualización del campo "icono"
        if (spaceRequestToUpdateDto.getIcono() != null) space.setIcono(spaceRequestToUpdateDto.getIcono());

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
            List<SpaceImageResponseDto> spaceImageResponseDtoList = spaceImageService.findAll(Optional.of(space.getId()));
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

        // Establecer el campo "icono" si se proporciona
        space.setIcono(spaceRequestDto.getIcono());

        if (spaceRequestDto.getSpaceTypeId() != null) {
            Optional<SpaceType> spaceTypeOptional = spaceTypeRepository.findById(spaceRequestDto.getSpaceTypeId());
            spaceTypeOptional.ifPresent(space::setSpaceType);
        }

        return space;
    }
}
