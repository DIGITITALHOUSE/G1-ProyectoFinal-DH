package com.reservation.backend.repositories;

import com.reservation.backend.entities.UserFavorite;
import com.reservation.backend.entities.User;
import com.reservation.backend.entities.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserFavoriteRepository extends JpaRepository<UserFavorite, Long> {
    List<UserFavorite> findByUser(User user);
    Optional<UserFavorite> findByUserAndSpace(User user, Space space);
    void deleteByUserAndSpace(User user, Space space);
}
