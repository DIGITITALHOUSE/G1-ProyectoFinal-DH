package com.reservation.backend.services;

import com.reservation.backend.dtos.UserRequestDto;
import com.reservation.backend.dtos.UserRequestToUpdateDto;
import com.reservation.backend.dtos.UserResponseDto;

import java.util.List;

public interface IUserService {
    UserResponseDto create(UserRequestDto userDto);
    List<UserResponseDto> findAll();
    UserResponseDto findById(Long id);
    UserResponseDto update(Long id, UserRequestToUpdateDto userRequestToUpdateDto);
    void delete(Long id);
}
