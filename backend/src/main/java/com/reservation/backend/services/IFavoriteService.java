package com.reservation.backend.services;

import java.util.List;

import com.reservation.backend.dtos.FavoriteRequestDto;
import com.reservation.backend.dtos.FavoriteResponseDto;

public interface IFavoriteService {

    FavoriteResponseDto create(FavoriteRequestDto favoriteRequestDto);

    List<FavoriteResponseDto> findByUserId(Long userId);

    void delete(Long id);
}
