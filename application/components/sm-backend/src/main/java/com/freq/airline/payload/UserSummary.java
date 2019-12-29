package com.freq.airline.payload;

import lombok.Data;

@Data
public class UserSummary {
    private Long id;
    private String userName;
    private String firstName;
    private String lastName;
    private String email;

    public UserSummary(){}

    public UserSummary(Long id, String userName, String firstName, String lastName, String email) {
        this.id = id;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
