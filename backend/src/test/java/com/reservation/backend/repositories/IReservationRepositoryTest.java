
package com.reservation.backend.repositories;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.reservation.backend.dtos.*;
import com.reservation.backend.entities.Reservation;
import com.reservation.backend.entities.User;
import com.reservation.backend.exceptions.NotFoundException;

import com.reservation.backend.services.impl.ReservationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class IReservationRepositoryTest {

    @Mock
    private IReservationRepository reservationRepository;
    
    @Mock
    private IUserRepository userRepository;
    
    @InjectMocks
    private ReservationService reservationService;

    private Reservation reservation;
    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        reservation = new Reservation();
        reservation.setId(1L);
        reservation.setUser(user);
    }

    @Test
    void testCreateReservation() {
        when(reservationRepository.save(any(Reservation.class))).thenReturn(reservation);
        ReservationResponseDto response = reservationService.create(new ReservationRequestDto());
        assertNotNull(response);
    }

    @Test
    void testFindReservationById() {
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));
        assertNotNull(reservationService.findById(1L));
    }

    @Test
    void testFindReservationById_NotFound() {
        when(reservationRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> reservationService.findById(1L));
    }

    @Test
    void testDeleteReservation() {
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));
        assertDoesNotThrow(() -> reservationService.delete(1L));
    }
}
    
