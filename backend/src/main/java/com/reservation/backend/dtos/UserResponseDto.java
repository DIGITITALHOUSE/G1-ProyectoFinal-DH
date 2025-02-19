package com.reservation.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto {
    private Long id;
    private String name;
    private String lastName;
    private String avatar;
    private String email;
    private String password;
    private Integer cellPhone;
    private String state;
}
