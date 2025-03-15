package com.reservation.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reservation.backend.entities.Comment;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, Long> {
    
}
