package com.reservation.backend.controllers;

import com.reservation.backend.dtos.SpaceRequestDto;
import com.reservation.backend.dtos.SpaceRequestToUpdateDto;
import com.reservation.backend.dtos.SpaceResponseDto;
import com.reservation.backend.services.ISpaceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/spaces")
@CrossOrigin(origins = "*")
public class SpaceController {
    private final ISpaceService spaceService;

    public SpaceController(ISpaceService spaceService) {
        this.spaceService = spaceService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SpaceResponseDto> create(
            @ModelAttribute @Valid SpaceRequestDto requestDto
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(spaceService.create(requestDto));
    }

    @GetMapping
    public ResponseEntity<List<SpaceResponseDto>> findAll() {
        return ResponseEntity.ok(spaceService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpaceResponseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(spaceService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpaceResponseDto> update(@PathVariable Long id, @Valid @RequestBody SpaceRequestToUpdateDto requestToUpdateDto) {
        return ResponseEntity.ok(spaceService.update(id, requestToUpdateDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        spaceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
