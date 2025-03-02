package com.reservation.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SpaceTypeRequestToUpdateDto {
    @NotBlank(message = "Name is required")
    private String name;
}
