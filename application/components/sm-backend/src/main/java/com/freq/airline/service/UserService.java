package com.freq.airline.service;

import com.freq.airline.payload.UserEditRequest;
import com.freq.airline.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    ResponseEntity<?> checkEmailAvaibility(String email);
    ResponseEntity<?> editUser(UserPrincipal userPrincipal, UserEditRequest userEditRequest);
}
