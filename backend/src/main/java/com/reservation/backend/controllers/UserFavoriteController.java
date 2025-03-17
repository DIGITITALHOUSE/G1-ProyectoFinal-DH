package com.reservation.backend.controllers;

import com.reservation.backend.dtos.SpaceResponseDto;
import com.reservation.backend.services.IUserFavoriteService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
@CrossOrigin(origins = "*")
public class UserFavoriteController {

    private final IUserFavoriteService userFavoriteService;

    public UserFavoriteController(IUserFavoriteService userFavoriteService) {
        this.userFavoriteService = userFavoriteService;
    }

    @PostMapping("/{userId}/{spaceId}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> addFavorite(@PathVariable Long userId, @PathVariable Long spaceId) {
        userFavoriteService.addFavorite(userId, spaceId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/{spaceId}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long userId, @PathVariable Long spaceId) {
        userFavoriteService.removeFavorite(userId, spaceId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{userId}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<List<SpaceResponseDto>> getFavorites(@PathVariable Long userId) {
        return ResponseEntity.ok(userFavoriteService.getFavorites(userId));
    }
}
