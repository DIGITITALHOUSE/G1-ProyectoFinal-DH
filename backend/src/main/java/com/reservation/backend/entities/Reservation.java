package com.reservation.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.function.IntPredicate;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation extends Base {
    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "state", nullable = true)
    private String state;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "space_id")
    private Space space;

    public void setCustomerName(String string) {
       
        throw new UnsupportedOperationException("Unimplemented method 'setCustomerName'");
    }

    public void setReservationDate(LocalDateTime now) {
      
        throw new UnsupportedOperationException("Unimplemented method 'setReservationDate'");
    }

    public void setStatus(String string) {
      
        throw new UnsupportedOperationException("Unimplemented method 'setStatus'");
    }

    public IntPredicate getCustomerName() {
      
        throw new UnsupportedOperationException("Unimplemented method 'getCustomerName'");
    }
}
