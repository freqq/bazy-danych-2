package com.freq.airline.payload;

import lombok.Data;

@Data
public class PlaneEditRequest {
    private String planeModel;
    private int seatsCount;
}
