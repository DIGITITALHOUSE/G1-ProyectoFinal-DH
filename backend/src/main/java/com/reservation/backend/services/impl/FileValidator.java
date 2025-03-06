package com.reservation.backend.services.impl;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class FileValidator {

    private static final List<String> ALLOWED_IMAGE_TYPE = List.of(
            "image/jpeg", "image/png", "image/gif", "image/webp"
    );

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    public static boolean isValidImage(MultipartFile file){
        if (file == null || file.isEmpty()){
            throw new IllegalArgumentException("El archivo no puede estar vacío");
        }

        if(ALLOWED_IMAGE_TYPE.contains(file.getContentType())){
            throw new IllegalArgumentException("Solo se permiten imágenes (JPEG, PNG, GIF, WEBP).");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("El tamaño máximo permitido es 10MB.");
        }

        return true;
    }
}
