package com.reservation.backend.dtos;

// import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.time.LocalDate;

@Getter
@Setter
public class ReservationResponseDto {
    private Long id;
    private LocalDate reservationDate;
    private Time startHour;
    private Time endHour;
    private String user;
    private Long userId;
    private String state;
    private String spaceName;
    private Long spaceId;
}
