package com.freq.social.payload;

import com.freq.social.model.Flight;
import lombok.Data;

import java.util.List;

@Data
public class FlightsResponse {
    private List<Flight> flightList;
}
