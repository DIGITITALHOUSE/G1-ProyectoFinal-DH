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

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(
                auth -> {
                    auth.requestMatchers("/health-check").permitAll();
                    auth.requestMatchers("/auth/**").permitAll();
                    auth.requestMatchers("/doc/**").permitAll();
                    auth.requestMatchers("/v3/api-docs/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/spaces/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/reservations/**").permitAll();
                    auth.requestMatchers("/users/**").hasAuthority("ADMIN");
                    auth.requestMatchers("/space-type/**").hasAuthority("ADMIN");
                    auth.requestMatchers(HttpMethod.POST, "/spaces/**").hasAuthority("ADMIN");
                    auth.requestMatchers(HttpMethod.PUT, "/spaces/**").hasAuthority("ADMIN");
                    auth.requestMatchers(HttpMethod.DELETE, "/spaces/**").hasAuthority("ADMIN");
                    auth.requestMatchers("/reservations/**").authenticated();
                    auth.anyRequest().authenticated();
                })
                .csrf(config -> config.disable())
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider)
                .build();
    }
}
