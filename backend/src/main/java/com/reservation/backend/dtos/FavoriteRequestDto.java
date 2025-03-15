package com.reservation.backend.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoriteRequestDto {
    @NotNull(message = "User id is required")
    private Long userId;

    @NotNull(message = "Space id is required")
    private Long spaceId;
}