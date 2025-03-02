package com.reservation.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SpaceResponseDto {
    private Long id;
    private String name;
    private String description;
    private Integer capacity;
    private Integer hourPrice;
    private String direction;
    private String locality;
    private String region;
    private String country;
    private String zipCode;
    private String state;

    private String spaceTypeName;
    private List<SpaceImageResponseDto> spaceImages;
}
