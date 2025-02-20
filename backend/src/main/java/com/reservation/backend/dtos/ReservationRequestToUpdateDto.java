package com.reservation.backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReservationRequestToUpdateDto {
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private LocalDateTime startDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private LocalDateTime endDate;
}
