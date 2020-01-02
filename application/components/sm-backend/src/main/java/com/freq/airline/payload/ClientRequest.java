package com.freq.airline.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
public class ClientRequest {
    @NotNull
    @Size(max = 30)
    private String firstName;

    @NotNull
    @Size(max = 30)
    private String lastName;

    @Size(max = 11)
    private String pesel;

    private Date birthday;

    private boolean isDiscount;

    private String email;

    @NotBlank
    private String iDNumber;
}
