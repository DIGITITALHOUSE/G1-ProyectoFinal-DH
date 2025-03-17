package com.reservation.backend.specifications;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

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
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<Reservation> reservationRoot = subquery.from(Reservation.class);

            LocalDateTime startOfDay = date.atStartOfDay(); // aaaa-mm-dd 00:00:00
            LocalDateTime endOfDay = date.atTime(LocalTime.MAX); // aaaa-mm-dd 23:59:59

            // Calcular la cantidad de tiempo reservado (en minutos) en un día
            // Expression<Long> reservedMinutes = criteriaBuilder.coalesce(
            //         criteriaBuilder.sum(
            //                 criteriaBuilder.function(
            //                         "timestampdiff",
            //                         Long.class,
            //                         criteriaBuilder.literal("MINUTE"), // Aseguramos que sea reconocido
            //                         reservationRoot.get("startDate"),
            //                         reservationRoot.get("endDate"))),
            //         criteriaBuilder.literal(0L) // Si no hay reservas, devolver 0
            // );

            subquery.select(criteriaBuilder.count(reservationRoot))
                .where(
                    criteriaBuilder.equal(reservationRoot.get("space"), root),
                    criteriaBuilder.lessThanOrEqualTo(reservationRoot.get("startDate"), endOfDay),
                    criteriaBuilder.greaterThanOrEqualTo(reservationRoot.get("endDate"), startOfDay)
                );

            return criteriaBuilder.or(
                    criteriaBuilder.lessThan(subquery, criteriaBuilder.literal(1440L)),
                    criteriaBuilder.isNull(subquery));
        };
    }
}
