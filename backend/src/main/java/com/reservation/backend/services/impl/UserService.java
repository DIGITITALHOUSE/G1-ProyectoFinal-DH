package com.reservation.backend.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reservation.backend.dtos.UserRequestDto;
import com.reservation.backend.dtos.UserRequestToUpdateDto;
import com.reservation.backend.dtos.UserResponseDto;
import com.reservation.backend.entities.User;
import com.reservation.backend.exceptions.NotFoundException;
import com.reservation.backend.repositories.IUserRepository;
import com.reservation.backend.services.IUserService;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

@Service
public class UserService implements IUserService {
    private static final Logger logger = Logger.getLogger(UserService.class);
    private final IUserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(IUserRepository userRepository, ObjectMapper objectMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponseDto create(UserRequestDto userDto) {
        logger.info("Creating user: " + userDto.getName());
        User user = mapToEntity(userDto);
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user = userRepository.save(user);
        logger.info("User created: " + user.getName());
        return mapToDto(user);
    }

    @Override
    public List<UserResponseDto> findAll() {
        logger.info("Finding all patients");
        List<UserResponseDto> users = userRepository.findAll().stream()
                .map(this::mapToDto)
                .toList();
        logger.info("Users found: "+ users.size());
        return users;
    }

    @Override
    public UserResponseDto findById(Long id) {
        logger.info("Finding user by id: "+ id);
        User user = userRepository.findById(id).orElseThrow(
                () -> {
                    logger.error("User with id: "+ id + " not found");
                    return new NotFoundException("User with id " + id + " not found");
                }
        );
        logger.info("User found with id: "+ id);
        return mapToDto(user);
    }

    @Override
    @Transactional
    public UserResponseDto update(Long id, UserRequestToUpdateDto userRequestToUpdateDto) {
        logger.info("Updating user by id: "+ id);

        User user = userRepository.findById(id).orElseThrow(
                () -> {
                    logger.error("User with id: "+ id + " not found");
                    return new NotFoundException("User with id " + id + " not found");
                }
        );

        if (userRequestToUpdateDto.getName() != null) user.setName(userRequestToUpdateDto.getName());
        if (userRequestToUpdateDto.getLastName() != null) user.setLastName(userRequestToUpdateDto.getLastName());
        if (userRequestToUpdateDto.getEmail() != null) user.setEmail(userRequestToUpdateDto.getEmail());
        if (userRequestToUpdateDto.getCellPhone() != null) user.setCellPhone(userRequestToUpdateDto.getCellPhone());

        user = userRepository.save(user);

        logger.info("User updated with id: "+ id);

        return mapToDto(user);
    }

    @Override
    public void delete(Long id) {
        logger.info("Deleting user by id: "+ id);
        Optional<User> userFind = userRepository.findById(id);
        if(userFind.isEmpty()) {
            throw new NotFoundException("User with id " + id + " not found");
        }
        userRepository.deleteById(id);
        logger.info("User deleted with id: "+ id);
    }

    private UserResponseDto mapToDto(User user) {
        return objectMapper.convertValue(user, UserResponseDto.class);
    }

    private User mapToEntity(UserRequestDto userDto) {
        return objectMapper.convertValue(userDto, User.class);
    }
}
