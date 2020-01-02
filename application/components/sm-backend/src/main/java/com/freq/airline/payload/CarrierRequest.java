package com.freq.airline.payload;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class CarrierRequest {
    @NotNull
    private String carrierName;
}
