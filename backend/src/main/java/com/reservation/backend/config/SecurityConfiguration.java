package com.reservation.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/health-check").permitAll();
                    auth.requestMatchers("/auth/**").permitAll();
                    auth.requestMatchers("/doc/**").permitAll();
                    auth.requestMatchers("/v3/api-docs/**").permitAll();
                    // User
                    auth.requestMatchers("/users/**").hasAnyAuthority("SUPERADMIN", "ADMIN");
                    // SpaceType
                    auth.requestMatchers(HttpMethod.GET, "/space-type/**").permitAll();
                    auth.requestMatchers("/space-type/**").hasAnyAuthority("SUPERADMIN", "ADMIN");
                    // Space
                    auth.requestMatchers(HttpMethod.GET, "/spaces/**").permitAll();
                    auth.requestMatchers(HttpMethod.POST, "/spaces/**").hasAnyAuthority("SUPERADMIN", "ADMIN");
                    auth.requestMatchers(HttpMethod.PUT, "/spaces/**").hasAnyAuthority("SUPERADMIN", "ADMIN");
                    auth.requestMatchers(HttpMethod.DELETE, "/spaces/**").hasAnyAuthority("SUPERADMIN", "ADMIN");
                    // Reservation
                    auth.requestMatchers(HttpMethod.GET, "/reservations/**").permitAll();
                    auth.requestMatchers("/reservations/**").authenticated();
                    // Favorites
                    auth.requestMatchers("/favorites/**").authenticated();
                    // Comments
                    auth.requestMatchers("/comments/**").authenticated();
                    auth.anyRequest().authenticated();
                })
                .csrf(config -> config.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}