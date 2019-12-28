package com.freq.social.payload.user;

import lombok.Data;

import javax.validation.constraints.*;
import java.util.Date;

@Data
public class RegisterRequest {
    @NotBlank
    @Size(min = 2, max = 30)
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 30)
    private String lastName;

    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    @NotBlank
    private String gender;

    @NotNull
    private long birthDay;
}
