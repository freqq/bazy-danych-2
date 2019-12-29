package com.freq.airline.payload.user;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CheckEmailRequest {
    @NotBlank
    private String email;
}
