package com.reservation.backend.services;

import com.reservation.backend.dtos.CommentRequestDto;
import com.reservation.backend.dtos.CommentResponseDto;

public interface ICommentService {
    CommentResponseDto create(CommentRequestDto commentRequestDto);

    void delete(Long id);
}
