package com.reservation.backend.services.impl;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.reservation.backend.dtos.FavoriteRequestDto;
import com.reservation.backend.dtos.FavoriteResponseDto;
import com.reservation.backend.dtos.SpaceImageResponseDto;
import com.reservation.backend.dtos.SpaceResponseDto;
import com.reservation.backend.entities.Favorite;
import com.reservation.backend.entities.Space;
import com.reservation.backend.entities.User;
import com.reservation.backend.exceptions.NotFoundException;
import com.reservation.backend.repositories.IFavoriteRepository;
import com.reservation.backend.repositories.ISpaceRepository;
import com.reservation.backend.repositories.IUserRepository;
import com.reservation.backend.services.IFavoriteService;
import com.reservation.backend.services.ISpaceImageService;

@Service
public class FavoriteService implements IFavoriteService {
    private static final Logger logger = Logger.getLogger(ReservationService.class);
    private final IFavoriteRepository favoriteRepository;
    private final IUserRepository userRepository;
    private final ISpaceRepository spaceRepository;
    private final ISpaceImageService spaceImageService;

    public FavoriteService(IFavoriteRepository favoriteRepository, IUserRepository userRepository,
            ISpaceRepository spaceRepository, ISpaceImageService spaceImageService) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.spaceRepository = spaceRepository;
        this.spaceImageService = spaceImageService;
    }

    @Override
    public FavoriteResponseDto create(FavoriteRequestDto favoriteRequestDto) {
        logger.info("Creating favorite for user: " + favoriteRequestDto.getUserId());
        Favorite favorite = mapToEntity(favoriteRequestDto);
        favorite = favoriteRepository.save(favorite);
        logger.info("Favorite created for user: " + favorite.getUser());
        return mapToDto(favorite);
    }

    @Override
    public List<FavoriteResponseDto> findByUserId(Long userId) {
        logger.info("Getting favorite by user: " + userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<FavoriteResponseDto> favorites = favoriteRepository.findByUser(user).stream()
                .map(this::mapToDto)
                .toList();
        logger.info("Favorites found: " + favorites.size());
        return favorites;
    }

    @Override
    public void delete(Long id) {
        logger.info("Deleting favorite by id: " + id);
        Optional<Favorite> favoriteFind = favoriteRepository.findById(id);
        if (favoriteFind.isEmpty()) {
            throw new NotFoundException("Favorite with id " + id + " not found");
        }
        favoriteRepository.deleteById(id);
        logger.info("Favorite deleted with id: " + id);
    }

    private FavoriteResponseDto mapToDto(Favorite favorite) {
        Space space = favorite.getSpace();
        SpaceResponseDto spaceResponseDto = new SpaceResponseDto();
        if (space != null) {
            spaceResponseDto.setId(space.getId());
            spaceResponseDto.setName(space.getName());
            spaceResponseDto.setDescription(space.getDescription());
            spaceResponseDto.setCapacity(space.getCapacity());
            spaceResponseDto.setHourPrice(space.getHourPrice());
            spaceResponseDto.setDirection(space.getDirection());
            spaceResponseDto.setCity(space.getCity());
            spaceResponseDto.setCountry(space.getCountry());
            spaceResponseDto.setState(space.getState());
            spaceResponseDto.setSpaceTypeName(space.getSpaceType().getName());
        }
        if (space.getSpaceImages() != null) {
            List<SpaceImageResponseDto> spaceImageResponseDtoList = spaceImageService
                    .findAll(Optional.of(space.getId()));
            spaceResponseDto.setSpaceImages(spaceImageResponseDtoList);
        }

        FavoriteResponseDto favoriteResponseDto = new FavoriteResponseDto();
        favoriteResponseDto.setCreatedAt(favorite.getCreated_at());
        favoriteResponseDto.setId(favorite.getId());
        if (favorite.getUser() != null) {
            favoriteResponseDto.setUser(favorite.getUser().getName() + " " + favorite.getUser().getLastName());
        }

        if (favorite.getSpace() != null) {
            favoriteResponseDto.setSpace(spaceResponseDto);
        }
        return favoriteResponseDto;
    }

    private Favorite mapToEntity(FavoriteRequestDto favoriteRequestDto) {
        Favorite favorite = new Favorite();
        if (favoriteRequestDto.getUserId() != null) {
            Optional<User> userOptional = userRepository.findById(favoriteRequestDto.getUserId());
            userOptional.ifPresent(favorite::setUser);
        }

        if (favoriteRequestDto.getSpaceId() != null) {
            Optional<Space> spaceOptional = spaceRepository.findById(favoriteRequestDto.getSpaceId());
            spaceOptional.ifPresent(favorite::setSpace);
        }
        return favorite;
    }

}
