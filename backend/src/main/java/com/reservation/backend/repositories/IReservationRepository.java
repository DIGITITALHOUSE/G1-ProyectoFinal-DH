package com.reservation.backend.repositories;

import com.reservation.backend.entities.Reservation;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findBySpace_Id(Long spaceId);

    // @Column(name = "reservation_date", nullable = false)
    // private LocalDate reservationDate;
    List<Reservation> findBySpace_IdAndReservationDate(Long spaceId, LocalDate date);
}
