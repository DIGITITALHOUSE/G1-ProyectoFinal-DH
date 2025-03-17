package com.reservation.backend.repositories;

import com.reservation.backend.entities.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISpaceRepository extends JpaRepository<Space, Long>, JpaSpecificationExecutor<Space> {

    // Método para encontrar un espacio por su nombre
    Space findByName(String name);

    // Método para obtener todos los espacios que contienen ciertas características
    List<Space> findByExtrasContaining(String keyword);

    // Método para obtener espacios por ciudad
    List<Space> findByCity(String city);

    // Método para encontrar un espacio por su ícono
    List<Space> findByIcono(String icono);

    // Método para obtener todos los espacios en un rango de precios (ej. horaPrice)
    List<Space> findByHourPriceBetween(Integer minPrice, Integer maxPrice);

    // Método para obtener todos los espacios de un tipo específico
    List<Space> findBySpaceType_Id(Long spaceTypeId);

    // Puedes agregar más métodos personalizados aquí según las necesidades
}
