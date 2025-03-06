package com.reservation.backend.services.impl;

import com.reservation.backend.dtos.ReservationRequestDto;
import com.reservation.backend.dtos.ReservationRequestToUpdateDto;
import com.reservation.backend.dtos.ReservationResponseDto;
import com.reservation.backend.entities.Reservation;
import com.reservation.backend.entities.User;
import com.reservation.backend.exceptions.NotFoundException;
import com.reservation.backend.repositories.IReservationRepository;
import com.reservation.backend.repositories.IUserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReservationServiceTest {

    @Mock
    private IReservationRepository reservationRepository;

    @Mock
    private IUserRepository userRepository;

    @InjectMocks
    private ReservationService reservationService;

    @Test
    void createReservation_ShouldReturnReservationResponse() {
        // Arrange
        User user = new User();
        user.setId(1L);
        user.setName("Test");
        user.setLastName("User");

        Reservation savedReservation = new Reservation();
        savedReservation.setId(1L);
        savedReservation.setUser(user);
        savedReservation.setState("ACTIVE");

        ReservationRequestDto requestDto = new ReservationRequestDto();
        requestDto.setUserId(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(reservationRepository.save(any(Reservation.class))).thenReturn(savedReservation);

        // Act
        ReservationResponseDto result = reservationService.create(requestDto);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Test User", result.getUser());
        verify(reservationRepository).save(any(Reservation.class));
    }

    @Test
    void findAllReservations_ShouldReturnList() {
        // Arrange
        Reservation reservation = new Reservation();
        reservation.setId(1L);
        reservation.setState("ACTIVE");

        when(reservationRepository.findAll()).thenReturn(Arrays.asList(reservation));

        // Act
        var result = reservationService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(reservationRepository).findAll();
    }

    @Test
    void findById_WithValidId_ShouldReturnReservation() {
        // Arrange
        Reservation reservation = new Reservation();
        reservation.setId(1L);
        reservation.setState("ACTIVE");

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));

        // Act
        ReservationResponseDto result = reservationService.findById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(reservationRepository).findById(1L);
    }

    @Test
    void findById_WithInvalidId_ShouldThrowNotFoundException() {
        // Arrange
        when(reservationRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(NotFoundException.class, () -> reservationService.findById(999L));
        verify(reservationRepository).findById(999L);
    }

    @Test
    void updateReservation_WithValidId_ShouldReturnUpdatedReservation() {
        // Arrange
        Reservation existingReservation = new Reservation();
        existingReservation.setId(1L);
        existingReservation.setState("ACTIVE");

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(existingReservation));
        when(reservationRepository.save(any(Reservation.class))).thenReturn(existingReservation);

        ReservationRequestToUpdateDto updateDto = new ReservationRequestToUpdateDto();

        // Act
        ReservationResponseDto result = reservationService.update(1L, updateDto);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(reservationRepository).save(any(Reservation.class));
    }

    @Test
    void deleteReservation_WithValidId_ShouldDeleteSuccessfully() {
        // Arrange
        Reservation existingReservation = new Reservation();
        existingReservation.setId(1L);

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(existingReservation));
        doNothing().when(reservationRepository).deleteById(1L);

        // Act
        reservationService.delete(1L);

        // Assert
        verify(reservationRepository).findById(1L);
        verify(reservationRepository).deleteById(1L);
    }

    @Test
    void deleteReservation_WithInvalidId_ShouldThrowNotFoundException() {
        // Arrange
        when(reservationRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(NotFoundException.class, () -> reservationService.delete(999L));
        verify(reservationRepository).findById(999L);
        verify(reservationRepository, never()).deleteById(anyLong());
    }
}