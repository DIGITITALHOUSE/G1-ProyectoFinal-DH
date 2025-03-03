package com.reservation.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class SpaceRequestDto {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Capacity is required")
    private Integer capacity;

    @NotNull(message = "Hour price is required")
    private Integer hourPrice;

    @NotBlank(message = "Direction is required")
    private String direction;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Country is required")
    private String country;

    private String zipCode;

    private String state;

    @NotNull(message = "Extras is required")
    private String extras;

    @NotNull(message = "Space type id is required")
    private Long spaceTypeId;

    private List<MultipartFile> images;
}
