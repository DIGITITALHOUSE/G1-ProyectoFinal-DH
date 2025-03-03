package com.reservation.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "spaces")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Space extends Base {
    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @Column(name = "description", nullable = true)
    private String description;

    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @Column(name = "hour_price", nullable = false)
    private Integer hourPrice;

    @Column(name = "direction", nullable = false)
    private String direction;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "zip_code", nullable = false)
    private String zipCode;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "extras", nullable = false)
    private String extras;

    @OneToMany(mappedBy = "space", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<SpaceImage> spaceImages;

    @OneToMany(mappedBy = "space")
    @JsonIgnore
    private List<Reservation> reservations;

    @ManyToOne
    @JoinColumn(name = "space_type_id")
    private SpaceType spaceType;
}
