package com.reservation.backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.time.LocalDate;

@Getter
@Setter
public class ReservationRequestToUpdateDto {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate reservationDate;

    @JsonFormat(pattern = "HH:mm:ss")
    private Time startHour;

    @JsonFormat(pattern = "HH:mm:ss")
    private Time endHour;
}
