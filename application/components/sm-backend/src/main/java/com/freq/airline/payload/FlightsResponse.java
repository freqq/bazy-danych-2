package com.freq.airline.payload;

import com.freq.airline.model.Flight;
import lombok.Data;

import java.util.List;

@Data
public class FlightsResponse {
    private List<Flight> flightList;
}
