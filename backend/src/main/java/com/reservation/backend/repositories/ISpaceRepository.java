package com.reservation.backend.repositories;

import com.reservation.backend.entities.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISpaceRepository extends JpaRepository<Space, Long> {
}
