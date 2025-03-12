package com.reservation.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageUploadService {

    private static final String UPLOAD_DIR = "uploads/";

    public String uploadImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("El archivo está vacío");
        }

        // Crear directorio si no existe
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Guardar archivo
        Path filePath = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
        Files.write(filePath, file.getBytes());

        return "Imagen subida con éxito: " + filePath.toString();
    }

    public static String uploadFile(MultipartFile file) {
      
        throw new UnsupportedOperationException("Unimplemented method 'uploadFile'");
    }
}
