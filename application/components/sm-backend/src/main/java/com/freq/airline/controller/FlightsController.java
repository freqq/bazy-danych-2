package com.freq.airline.controller;

import com.freq.airline.payload.*;
import com.freq.airline.service.FlightsService;
import org.hibernate.sql.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/flights")
public class FlightsController {
    private FlightsService flightsService;

    @Autowired
    public FlightsController(FlightsService flightsService){
        this.flightsService = flightsService;
    }

    @GetMapping("/")
    public List<FlightsListResponse> getFlights() {
        return flightsService.getFlights();
    }

    @PostMapping("/remove/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> removeFlight(@PathVariable("id") Long flightId){
        return flightsService.removeFlight(flightId);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addFlight(@Valid @RequestBody FlightRequest flightRequest){
        return flightsService.addFlight(flightRequest);
    }

    @GetMapping("/{id}")
    public FlightResponse getFlight(@PathVariable("id") Long flightId){
        return flightsService.getFlightById(flightId);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> editFlight(@PathVariable("id") Long flightId,
                                        @Valid @RequestBody FlightEditRequest flightEditRequest){
        return flightsService.editFlight(flightId, flightEditRequest);
    }

    @GetMapping("/names")
    public List<SelectResponse> getFlightsNames(){
        return flightsService.getFlightsNames();
    }
}
