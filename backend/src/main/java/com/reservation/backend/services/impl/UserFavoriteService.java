package com.reservation.backend.services.impl;

import com.reservation.backend.dtos.SpaceResponseDto;
import com.reservation.backend.entities.Space;
import com.reservation.backend.entities.User;
import com.reservation.backend.entities.UserFavorite;
import com.reservation.backend.exceptions.NotFoundException;
import com.reservation.backend.repositories.IUserFavoriteRepository;
import com.reservation.backend.repositories.IUserRepository;
import com.reservation.backend.repositories.ISpaceRepository;
import com.reservation.backend.services.IUserFavoriteService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserFavoriteService implements IUserFavoriteService {

    private final IUserFavoriteRepository userFavoriteRepository;
    private final IUserRepository userRepository;
    private final ISpaceRepository spaceRepository;

    public UserFavoriteService(IUserFavoriteRepository userFavoriteRepository, IUserRepository userRepository, ISpaceRepository spaceRepository) {
        this.userFavoriteRepository = userFavoriteRepository;
        this.userRepository = userRepository;
        this.spaceRepository = spaceRepository;
    }

    @Override
    public void addFavorite(Long userId, Long spaceId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Space space = spaceRepository.findById(spaceId)
                .orElseThrow(() -> new NotFoundException("Space not found"));

        if (userFavoriteRepository.findByUserAndSpace(user, space).isPresent()) {
            throw new IllegalStateException("This space is already in favorites.");
        }

        UserFavorite favorite = new UserFavorite();
        favorite.setUser(user);
        favorite.setSpace(space);
        userFavoriteRepository.save(favorite);
    }

    @Override
    public void removeFavorite(Long userId, Long spaceId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Space space = spaceRepository.findById(spaceId)
                .orElseThrow(() -> new NotFoundException("Space not found"));

        userFavoriteRepository.findByUserAndSpace(user, space)
                .ifPresent(userFavoriteRepository::delete);
    }

    @Override
    public List<SpaceResponseDto> getFavorites(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return userFavoriteRepository.findByUser(user).stream()
                .map(favorite -> {
                    Space space = favorite.getSpace();
                    SpaceResponseDto dto = new SpaceResponseDto();
                    dto.setId(space.getId());
                    dto.setName(space.getName());
                    dto.setDescription(space.getDescription());
                    dto.setCapacity(space.getCapacity());
                    dto.setHourPrice(space.getHourPrice());
                    dto.setDirection(space.getDirection());
                    dto.setCity(space.getCity());
                    dto.setCountry(space.getCountry());
                    return dto;
                }).collect(Collectors.toList());
    }
}
