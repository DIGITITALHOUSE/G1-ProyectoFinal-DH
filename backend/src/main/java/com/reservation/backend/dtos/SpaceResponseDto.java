package com.reservation.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.time.LocalTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;

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
    private Time openAt;
    private Time closeAt;

    private String spaceTypeName;
    private List<SpaceImageResponseDto> spaceImages;

    private String icono; // Nuevo campo para el nombre del ícono
}
