package com.reservation.backend.services;

import com.reservation.backend.dtos.SpaceImageRequestDto;
import com.reservation.backend.dtos.SpaceImageResponseDto;

import java.util.List;
import java.util.Optional;

public interface ISpaceImageService {
    List<SpaceImageResponseDto> save(SpaceImageRequestDto spaceImageRequestDto);
    List<SpaceImageResponseDto> findAll(Optional<Long> spaceId);
    SpaceImageResponseDto findById(Long id);
    void delete(Long id);
}
