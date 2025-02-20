package com.reservation.backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReservationRequestDto {
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private LocalDateTime startDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private LocalDateTime endDate;

    @NotNull(message = "Dentist id is required")
    private Long userId;
}
