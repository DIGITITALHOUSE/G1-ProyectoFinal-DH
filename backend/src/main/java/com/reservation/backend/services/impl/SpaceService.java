package com.reservation.backend.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reservation.backend.dtos.*;
import com.reservation.backend.entities.Space;
import com.reservation.backend.entities.SpaceType;
import com.reservation.backend.exceptions.NotFoundException;
import com.reservation.backend.repositories.ISpaceRepository;
import com.reservation.backend.repositories.ISpaceTypeRepository;
import com.reservation.backend.services.ISpaceImageService;
import com.reservation.backend.services.ISpaceService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

@Service
public class SpaceService implements ISpaceService {
    private static final Logger logger = Logger.getLogger(SpaceService.class);
    private final ISpaceRepository spaceRepository;
    private final ISpaceTypeRepository spaceTypeRepository;

    private final ISpaceImageService spaceImageService;
    private final ObjectMapper objectMapper;

    public SpaceService(ISpaceRepository spaceRepository, ISpaceTypeRepository spaceTypeRepository, ISpaceImageService spaceImageService, ObjectMapper objectMapper) {
        this.spaceRepository = spaceRepository;
        this.spaceTypeRepository = spaceTypeRepository;
        this.spaceImageService = spaceImageService;
        this.objectMapper = objectMapper;
    }

    @Override
    public SpaceResponseDto create(SpaceRequestDto spaceRequestDto) {
        logger.info("Creating space :" + spaceRequestDto.getName());
        Space space = mapToEntity(spaceRequestDto);
        space = spaceRepository.save(space);
        SpaceResponseDto spaceResponseDto = mapToDto(space);

        if (spaceRequestDto.getImages() != null) {
            SpaceImageRequestDto spaceImageRequestDto = new SpaceImageRequestDto();
            spaceImageRequestDto.setImages(spaceRequestDto.getImages());
            spaceImageRequestDto.setSpaceId(space.getId());
            List<SpaceImageResponseDto> images = spaceImageService.save(spaceImageRequestDto);
            spaceResponseDto.setSpaceImages(images);
        }

        logger.info("Space created: "+ space.getName());
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
        logger.info("Finding space by id: "+ id);
        Space space = spaceRepository.findById(id).orElseThrow(
                () -> {
                    logger.error("Space with id: "+ id + " not found");
                    return new NotFoundException("Space with id " + id + " not found");
                }
        );
        logger.info("Space found with id: "+ id);
        return mapToDto(space);
    }

    @Override
    public SpaceResponseDto update(Long id, SpaceRequestToUpdateDto spaceRequestToUpdateDto) {
        logger.info("Updating space by id: "+ id);

        Space space = spaceRepository.findById(id).orElseThrow(
                () -> {
                    logger.error("Space with id: "+ id + " not found");
                    return new NotFoundException("Space with id " + id + " not found");
                }
        );
        if(spaceRequestToUpdateDto.getName() != null) space.setName(spaceRequestToUpdateDto.getName());
        if(spaceRequestToUpdateDto.getDescription() != null) space.setDescription(spaceRequestToUpdateDto.getDescription());
        if(spaceRequestToUpdateDto.getCapacity() != null) space.setCapacity(spaceRequestToUpdateDto.getCapacity());
        if(spaceRequestToUpdateDto.getHourPrice() != null) space.setHourPrice(spaceRequestToUpdateDto.getHourPrice());
        if(spaceRequestToUpdateDto.getDirection() != null) space.setDirection(spaceRequestToUpdateDto.getDirection());
        if(spaceRequestToUpdateDto.getLocality() != null) space.setLocality(spaceRequestToUpdateDto.getLocality());
        if(spaceRequestToUpdateDto.getRegion() != null) space.setRegion(spaceRequestToUpdateDto.getRegion());
        if(spaceRequestToUpdateDto.getCountry() != null) space.setCountry(spaceRequestToUpdateDto.getCountry());
        if(spaceRequestToUpdateDto.getZipCode() != null) space.setZipCode(spaceRequestToUpdateDto.getZipCode());
        if(spaceRequestToUpdateDto.getState() != null) space.setState(spaceRequestToUpdateDto.getState());

        space = spaceRepository.save(space);
        logger.info("Space updated with id: "+ id);
        return mapToDto(space);
    }

    @Override
    public void delete(Long id) {
        logger.info("Deleting space by id: "+ id);
        Optional<Space> spaceFind = spaceRepository.findById(id);
        if (spaceFind.isEmpty()) {
            throw new NotFoundException("Space with id " + id + " not found");
        }
        spaceRepository.deleteById(id);
        logger.info("Space deleted with id: "+ id);
    }

    private SpaceResponseDto mapToDto(Space space) {
        SpaceResponseDto spaceResponseDto = new SpaceResponseDto();
        spaceResponseDto.setId(space.getId());
        spaceResponseDto.setName(space.getName());
        spaceResponseDto.setDescription(space.getDescription());
        spaceResponseDto.setCapacity(space.getCapacity());
        spaceResponseDto.setHourPrice(space.getHourPrice());
        spaceResponseDto.setDirection(space.getDirection());
        spaceResponseDto.setLocality(space.getLocality());
        spaceResponseDto.setRegion(space.getRegion());
        spaceResponseDto.setCountry(spaceResponseDto.getCountry());
        spaceResponseDto.setZipCode(space.getZipCode());
        spaceResponseDto.setState(space.getState());

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
        space.setLocality(spaceRequestDto.getLocality());
        space.setRegion(spaceRequestDto.getRegion());
        space.setCountry(spaceRequestDto.getCountry());
        space.setZipCode(spaceRequestDto.getZipCode());
        space.setState(spaceRequestDto.getState());

        if (spaceRequestDto.getSpaceTypeId() != null) {
            Optional<SpaceType> spaceTypeOptional = spaceTypeRepository.findById(spaceRequestDto.getSpaceTypeId());
            spaceTypeOptional.ifPresent(space::setSpaceType);
        }

        return space;
    }
}
