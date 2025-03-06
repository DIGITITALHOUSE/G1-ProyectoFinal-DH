package com.reservation.backend.services;

public interface IEmailService {
    void sendWelcomeEmail(String to, String name);
}
