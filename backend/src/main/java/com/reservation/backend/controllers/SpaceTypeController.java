package com.reservation.backend.controllers;

import com.reservation.backend.dtos.SpaceTypeRequestDto;
import com.reservation.backend.dtos.SpaceTypeRequestToUpdateDto;
import com.reservation.backend.dtos.SpaceTypeResponseDto;
import com.reservation.backend.services.ISpaceTypeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/space-type")
@SecurityRequirement(name = "bearerAuth")
public class SpaceTypeController {
    private final ISpaceTypeService spaceTypeService;

    public SpaceTypeController(ISpaceTypeService spaceTypeService) {
        this.spaceTypeService = spaceTypeService;
    }

    @PostMapping
    public ResponseEntity<SpaceTypeResponseDto> create(@Valid @RequestBody SpaceTypeRequestDto spaceTypeRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(spaceTypeService.create(spaceTypeRequestDto));
    }

    @GetMapping
    public ResponseEntity<List<SpaceTypeResponseDto>> findAll() {
        return ResponseEntity.ok(spaceTypeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpaceTypeResponseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(spaceTypeService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpaceTypeResponseDto> update(@PathVariable Long id, @Valid @RequestBody SpaceTypeRequestToUpdateDto spaceTypeRequestToUpdateDto) {
        return ResponseEntity.ok(spaceTypeService.update(id, spaceTypeRequestToUpdateDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        spaceTypeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
