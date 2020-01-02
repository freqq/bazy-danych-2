package com.freq.airline.payload;

import lombok.Data;

@Data
public class TicketEditRequest {
    private int price;
    private String seatNumber;
}
