package com.reservation.backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReservationResponseDto {
    private Long id;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String user;
    private String state;
}
