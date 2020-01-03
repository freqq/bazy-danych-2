package com.freq.airline.payload;

import lombok.Data;

import java.util.Date;

@Data
public class FlightsListResponse {
    private Long id;
    private String destinationPlace;
    private String startPlace;
    private Date flightDate;
    private String carrierName;
    private String planeName;
}
