package com.reservation.backend.dataInit;

import com.reservation.backend.entities.*;
import com.reservation.backend.repositories.ISpaceImageRepository;
import com.reservation.backend.repositories.ISpaceRepository;
import com.reservation.backend.repositories.ISpaceTypeRepository;
import com.reservation.backend.repositories.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInit implements CommandLineRunner {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ISpaceTypeRepository spaceTypeRepository;
    private final ISpaceRepository spaceRepository;
    private final ISpaceImageRepository spaceImageRepository;

    @Override
    public void run(String... args) {
        if(userRepository.findByEmail("admin@admin.com").isEmpty()){
            User admin = new User();
            admin.setEmail("admin@admin.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setName("admin");
            admin.setLastName("admin");
            admin.setRol(Rol.ADMIN);
            userRepository.save(admin);
        }

        if (spaceTypeRepository.count() == 0) {
            insertarSpaceTypes();
        }
        if (spaceRepository.count() == 0) {
            insertarSpaces();
        }
    }

    private void insertarSpaceTypes() {
        List<SpaceType> spaceTypes = List.of(
                new SpaceType("Sala de reuniones", List.of()),
                new SpaceType("Escritorio dedicado", List.of()),
                new SpaceType("Oficina privada", List.of()),
                new SpaceType("Oficina de piso completo", List.of()),
                new SpaceType("Sala de conferencias", List.of())
        );
        spaceTypeRepository.saveAll(spaceTypes);
    }

    private void insertarSpaces() {
        List<SpaceType> spaceTypes = spaceTypeRepository.findAll();

        List<Space> spaces = List.of(
                new Space("Sala de reuniones en Centro Empresarial", "Sala equipada con proyector y pizarra", 12, 80, "Av. Principal 123", "Ciudad", "País", "12345", "Activo", "WiFi, Aire acondicionado", List.of(), List.of(), getSpaceType(spaceTypes, "Sala de reuniones")),
                new Space("Escritorio dedicado en Coworking XYZ", "Escritorio individual en zona coworking", 1, 25, "Calle Secundaria 456", "Ciudad", "País", "67890", "Activo", "WiFi, Silla ergonómica", List.of(), List.of(), getSpaceType(spaceTypes, "Escritorio dedicado")),
                new Space("Oficina privada con vista a la ciudad", "Oficina privada con capacidad para 4 personas", 4, 120, "Av. Central 789", "Ciudad", "País", "54321", "Activo", "WiFi, Mobiliario moderno", List.of(), List.of(), getSpaceType(spaceTypes, "Oficina privada")),
                new Space("Piso completo en Edificio Corporativo", "Piso exclusivo con recepción y salas de reuniones", 25, 500, "Torre Empresarial 101", "Ciudad", "País", "98765", "Activo", "Seguridad 24/7, Internet de alta velocidad", List.of(), List.of(), getSpaceType(spaceTypes, "Oficina de piso completo")),
                new Space("Sala de conferencias en Hotel ABC", "Sala con capacidad para 50 personas", 50, 300, "Boulevard 555", "Ciudad", "País", "23456", "Activo", "Pantalla gigante, Sonido profesional", List.of(), List.of(), getSpaceType(spaceTypes, "Sala de conferencias"))
        );

        spaceRepository.saveAll(spaces);
        insertarSpaceImages(spaces);
    }

    private void insertarSpaceImages(List<Space> spaces) {
        List<SpaceImage> images = spaces.stream()
                .map(space -> new SpaceImage("https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?w=2048" + space.getId() + ".jpg", space))
                .toList();

        spaceImageRepository.saveAll(images);
    }

    private SpaceType getSpaceType(List<SpaceType> spaceTypes, String name) {
        return spaceTypes.stream()
                .filter(type -> type.getName().equals(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("SpaceType not found: " + name));
    }
}
