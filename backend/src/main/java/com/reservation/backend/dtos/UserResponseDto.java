package com.reservation.backend.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponseDto {
    private Long id;
    private String name;
    private String lastName;
    private String avatar;
    private String email;
    private String password;
    private String cellPhone;
    private String state;
}
