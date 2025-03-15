package com.reservation.backend.dtos;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentResponseDto {
    private LocalDateTime createdAt;
    private String comment;
    private Double rating;
    private UserResponseDto user;
    private Long reservationId;
}
