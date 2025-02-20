package com.reservation.backend.controllers;


import com.reservation.backend.dtos.ReservationRequestDto;
import com.reservation.backend.dtos.ReservationRequestToUpdateDto;
import com.reservation.backend.dtos.ReservationResponseDto;
import com.reservation.backend.services.IReservationService;
import com.reservation.backend.services.impl.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    private final IReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<ReservationResponseDto> create(@Valid @RequestBody ReservationRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationService.create(requestDto));
    }

    @GetMapping
    public ResponseEntity<List<ReservationResponseDto>> findAll() {
        return ResponseEntity.ok(reservationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationResponseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationResponseDto> update(@PathVariable Long id, @Valid @RequestBody ReservationRequestToUpdateDto requestToUpdateDto) {
        return ResponseEntity.ok(reservationService.update(id, requestToUpdateDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reservationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
