package com.freq.social.service;

import com.freq.social.payload.user.LoginRequest;
import com.freq.social.payload.user.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    ResponseEntity<?> registerUser(RegisterRequest registerRequest);
    ResponseEntity<?> loginUser(LoginRequest loginRequest);
}
