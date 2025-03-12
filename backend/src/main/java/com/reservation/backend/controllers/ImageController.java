package com.reservation.backend.controllers;

import com.reservation.backend.entities.Space;
import com.reservation.backend.entities.SpaceImage;
import com.reservation.backend.repositories.ISpaceImageRepository;
import com.reservation.backend.repositories.ISpaceRepository;
import com.reservation.backend.services.impl.S3Service;
import com.reservation.backend.services.impl.SpaceImageService;
import com.reservation.backend.services.impl.SpaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/imagenes")
@RequiredArgsConstructor
public class ImageController {

    private final S3Service s3Service;

    private final ISpaceImageRepository spaceImageRepository;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("spaceId") Long spaceId) {
        try {

            String url = s3Service.uploadImage(file);


            SpaceImage spaceImage = new SpaceImage();
            spaceImage.setUrl(url);
            spaceImageRepository.save(spaceImage);


            return ResponseEntity.ok("Imagen subida exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/space/{spaceId}")
    public ResponseEntity<List<String>> getImagesForSpace(@PathVariable Long spaceId) {
        try {

            var images = spaceImageRepository.findBySpaceId(spaceId);


            var preSignedUrls = images.stream()
                    .map(image -> s3Service.generatePreSignedURL(image.getUrl()))
                    .toList();

            return ResponseEntity.ok(preSignedUrls);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);

        }
    }
}
