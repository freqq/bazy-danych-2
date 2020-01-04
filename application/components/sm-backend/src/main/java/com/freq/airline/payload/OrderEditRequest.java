package com.freq.airline.payload;

import lombok.Data;

@Data
public class OrderEditRequest {
    private Long id;
    private Long client;
    private Long flight;
    private Long ticket;
    private int baggageWeight;
    private String flightClass;
}
