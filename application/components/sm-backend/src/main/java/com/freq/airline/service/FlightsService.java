package com.freq.airline.service;

import com.freq.airline.payload.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface FlightsService {
    List<FlightsListResponse> getFlights();
    ResponseEntity<?> removeFlight(Long flightId);
    ResponseEntity<?> addFlight(FlightRequest flightRequest);
    FlightResponse getFlightById(Long flightId);
    ResponseEntity<?> editFlight(Long flightId, FlightEditRequest flightEditRequest);
    List<SelectResponse> getFlightsNames();

}
