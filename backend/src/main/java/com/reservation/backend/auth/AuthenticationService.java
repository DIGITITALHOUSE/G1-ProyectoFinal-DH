package com.reservation.backend.auth;

import com.reservation.backend.config.JwtService;
import com.reservation.backend.entities.Rol;
import com.reservation.backend.entities.User;
import com.reservation.backend.repositories.IUserRepository;
import com.reservation.backend.services.IEmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final IUserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final IEmailService emailService;

    public AuthenticationResponse register (RegisterRequest request){
        User user = User.builder()
                .name(request.getName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol(Rol.USER)
                .build();
        userRepository.save(user);
        String token = jwtService.generateToken(user);

        emailService.sendWelcomeEmail(user.getEmail(), user.getName() + " " + user.getLastName());

        return AuthenticationResponse.builder()
                .token(token)
                .name(user.getName() + " " + user.getLastName())
                .build();

    }

    public AuthenticationResponse login(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .name(user.getName() + " " + user.getLastName())
                .build();
    }
}
