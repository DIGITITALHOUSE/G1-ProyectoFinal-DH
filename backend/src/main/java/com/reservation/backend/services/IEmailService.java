package com.reservation.backend.services;

import com.reservation.backend.entities.Reservation;
import com.reservation.backend.entities.Space;
import com.reservation.backend.entities.User;

public interface IEmailService {
    void sendWelcomeEmail(String to, String name);
    void sendReservationDoneEmail(String to, User user, Space space, Reservation reservation);
}
