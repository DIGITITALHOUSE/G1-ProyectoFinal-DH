package com.reservation.backend.dtos;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestToUpdateDto {
    private String name;

    private String lastName;

    @Email(message = "Invalid email format")
    private String email;

    private Integer cellPhone;
}
