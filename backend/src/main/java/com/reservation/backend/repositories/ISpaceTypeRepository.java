package com.reservation.backend.repositories;

import com.reservation.backend.entities.SpaceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISpaceTypeRepository extends JpaRepository<SpaceType, Long> {
}
