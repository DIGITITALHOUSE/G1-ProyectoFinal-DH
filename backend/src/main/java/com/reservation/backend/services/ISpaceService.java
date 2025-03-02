package com.reservation.backend.services;

import com.reservation.backend.dtos.SpaceRequestDto;
import com.reservation.backend.dtos.SpaceRequestToUpdateDto;
import com.reservation.backend.dtos.SpaceResponseDto;

import java.util.List;

public interface ISpaceService {
    SpaceResponseDto create(SpaceRequestDto spaceRequestDto);
    List<SpaceResponseDto> findAll();
    SpaceResponseDto findById(Long id);
    SpaceResponseDto update(Long id, SpaceRequestToUpdateDto spaceRequestToUpdateDto);
    void delete(Long id);
}
