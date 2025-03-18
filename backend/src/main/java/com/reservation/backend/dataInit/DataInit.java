package com.reservation.backend.dataInit;

import com.reservation.backend.entities.*;
import com.reservation.backend.repositories.ICommentRepository;
import com.reservation.backend.repositories.IReservationRepository;
import com.reservation.backend.repositories.ISpaceImageRepository;
import com.reservation.backend.repositories.ISpaceRepository;
import com.reservation.backend.repositories.ISpaceTypeRepository;
import com.reservation.backend.repositories.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInit implements CommandLineRunner {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ISpaceTypeRepository spaceTypeRepository;
    private final ISpaceRepository spaceRepository;
    private final ISpaceImageRepository spaceImageRepository;
    private final IReservationRepository reservationRepository;
    private final ICommentRepository commentRepository;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            insertarUsers();
        }

        if (spaceTypeRepository.count() == 0) {
            insertarSpaceTypes();
        }
        if (spaceRepository.count() == 0) {
            insertarSpaces();
        }

        if (reservationRepository.count() == 0) {
            insertarReservations();
            insertarComments();
        }
    }

    private void insertarUsers() {
        User superadmin = new User();
        superadmin.setEmail("superadmin@superadmin.com");
        superadmin.setPassword(passwordEncoder.encode("superadmin123"));
        superadmin.setName("superadmin");
        superadmin.setLastName("superadmin");
        superadmin.setRol(Rol.SUPERADMIN);
        userRepository.save(superadmin);
        User admin = new User();
        admin.setEmail("admin@admin.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setName("admin");
        admin.setLastName("admin");
        admin.setRol(Rol.ADMIN);
        userRepository.save(admin);
        User user = new User();
        user.setEmail("user@user.com");
        user.setPassword(passwordEncoder.encode("user123"));
        user.setName("user");
        user.setLastName("user");
        user.setRol(Rol.USER);
        userRepository.save(user);
    }

    private void insertarSpaceTypes() {
        List<SpaceType> spaceTypes = List.of(
                new SpaceType("Sala de reuniones", List.of()),
                new SpaceType("Escritorio dedicado", List.of()),
                new SpaceType("Oficina privada", List.of()),
                new SpaceType("Oficina de piso completo", List.of()),
                new SpaceType("Sala de conferencias", List.of()));
        spaceTypeRepository.saveAll(spaceTypes);
    }

    private void insertarSpaces() {
        List<SpaceType> spaceTypes = spaceTypeRepository.findAll();

        List<Space> spaces = List.of(
                new Space("Sala de reuniones en Centro Empresarial", "Sala equipada con proyector y pizarra", 12, 80,
                        "Av. Principal 123", "Artigas", "Uruguay", 0.0, 0.0, "12345", "Activo",
                        "WiFi, Aire acondicionado", "prueba",
                        Time.valueOf("09:00:00"),
                        Time.valueOf("18:00:00"),
                        List.of(), List.of(),
                        getSpaceType(spaceTypes, "Sala de reuniones")),
                new Space("Escritorio dedicado en Coworking XYZ", "Escritorio individual en zona coworking", 1, 25,
                        "Calle Secundaria 456", "La Paz", "Bolivia", 0.0, 0.0, "67890", "Activo",
                        "WiFi, Silla ergonómica", "prueba",
                        Time.valueOf("09:00:00"),
                        Time.valueOf("18:00:00"),
                        List.of(), List.of(),
                        getSpaceType(spaceTypes, "Escritorio dedicado")),
                new Space("Oficina privada con vista a la ciudad", "Oficina privada con capacidad para 4 personas", 4,
                        120, "Av. Central 789", "Antofagasta", "Chile", 0.0, 0.0, "54321", "Activo",
                        "WiFi, Mobiliario moderno", "prueba",
                        Time.valueOf("09:00:00"),
                        Time.valueOf("18:00:00"),
                        List.of(), List.of(),
                        getSpaceType(spaceTypes, "Oficina privada")),
                new Space("Piso completo en Edificio Corporativo", "Piso exclusivo con recepción y salas de reuniones",
                        25, 500, "Torre Empresarial 101", "Guanajuato", "México", 0.0, 0.0, "98765", "Activo",
                        "Seguridad 24/7, Internet de alta velocidad", "prueba",
                        Time.valueOf("09:00:00"),
                        Time.valueOf("18:00:00"),
                        List.of(), List.of(),
                        getSpaceType(spaceTypes, "Oficina de piso completo")),
                new Space("Sala de conferencias en Hotel ABC", "Sala con capacidad para 50 personas", 50, 300,
                        "Boulevard 555", "Arequipa", "Perú", 0.0, 0.0, "23456", "Activo",
                        "Pantalla gigante, Sonido profesional", "prueba",
                        Time.valueOf("09:00:00"),
                        Time.valueOf("18:00:00"),
                        List.of(), List.of(),
                        getSpaceType(spaceTypes, "Sala de conferencias")));

        spaceRepository.saveAll(spaces);
        insertarSpaceImages(spaces);
    }

    private void insertarSpaceImages(List<Space> spaces) {
        List<SpaceImage> images = spaces.stream()
                .map(space -> new SpaceImage(
                        "https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?w=2048"
                                + space.getId() + ".jpg",
                        space))
                .toList();

        spaceImageRepository.saveAll(images);
    }

    private SpaceType getSpaceType(List<SpaceType> spaceTypes, String name) {
        return spaceTypes.stream()
                .filter(type -> type.getName().equals(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("SpaceType not found: " + name));
    }

    private void insertarReservations() {
        Space space = spaceRepository.findAll().get(0);
        User user = userRepository.findById(3L).orElseThrow(() -> new RuntimeException("User not found"));
        Reservation reservation = new Reservation();
        reservation.setReservationDate(LocalDate.now());
        reservation.setStartHour(Time.valueOf("09:00:00"));
        reservation.setEndHour(Time.valueOf("18:00:00"));
        reservation.setUser(user);
        reservation.setSpace(space);
        reservationRepository.save(reservation);
    }

    private void insertarComments() {
        Comment comment = new Comment();
        comment.setComment("Excelente espacio para reuniones");
        comment.setRating(4.5);
        comment.setUser(userRepository.findById(3L).orElseThrow(() -> new RuntimeException("User not found")));
        comment.setReservation(
                reservationRepository.findById(1L).orElseThrow(() -> new RuntimeException("Reservation not found")));
        commentRepository.save(comment);
    }
}
