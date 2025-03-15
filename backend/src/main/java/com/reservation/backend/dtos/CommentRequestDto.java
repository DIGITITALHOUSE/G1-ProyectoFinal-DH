package com.reservation.backend.dtos;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentRequestDto {
    private String comment;
    @NotNull(message = "Rating is required")
    @DecimalMin(value = "0.0", message = "Rating must be between 0.0 and 5.0")
    @DecimalMax(value = "5.0", message = "Rating must be between 0.0 and 5.0")
    private Double rating;
    @NotNull(message = "User id is required")
    private Long userId;
    @NotNull(message = "Reservation id is required")
    private Long reservationId;
}
