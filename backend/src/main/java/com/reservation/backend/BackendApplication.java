package com.reservation.backend;

import com.reservation.backend.entities.Rol;
import com.reservation.backend.entities.User;
import com.reservation.backend.repositories.IUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	@Bean
	CommandLineRunner init(IUserRepository userRepository, PasswordEncoder passwordEncoder){
		return args -> {
			if(userRepository.findByEmail("admin@admin.com").isEmpty()){
				User admin = new User();
				admin.setEmail("admin@admin.com");
				admin.setPassword(passwordEncoder.encode("admin123"));
				admin.setName("admin");
				admin.setLastName("admin");
				admin.setRol(Rol.ADMIN);
				userRepository.save(admin);
			}
		};
	}

}
