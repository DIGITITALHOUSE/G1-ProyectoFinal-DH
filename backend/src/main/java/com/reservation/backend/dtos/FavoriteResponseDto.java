package com.reservation.backend.dtos;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoriteResponseDto {
    private Long id;
    private LocalDateTime createdAt;
    private String user;
    private SpaceResponseDto space;
}
