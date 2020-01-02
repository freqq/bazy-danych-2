package com.freq.airline.payload;

import lombok.Data;

import java.util.Date;

@Data
public class ClientListResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String pesel;
    private Date birthday;
    private boolean isDiscount;
    private String email;
    private String iDNumber;
}
