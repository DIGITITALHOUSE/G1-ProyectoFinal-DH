package com.reservation.backend.dtos;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class SpaceImageRequestDto {
    private Long spaceId;
    private List<MultipartFile> images;
}
