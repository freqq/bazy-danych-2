package com.freq.airline.payload;

import lombok.Data;

@Data
public class OrderRequest {
    private Long client;
    private Long flight;
    private Long ticket;
    private int baggageWeight;
    private String flightClass;
}
