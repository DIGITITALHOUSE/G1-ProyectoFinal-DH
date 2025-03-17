package com.reservation.backend.controllers;

import com.reservation.backend.dtos.SpaceRequestDto;
import com.reservation.backend.dtos.SpaceRequestToUpdateDto;
import com.reservation.backend.dtos.SpaceResponseDto;
import com.reservation.backend.services.ISpaceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @Operation(summary = "Get all spaces", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<SpaceResponseDto>> findAll() {
        List<SpaceResponseDto> spaces = spaceService.findAll();
        return ResponseEntity.ok(spaces);
    }

    // Endpoint para obtener un espacio por ID
    @GetMapping("/{id}")
    @Operation(summary = "Get space by id", security = @SecurityRequirement(name = "bearerAuth"))
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
}
