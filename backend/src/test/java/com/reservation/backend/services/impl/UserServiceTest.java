package com.reservation.backend.services.impl;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reservation.backend.dtos.UserRequestDto;
import com.reservation.backend.dtos.UserRequestToUpdateDto;
import com.reservation.backend.dtos.UserResponseDto;
import com.reservation.backend.entities.User;
import com.reservation.backend.exceptions.NotFoundException;
import com.reservation.backend.repositories.IUserRepository;

public class UserServiceTest {
   @Mock
    private IUserRepository userRepository;

    @Mock
    private ObjectMapper objectMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateUser() {
        UserRequestDto userRequestDto = new UserRequestDto();
        userRequestDto.setName("John");
        userRequestDto.setPassword("password");

        User user = new User();
        user.setName("John");
        user.setPassword("encodedPassword");

        when(objectMapper.convertValue(any(UserRequestDto.class), eq(User.class))).thenReturn(user);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(objectMapper.convertValue(any(User.class), eq(UserResponseDto.class))).thenReturn(new UserResponseDto());

        UserResponseDto userResponseDto = userService.create(userRequestDto);

        assertNotNull(userResponseDto);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testFindUserById() {
        Long userId = 1L;
        User user = new User();
        user.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(objectMapper.convertValue(any(User.class), eq(UserResponseDto.class))).thenReturn(new UserResponseDto());

        UserResponseDto userResponseDto = userService.findById(userId);

        assertNotNull(userResponseDto);
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void testFindUserById_NotFound() {
        Long userId = 1L;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> userService.findById(userId));
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void testUpdateUser() {
        Long userId = 1L;
        User user = new User();
        user.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(objectMapper.convertValue(any(User.class), eq(UserResponseDto.class))).thenReturn(new UserResponseDto());

        UserResponseDto userResponseDto = userService.update(userId, new UserRequestToUpdateDto());

        assertNotNull(userResponseDto);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testDeleteUser() {
        Long userId = 1L;
        User user = new User();
        user.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        userService.delete(userId);

        verify(userRepository, times(1)).deleteById(userId);
    } 
}
