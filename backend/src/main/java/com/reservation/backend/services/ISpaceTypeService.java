package com.reservation.backend.services;

// import com.reservation.backend.dtos.SpaceResponseDto;
import com.reservation.backend.dtos.SpaceTypeRequestDto;
import com.reservation.backend.dtos.SpaceTypeRequestToUpdateDto;
import com.reservation.backend.dtos.SpaceTypeResponseDto;

import java.util.List;

public interface ISpaceTypeService {
    SpaceTypeResponseDto create(SpaceTypeRequestDto spaceTypeRequestDto);
    List<SpaceTypeResponseDto> findAll();
    SpaceTypeResponseDto findById(Long id);
    SpaceTypeResponseDto update(Long id, SpaceTypeRequestToUpdateDto spaceTypeRequestToUpdateDto);
    void delete(Long id);
}
