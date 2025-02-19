package com.reservation.backend.services;

import com.reservation.backend.dtos.ReservationRequestDto;
import com.reservation.backend.dtos.ReservationRequestToUpdateDto;
import com.reservation.backend.dtos.ReservationResponseDto;

import java.util.List;

public interface IReservationService {
    ReservationResponseDto create(ReservationRequestDto reservationDto);
    List<ReservationResponseDto> findAll();
    ReservationResponseDto findById(Long id);
    ReservationResponseDto update(Long id, ReservationRequestToUpdateDto reservationRequestToUpdateDto);
    void delete(Long id);
}
