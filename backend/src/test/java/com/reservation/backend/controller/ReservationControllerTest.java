package com.reservation.backend.controller;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.reservation.backend.controllers.ReservationController;
import com.reservation.backend.services.impl.ReservationService;

public class ReservationControllerTest {
   @Test
    public void testControllerBasics() {
                ReservationService mockService = Mockito.mock(ReservationService.class);
        
       
        ReservationController controller = new ReservationController(mockService);
        
        
        assert controller != null;
    }
 
}
