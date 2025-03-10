package com.reservation.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import com.reservation.backend.controllers.ImageUploadController;

import java.io.IOException;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ImageUploadControllerTest {

    private ImageUploadController imageUploadController;

    @Mock
    private MultipartFile file;

    private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        imageUploadController = new ImageUploadController();
    }

    @Test
    void testUploadImage_Success() throws IOException {
        // Simular un archivo con contenido
        when(file.isEmpty()).thenReturn(false);
        when(file.getOriginalFilename()).thenReturn("test-image.jpg");

        // Crear un ArgumentCaptor para el archivo de destino
        ArgumentCaptor<Path> captor = ArgumentCaptor.forClass(Path.class);
        doNothing().when(file).transferTo(captor.capture());

        // Ejecutar el método y verificar resultado
        String response = imageUploadController.uploadImage(file);
        assertEquals("Imagen subida exitosamente: test-image.jpg", response);

        // Verificar el archivo de destino capturado
        Path capturedFile = captor.getValue();
        assertNotNull(capturedFile);
        assertEquals(UPLOAD_DIR + "test-image.jpg", capturedFile.toString());
    }

    @Test
    void testUploadImage_EmptyFile() {
        // Simular archivo vacío
        when(file.isEmpty()).thenReturn(true);

        // Ejecutar el método y verificar el mensaje de error
        String response = imageUploadController.uploadImage(file);
        assertEquals("Error: No se seleccionó un archivo.", response);
    }

    @Test
    void testUploadImage_IOException() throws IOException {
        // Simular un archivo con contenido
        when(file.isEmpty()).thenReturn(false);
        when(file.getOriginalFilename()).thenReturn("test-image.jpg");

        // Simular que ocurre un error de IO al guardar el archivo
        doThrow(new IOException("Simulated error")).when(file).transferTo(any(Path.class));

        // Ejecutar el método y verificar el mensaje de error
        String response = imageUploadController.uploadImage(file);
        assertEquals("Error al subir la imagen: Simulated error", response);
    }
}
