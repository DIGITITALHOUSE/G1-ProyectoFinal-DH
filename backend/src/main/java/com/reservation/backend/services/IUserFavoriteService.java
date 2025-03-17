package com.reservation.backend.services;

import com.reservation.backend.dtos.SpaceResponseDto;
import java.util.List;

public interface IUserFavoriteService {
    void addFavorite(Long userId, Long spaceId);
    void removeFavorite(Long userId, Long spaceId);
    List<SpaceResponseDto> getFavorites(Long userId);
}
