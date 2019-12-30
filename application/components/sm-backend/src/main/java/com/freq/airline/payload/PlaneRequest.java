package com.freq.airline.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class PlaneRequest {
    @NotBlank
    String planeModel;

    @NotBlank
    String seatsCount;
}
