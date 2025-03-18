package com.reservation.backend.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.reservation.backend.dtos.SpaceRequestDto;
import com.reservation.backend.dtos.SpaceRequestToUpdateDto;
import com.reservation.backend.dtos.SpaceResponseDto;
import com.reservation.backend.services.ISpaceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/spaces")
@CrossOrigin(origins = "*")
public class SpaceController {
    private final ISpaceService spaceService;

    public SpaceController(ISpaceService spaceService) {
        this.spaceService = spaceService;
    }

    // Endpoint para crear un espacio
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Create space", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<SpaceResponseDto> create(@ModelAttribute @Valid SpaceRequestDto requestDto) {
        SpaceResponseDto createdSpace = spaceService.create(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSpace);
    }

    // Endpoint para obtener todos los espacios
    @GetMapping
    @Operation(summary = "Get all spaces")
    public ResponseEntity<List<SpaceResponseDto>> findAll() {
        List<SpaceResponseDto> spaces = spaceService.findAll();
        return ResponseEntity.ok(spaces);
    }

    // Endpoint para obtener un espacio por ID
    @GetMapping("/{id}")
    @Operation(summary = "Get space by id")
    public ResponseEntity<SpaceResponseDto> findById(@PathVariable Long id) {
        SpaceResponseDto space = spaceService.findById(id);
        return ResponseEntity.ok(space);
    }

    // Endpoint para actualizar un espacio por ID
    @PutMapping("/{id}")
    @Operation(summary = "Update space", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<SpaceResponseDto> update(@PathVariable Long id, @Valid @RequestBody SpaceRequestToUpdateDto requestToUpdateDto) {
        SpaceResponseDto updatedSpace = spaceService.update(id, requestToUpdateDto);
        return ResponseEntity.ok(updatedSpace);
    }

    // Endpoint para eliminar un espacio por ID
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete space", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        spaceService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @Operation(summary = "Search spaces filtering by keyword, date and space type")
    public ResponseEntity<List<SpaceResponseDto>> searchSpaces(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) Long spaceType) {
        
        List<SpaceResponseDto> spaces = spaceService.searchSpaces(keyword, date, spaceType);
        return ResponseEntity.ok(spaces);
    }

    @GetMapping("/availability/{id}/{date}")
    @Operation(summary = "Check availability for a specific space and date")
    public ResponseEntity<JsonNode> checkAvailability(@PathVariable Long id, @PathVariable LocalDate date) {
        JsonNode availability = spaceService.checkAvailability(id, date);
        return ResponseEntity.ok(availability);
    }
    
}
