package com.freq.airline.payload;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class TicketRequest {
    private int price;

    @NotNull
    private String seatNumber;
}
