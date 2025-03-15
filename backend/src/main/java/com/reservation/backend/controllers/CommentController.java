package com.reservation.backend.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.backend.dtos.CommentRequestDto;
import com.reservation.backend.dtos.CommentResponseDto;
import com.reservation.backend.services.ICommentService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@SecurityRequirement(name = "bearerAuth")
public class CommentController {
    private final ICommentService commentService;

    public CommentController(ICommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<CommentResponseDto> create(@Valid @RequestBody CommentRequestDto commentRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.create(commentRequestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        commentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
