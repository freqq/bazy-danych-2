package com.freq.airline.service;

import com.freq.airline.payload.user.LoginRequest;
import com.freq.airline.payload.user.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    ResponseEntity<?> registerUser(RegisterRequest registerRequest);
    ResponseEntity<?> loginUser(LoginRequest loginRequest);
}
