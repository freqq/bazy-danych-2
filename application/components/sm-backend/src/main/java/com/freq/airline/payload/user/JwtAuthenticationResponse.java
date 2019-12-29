package com.freq.airline.payload.user;

import com.freq.airline.model.user.roles.Role;
import lombok.Data;

import java.util.Set;

@Data
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private Set<Role> roles;

    public JwtAuthenticationResponse(String accessToken, String username, String firstName, String lastName,
                                     String email, Set<Role> roles) {
        this.accessToken = accessToken;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.roles = roles;
    }
}