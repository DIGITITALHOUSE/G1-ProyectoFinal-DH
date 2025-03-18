package com.reservation.backend.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.reservation.backend.dtos.SpaceRequestDto;
import com.reservation.backend.dtos.SpaceRequestToUpdateDto;
import com.reservation.backend.dtos.SpaceResponseDto;

import java.time.LocalDate;
import java.util.List;

public interface ISpaceService {
    SpaceResponseDto create(SpaceRequestDto spaceRequestDto);
    List<SpaceResponseDto> findAll();
    SpaceResponseDto findById(Long id);
    SpaceResponseDto update(Long id, SpaceRequestToUpdateDto spaceRequestToUpdateDto);
    void delete(Long id);
    
    List<SpaceResponseDto> searchSpaces(String keyword, LocalDate date, Long spaceTypeId);
    JsonNode checkAvailability(Long spaceId, LocalDate date);
}
