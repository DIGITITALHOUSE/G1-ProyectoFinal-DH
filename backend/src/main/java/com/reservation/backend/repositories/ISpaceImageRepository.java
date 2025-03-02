package com.reservation.backend.repositories;

import com.reservation.backend.entities.SpaceImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISpaceImageRepository extends JpaRepository<SpaceImage, Long> {
    List<SpaceImage> findBySpaceId(Long spaceId);
}
