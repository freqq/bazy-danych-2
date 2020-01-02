package com.freq.airline.payload;

import lombok.Data;

@Data
public class TicketListResponse {
    private Long id;
    private int price;
    private String seatNumber;
}
