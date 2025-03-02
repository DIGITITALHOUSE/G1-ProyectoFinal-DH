package com.reservation.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "space_type")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SpaceType extends Base {
    @Column( name = "name", unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy = "spaceType")
    @JsonIgnore
    private List<Space> spaces;
}
