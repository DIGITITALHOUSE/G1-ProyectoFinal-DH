package com.reservation.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

// import com.fasterxml.jackson.databind.JsonNode;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SpaceResponseDto {
    private Long id;
    private String name;
    private String description;
    private Integer capacity;
    private Integer hourPrice;
    private String direction;
    private String city;
    private String country;
    private Double latitude;
    private Double longitude;
    private String zipCode;
    private String state;
    private String extras;

    private String spaceTypeName;
    private List<SpaceImageResponseDto> spaceImages;
}
