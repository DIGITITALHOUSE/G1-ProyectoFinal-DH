package com.reservation.backend.services;

import com.reservation.backend.dtos.SpaceImageRequestDto;
import com.reservation.backend.dtos.SpaceImageResponseDto;
import com.reservation.backend.entities.SpaceImage;
import com.reservation.backend.services.impl.S3Service;

import java.util.List;
import java.util.Optional;

public interface ISpaceImageService {
    List<SpaceImageResponseDto> save(SpaceImageRequestDto spaceImageRequestDto);
    List<SpaceImageResponseDto> findAll(Optional<Long> spaceId);
    SpaceImageResponseDto findById(Long id);
    void delete(Long id);
    List<SpaceImage> mapToEntity(SpaceImageRequestDto spaceImageRequestDto, S3Service s3Service);
    List<SpaceImage> save(List<SpaceImage> spaceImages);
}
