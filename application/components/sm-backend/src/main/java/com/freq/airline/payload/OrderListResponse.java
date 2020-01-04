package com.freq.airline.payload;

import lombok.Data;

@Data
public class OrderListResponse {
    private Long id;
    private String client;
    private String flight;
    private String ticket;
    private int baggageWeight;
    private String flightClass;
}
