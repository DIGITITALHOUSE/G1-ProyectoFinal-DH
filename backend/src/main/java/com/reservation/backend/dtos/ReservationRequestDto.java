package com.reservation.backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
// import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;

@Getter
@Setter
public class ReservationRequestDto {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate reservationDate;

    @JsonFormat(pattern = "HH:mm:ss")
    private Time startHour;

    @JsonFormat(pattern = "HH:mm:ss")
    private Time endHour;

    @NotNull(message = "User id is required")
    private Long userId;

    @NotNull(message = "Space id is required")
    private Long spaceId;
}
