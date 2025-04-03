package com.reservation.backend.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reservation.backend.dtos.ReservationRequestDto;
import com.reservation.backend.dtos.ReservationRequestToUpdateDto;
import com.reservation.backend.dtos.ReservationResponseDto;
import com.reservation.backend.entities.Reservation;
import com.reservation.backend.entities.Space;
import com.reservation.backend.entities.User;
import com.reservation.backend.exceptions.NotFoundException;
import com.reservation.backend.repositories.IReservationRepository;
import com.reservation.backend.repositories.ISpaceRepository;
import com.reservation.backend.repositories.IUserRepository;
import com.reservation.backend.services.IReservationService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

@Service
public class ReservationService implements IReservationService {
    private static final Logger logger = Logger.getLogger(ReservationService.class);
    private final IReservationRepository reservationRepository;
    private final IUserRepository userRepository;
    private final ISpaceRepository spaceRepository;
    // private final ObjectMapper objectMapper;

    public ReservationService(IReservationRepository reservationRepository, IUserRepository userRepository,
            ISpaceRepository spaceRepository, ObjectMapper objectMapper) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.spaceRepository = spaceRepository;
        // this.objectMapper = objectMapper;
    }

    @Override
    public ReservationResponseDto create(ReservationRequestDto reservationDto) {
        logger.info("Creating reservation for user: " + reservationDto.getUserId());
        Reservation reservation = mapToEntity(reservationDto);
        reservation = reservationRepository.save(reservation);
        logger.info("Reservation created for user: " + reservation.getUser());
        return mapToDto(reservation);
    }

    @Override
    public List<ReservationResponseDto> findAll() {
        logger.info("Finding all reservations");
        List<ReservationResponseDto> reservations = reservationRepository.findAll().stream()
                .map(this::mapToDto)
                .toList();
        logger.info("Reservations found: " + reservations.size());
        return reservations;
    }

    @Override
    public ReservationResponseDto findById(Long id) {
        logger.info("Finding reservation by id: " + id);
        Reservation reservation = reservationRepository.findById(id).orElseThrow(
                () -> {
                    logger.error("Reservation with id: " + id + " not found");
                    return new NotFoundException("Reservation with id " + id + " not found");
                });
        logger.info("Reservation found with id: " + id);
        return mapToDto(reservation);
    }

    @Override
    public ReservationResponseDto update(Long id, ReservationRequestToUpdateDto reservationRequestToUpdateDto) {
        logger.info("Updating reservation by id: " + id);
        Reservation reservation = reservationRepository.findById(id).orElseThrow(
                () -> {
                    logger.error("Reservation with id: " + id + " not found");
                    return new NotFoundException("Reservation with id " + id + " not found");
                });

        if (reservationRequestToUpdateDto.getStartHour() != null) {
            reservation.setStartHour(reservationRequestToUpdateDto.getStartHour());
        }
        if (reservationRequestToUpdateDto.getEndHour() != null) {
            reservation.setStartHour(reservationRequestToUpdateDto.getEndHour());
        }

        reservation = reservationRepository.save(reservation);

        logger.info("Reservation updated with id: " + id);

        return mapToDto(reservation);
    }

    @Override
    public void delete(Long id) {
        logger.info("Deleting Reservation by id: " + id);
        Optional<Reservation> reservationFind = reservationRepository.findById(id);
        if (reservationFind.isEmpty()) {
            throw new NotFoundException("Reservation with id " + id + " not found");
        }
        reservationRepository.deleteById(id);
        logger.info("Reservation deleted with id: " + id);
    }

    @Override
    public List<ReservationResponseDto> findBySpace_Id(Long spaceId) {
        logger.info("Finding reservations by space id: " + spaceId);
        List<ReservationResponseDto> reservations = reservationRepository.findBySpace_Id(spaceId).stream()
                .map(this::mapToDto)
                .toList();
        logger.info("Reservations found: " + reservations.size());
        return reservations;
    }

    @Override
    public List<ReservationResponseDto> findByUser_Id(Long userId) {
        logger.info("Finding reservations by user id: " + userId);
        List<ReservationResponseDto> reservations = reservationRepository.findByUser_Id(userId).stream()
                .map(this::mapToDto)
                .toList();
        logger.info("Reservations found: " + reservations.size());
        return reservations;
    }

    @Override
    public List<ReservationResponseDto> findBySpace_IdAndReservationDate(Long spaceId, LocalDate date) {
        logger.info("Finding reservations by space id: " + spaceId + " and date: " + date);
        List<ReservationResponseDto> reservations = reservationRepository
                .findBySpace_IdAndReservationDate(spaceId, date).stream()
                .map(this::mapToDto)
                .toList();
        logger.info("Reservations found: " + reservations.size());
        return reservations;
    }

    private ReservationResponseDto mapToDto(Reservation reservation) {
        ReservationResponseDto reservationResponseDto = new ReservationResponseDto();
        reservationResponseDto.setId(reservation.getId());
        reservationResponseDto.setReservationDate(reservation.getReservationDate());
        reservationResponseDto.setStartHour(reservation.getStartHour());
        reservationResponseDto.setEndHour(reservation.getEndHour());
        reservationResponseDto.setState(reservation.getState());

        if (reservation.getUser() != null) {
            reservationResponseDto.setUser(reservation.getUser().getName() + " " + reservation.getUser().getLastName());
            reservationResponseDto.setUserId(reservation.getUser().getId());
        }

        if (reservation.getSpace() != null) {
            reservationResponseDto.setSpaceName(reservation.getSpace().getName());
            reservationResponseDto.setSpaceId(reservation.getSpace().getId());
        }

        return reservationResponseDto;
    }

    private Reservation mapToEntity(ReservationRequestDto reservationRequestDto) {
        Reservation reservation = new Reservation();
        reservation.setReservationDate(reservationRequestDto.getReservationDate());
        reservation.setStartHour(reservationRequestDto.getStartHour());
        reservation.setEndHour(reservationRequestDto.getEndHour());

        if (reservationRequestDto.getUserId() != null) {
            Optional<User> userOptional = userRepository.findById(reservationRequestDto.getUserId());
            userOptional.ifPresent(reservation::setUser);
        }

        if (reservationRequestDto.getSpaceId() != null) {
            Optional<Space> spaceOptional = spaceRepository.findById(reservationRequestDto.getSpaceId());
            spaceOptional.ifPresent(reservation::setSpace);
        }

        return reservation;
    }

}
