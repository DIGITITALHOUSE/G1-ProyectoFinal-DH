package com.reservation.backend.specifications;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.reservation.backend.entities.Reservation;
import com.reservation.backend.entities.Space;
import com.reservation.backend.entities.SpaceType;

import jakarta.persistence.criteria.*;

public class SpaceSpecifications {
    public static Specification<Space> filterByKeyword(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("city")), "%" + keyword.toLowerCase() + "%");
        };
    }

    public static Specification<Space> filterByCountry(String country) {
        return (root, query, criteriaBuilder) -> {
            if (country == null || country.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("country")), "%" + country.toLowerCase() + "%");
        };
    }

    public static Specification<Space> filterBySpaceType(Long spaceTypeId) {
        return (root, query, criteriaBuilder) -> {
            if (spaceTypeId == null) {
                return criteriaBuilder.conjunction();
            }
            Join<Space, SpaceType> spaceTypeJoin = root.join("spaceType", JoinType.INNER);
            return criteriaBuilder.equal(spaceTypeJoin.get("id"), spaceTypeId);
            // return criteriaBuilder.equal(root.get("spaceType").get("id"), spaceTypeId);
        };
    }

    public static Specification<Space> includeAvailableSpaces(LocalDate date) {
        return (root, query, criteriaBuilder) -> {
            if (date == null) {
                return criteriaBuilder.conjunction();
            }
            // Subquery para obtener la suma de horas reservadas en un día específico por
            // cada espacio
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<Reservation> reservationRoot = subquery.from(Reservation.class);

            // Calcular la diferencia de horas entre startHour y endHour
            Expression<Long> totalHorasReservadas = criteriaBuilder.sum(
                    criteriaBuilder.diff(reservationRoot.get("endHour"), reservationRoot.get("startHour")));

            Predicate mismoEspacio = criteriaBuilder.equal(reservationRoot.get("space").get("id"), root.get("id"));
            Predicate mismaFecha = criteriaBuilder.equal(reservationRoot.get("reservationDate"), date);

            subquery.select(totalHorasReservadas)
                    .where(mismoEspacio, mismaFecha);

            // Calcular la diferencia de horas entre closeAt y openAt para obtener el total
            // disponible
            Expression<Long> totalHorasDisponibles = criteriaBuilder.diff(root.get("closeAt"), root.get("openAt"));

            // Excluir los espacios donde la suma de las reservas iguala o supera las horas
            // disponibles
            return criteriaBuilder.or(
                    criteriaBuilder.isNull(subquery.getSelection()), // Si no hay reservas, incluir el espacio
                    criteriaBuilder.lessThan(subquery.getSelection(), totalHorasDisponibles) // Si aún hay horas
                                                                                             // disponibles
            );
        };
    }
}
