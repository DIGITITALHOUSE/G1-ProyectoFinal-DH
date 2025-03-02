package com.reservation.backend.services.impl;

import com.reservation.backend.dtos.SpaceImageRequestDto;
import com.reservation.backend.dtos.SpaceImageResponseDto;
import com.reservation.backend.dtos.SpaceResponseDto;
import com.reservation.backend.entities.Space;
import com.reservation.backend.entities.SpaceImage;
import com.reservation.backend.exceptions.NotFoundException;
import com.reservation.backend.repositories.ISpaceImageRepository;
import com.reservation.backend.repositories.ISpaceRepository;
import com.reservation.backend.services.ISpaceImageService;
import org.springframework.stereotype.Service;


import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SpaceImageService implements ISpaceImageService {
    private static final Logger logger = Logger.getLogger(SpaceImageService.class);
    private final ISpaceImageRepository spaceImageRepository;
    private final ISpaceRepository spaceRepository;

    public SpaceImageService(ISpaceImageRepository spaceImageRepository, ISpaceRepository spaceRepository) {
        this.spaceImageRepository = spaceImageRepository;
        this.spaceRepository = spaceRepository;
    }

    @Override
    public List<SpaceImageResponseDto> save(SpaceImageRequestDto spaceImageRequestDto) {
        logger.info("Creating space images for space id: " + spaceImageRequestDto.getSpaceId());
        List<SpaceImage> spaceImages = mapToEntity(spaceImageRequestDto);
        spaceImages = spaceImageRepository.saveAll(spaceImages);
        logger.info("Space image created: " + spaceImages.size());
        return mapToDtoList(spaceImages);
    }

    @Override
    public List<SpaceImageResponseDto> findAll(Optional<Long> spaceId) {
        logger.info("Finding space images");

        List<SpaceImage> images;

        if (spaceId.isPresent()) {
            logger.info("Filtering by spaceId: " + spaceId.get());
            images = spaceImageRepository.findBySpaceId(spaceId.get());
        } else {
            images = spaceImageRepository.findAll();
        }

        List<SpaceImageResponseDto> response = images.stream()
                .map(this::mapToDto)
                .toList();

        logger.info("Space images found: " + response.size());
        return response;
    }

    @Override
    public SpaceImageResponseDto findById(Long id) {
        logger.info("Finding images by id: "+ id);
        SpaceImage spaceImage = spaceImageRepository.findById(id).orElseThrow(
                () -> {
                    logger.error("Space image with id: "+ id + " not found");
                    return new NotFoundException("Space image with id " + id + " not found");
                }
        );
        logger.info("Space image found with id: "+ id);
        return mapToDto(spaceImage);
    }

    @Override
    public void delete(Long id) {
        logger.info("Deleting image by id: "+ id);
        Optional<SpaceImage> spaceImageFind = spaceImageRepository.findById(id);
        if(spaceImageFind.isEmpty()) {
            throw new NotFoundException("Image with id " + id + " not found");
        }
        spaceImageRepository.deleteById(id);
        logger.info("Image deleted with id: "+ id);
    }

    private List<SpaceImageResponseDto> mapToDtoList( List<SpaceImage> spaceImages) {
        List<SpaceImageResponseDto> spaceResponseDtoList = new ArrayList<>();
        for ( SpaceImage spaceImage: spaceImages) {
            SpaceImageResponseDto spaceImageResponseDto = new SpaceImageResponseDto();
            spaceImageResponseDto.setId(spaceImage.getId());
            spaceImageResponseDto.setUrl(spaceImage.getUrl());
            spaceResponseDtoList.add(spaceImageResponseDto);
        }

        return spaceResponseDtoList;
    }

    private SpaceImageResponseDto mapToDto(SpaceImage spaceImage) {
        SpaceImageResponseDto spaceImageResponseDto = new SpaceImageResponseDto();
        spaceImageResponseDto.setId(spaceImage.getId());
        spaceImageResponseDto.setUrl(spaceImage.getUrl());

        return spaceImageResponseDto;
    }

    private List<SpaceImage> mapToEntity(SpaceImageRequestDto spaceImageRequestDto) {
        List<SpaceImage> spaceImages = new ArrayList<>();

        Optional<Space> spaceOptional = spaceRepository.findById(spaceImageRequestDto.getSpaceId());

        if (spaceOptional.isPresent()) {
            Space space = spaceOptional.get();

            for (MultipartFile image : spaceImageRequestDto.getImages()) {
                SpaceImage spaceImage = new SpaceImage();
                spaceImage.setSpace(space);
                spaceImage.setUrl("https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?w=2048");
                spaceImages.add(spaceImage);
            }
        }

        return spaceImages;
    }
}
