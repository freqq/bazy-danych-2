package com.freq.airline.payload;

import lombok.Data;

import java.util.Date;

@Data
public class ClientEditRequest {
    private String firstName;
    private String lastName;
    private String pesel;
    private Date birthday;
    private boolean isDiscount;
    private String email;
    private String iDNumber;
}
