package com.freq.airline.payload;

import lombok.Data;

@Data
public class UserEditRequest {
    private String password;
    private String email;
    private String firstName;
    private String lastName;
}
