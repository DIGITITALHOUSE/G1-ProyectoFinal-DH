package com.reservation.backend.dtos;

import com.fasterxml.jackson.databind.JsonNode;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SpaceRequestToUpdateDto {
    private String name;
    private String description;
    private Integer capacity;
    private Integer hourPrice;
    private String direction;
    private String city;
    private String country;
    private String zipCode;
    private String state;
    private JsonNode extras;
}
