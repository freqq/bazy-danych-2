package com.freq.airline.payload;

import lombok.Data;

import java.util.Date;

@Data
public class FlightRequest {
    private Long id;
    private String destinationPlace;
    private String startPlace;
    private Date flightDate;
    private Long carrierName;
    private Long planeName;
}
