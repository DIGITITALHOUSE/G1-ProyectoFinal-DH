package com.reservation.backend.services.impl;

import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.reservation.backend.dtos.CommentRequestDto;
import com.reservation.backend.dtos.CommentResponseDto;
import com.reservation.backend.dtos.UserResponseDto;
import com.reservation.backend.entities.Comment;
import com.reservation.backend.entities.User;
import com.reservation.backend.exceptions.NotFoundException;
import com.reservation.backend.repositories.ICommentRepository;
import com.reservation.backend.repositories.IReservationRepository;
import com.reservation.backend.repositories.IUserRepository;
import com.reservation.backend.services.ICommentService;

@Service
public class CommentService implements ICommentService {
    private static final Logger logger = Logger.getLogger(ReservationService.class);
    private final ICommentRepository commentRepository;
    private final IUserRepository userRepository;
    private final IReservationRepository reservationRepository;

    public CommentService(ICommentRepository commentRepository, IUserRepository userRepository,
            IReservationRepository reservationRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public CommentResponseDto create(CommentRequestDto commentRequestDto) {
        logger.info("Creating comment for reservation: " + commentRequestDto.getReservationId());
        Comment comment = mapToEntity(commentRequestDto);
        // TODO Validar que el usuario haya realizado la reserva
        // TODO Validar que el usuario solo pueda dejar un comentario por reserva
        comment = commentRepository.save(comment);
        logger.info("Comment created for reservation: " + comment.getReservation().getId());
        return mapToDto(comment);
    }

    @Override
    public void delete(Long id) {
        logger.info("Deleting comment by id: " + id);
        Optional<Comment> commentFind = commentRepository.findById(id);
        if (commentFind.isEmpty()) {
            throw new NotFoundException("Comment with id " + id + " not found");
        }
        commentRepository.deleteById(id);
        logger.info("Comment deleted with id: " + id);
    }

    private CommentResponseDto mapToDto(Comment comment) {
        User user = comment.getUser();
        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setAvatar(user.getAvatar() == null ? "" : user.getAvatar());
        userResponseDto.setName(user.getName());
        userResponseDto.setLastName(user.getLastName());
        CommentResponseDto commentResponseDto = new CommentResponseDto();
        commentResponseDto.setCreatedAt(comment.getCreated_at());
        commentResponseDto.setComment(comment.getComment());
        commentResponseDto.setRating(comment.getRating());
        commentResponseDto.setUser(userResponseDto);
        commentResponseDto.setReservationId(comment.getReservation().getId());
        return commentResponseDto;
    }

    private Comment mapToEntity(CommentRequestDto commentRequestDto) {
        Comment comment = new Comment();
        comment.setComment(commentRequestDto.getComment());
        comment.setRating(commentRequestDto.getRating());
        comment.setUser(userRepository.findById(commentRequestDto.getUserId()).get());
        comment.setReservation(reservationRepository.findById(commentRequestDto.getReservationId()).get());
        return comment;
    }

}
