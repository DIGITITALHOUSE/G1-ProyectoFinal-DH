package com.reservation.backend.entities;

// import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// import java.util.List;

@Entity
@Table(name = "space_image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SpaceImage extends Base{
    @Column(name = "url", nullable = false)
    private String url;

    @ManyToOne
    @JoinColumn(name = "space_id")
    private Space space;
}
