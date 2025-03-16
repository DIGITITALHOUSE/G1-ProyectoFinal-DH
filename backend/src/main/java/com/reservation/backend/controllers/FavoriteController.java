package com.reservation.backend.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.backend.dtos.FavoriteRequestDto;
import com.reservation.backend.dtos.FavoriteResponseDto;
import com.reservation.backend.services.IFavoriteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/favorites")
@SecurityRequirement(name = "bearerAuth")
public class FavoriteController {
    private final IFavoriteService favoriteService;

    public FavoriteController(IFavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping
    public ResponseEntity<FavoriteResponseDto> create(@Valid @RequestBody FavoriteRequestDto favoriteRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(favoriteService.create(favoriteRequestDto));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get favorites by user id")
    public ResponseEntity<List<FavoriteResponseDto>> findByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(favoriteService.findByUserId(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete favorite by id")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        favoriteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
