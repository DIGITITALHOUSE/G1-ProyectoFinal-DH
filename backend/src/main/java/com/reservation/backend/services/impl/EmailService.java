package com.reservation.backend.services.impl;

import com.reservation.backend.entities.Reservation;
import com.reservation.backend.entities.Space;
import com.reservation.backend.entities.User;
import com.reservation.backend.services.IEmailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {
    private static final Logger logger = Logger.getLogger(EmailService.class);
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Override
    public void sendWelcomeEmail(String to, String name) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            Context context = new Context();
            context.setVariable("name", name);

            String htmlContent = templateEngine.process("welcome-email", context);

            helper.setTo(to);
            helper.setSubject("¡Bienvenido a Cowork!");
            helper.setText(htmlContent, true);
            helper.setFrom("cowork.lat@gmail.com", "Cowork");

            mailSender.send(message);
            logger.info("Sending email to: " + to);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendReservationDoneEmail(String to, User user, Space space, Reservation reservation) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            Context context = new Context();
            context.setVariable("name", user.getName() + " " + user.getLastName());
            context.setVariable("spaceName", space.getName());
            context.setVariable("reservationReservationDate", reservation.getReservationDate());
            context.setVariable("reservationStartHour", reservation.getStartHour());
            context.setVariable("reservationEndHour", reservation.getEndHour());
            context.setVariable("spaceDirection", space.getDirection());

            String htmlContent = templateEngine.process("reservation-done-email", context);

            helper.setTo(to);
            helper.setSubject("¡Reserva realizada!");
            helper.setText(htmlContent, true);
            helper.setFrom("cowork.lat@gmail.com", "Cowork");

            mailSender.send(message);
            logger.info("Sending email to: " + to);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
