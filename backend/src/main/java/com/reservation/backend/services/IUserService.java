package com.reservation.backend.services;

import com.reservation.backend.dtos.UserRequestDto;
import com.reservation.backend.dtos.UserRequestToUpdateDto;
import com.reservation.backend.dtos.UserResponseDto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface IUserService {
    UserResponseDto create(UserRequestDto userDto);
    List<UserResponseDto> findAll();
    UserResponseDto findById(Long id);
    UserResponseDto update(Long id, UserRequestToUpdateDto userRequestToUpdateDto);
    void delete(Long id);
    String uploadAvatar(Long id, MultipartFile file);
}
