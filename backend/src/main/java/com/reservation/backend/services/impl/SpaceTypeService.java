package com.reservation.backend.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
// import com.reservation.backend.dtos.SpaceResponseDto;
import com.reservation.backend.dtos.SpaceTypeRequestDto;
import com.reservation.backend.dtos.SpaceTypeRequestToUpdateDto;
import com.reservation.backend.dtos.SpaceTypeResponseDto;
// import com.reservation.backend.entities.Space;
import com.reservation.backend.entities.SpaceType;
import com.reservation.backend.exceptions.NotFoundException;
import com.reservation.backend.repositories.ISpaceTypeRepository;
import com.reservation.backend.services.ISpaceTypeService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;

import java.util.List;
import java.util.Optional;

@Service
public class SpaceTypeService implements ISpaceTypeService {
    private static final Logger  logger = Logger.getLogger(SpaceTypeService.class);
    private final ISpaceTypeRepository spaceTypeRepository;
    private final ObjectMapper objectMapper;

    public SpaceTypeService(ISpaceTypeRepository spaceTypeRepository, ObjectMapper objectMapper) {
        this.spaceTypeRepository = spaceTypeRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public SpaceTypeResponseDto create(SpaceTypeRequestDto spaceTypeRequestDto) {
        logger.info("Creating space type: " + spaceTypeRequestDto.getName());
        SpaceType spaceType = mapToEntity(spaceTypeRequestDto);
        spaceType = spaceTypeRepository.save(spaceType);
        logger.info("Space type created: " + spaceType.getName());
        return mapToDto(spaceType);
    }

    @Override
    public List<SpaceTypeResponseDto> findAll() {
        logger.info("Finding all space type");
        List<SpaceTypeResponseDto> spaceTypes = spaceTypeRepository.findAll().stream()
                .map(this::mapToDto)
                .toList();

        logger.info("Space type found: "+ spaceTypes.size());
        return  spaceTypes;
    }

    @Override
    public SpaceTypeResponseDto findById(Long id) {
        logger.info("Finding space type by id: "+ id);
        SpaceType spaceType = spaceTypeRepository.findById(id).orElseThrow(
                () -> {
                    logger.error("Space type with id: "+ id + " not found");
                    return new NotFoundException("Space type with id " + id + " not found");
                }
        );
        logger.info("Space type found with id: "+ id);
        return mapToDto(spaceType);
    }

    @Override
    @Transactional
    public SpaceTypeResponseDto update(Long id, SpaceTypeRequestToUpdateDto spaceTypeRequestToUpdateDto) {
        logger.info("Updating space by id: "+ id);

        SpaceType spaceType = spaceTypeRepository.findById(id).orElseThrow(
                () -> {
                    logger.error("Space type with id: "+ id + " not found");
                    return new NotFoundException("Space type with id " + id + " not found");
                }
        );

        if (spaceTypeRequestToUpdateDto.getName() != null) spaceType.setName(spaceTypeRequestToUpdateDto.getName());

        spaceType = spaceTypeRepository.save(spaceType);

        logger.info("Space type updated with id: "+ id);

        return mapToDto(spaceType);
    }

    @Override
    public void delete(Long id) {
        logger.info("Deleting space type by id: "+ id);
        Optional<SpaceType> spaceTypeFind = spaceTypeRepository.findById(id);
        if (spaceTypeFind.isEmpty()) {
            throw new NotFoundException("Space type with id " + id + " not found");
        }
        spaceTypeRepository.deleteById(id);
        logger.info("Space type deleted with id: "+ id);
    }

    private SpaceTypeResponseDto mapToDto(SpaceType spaceType) {
        return objectMapper.convertValue(spaceType, SpaceTypeResponseDto.class);
    }

    private SpaceType mapToEntity(SpaceTypeRequestDto spaceTypeRequestDto) {
        return objectMapper.convertValue(spaceTypeRequestDto, SpaceType.class);
    }
}
