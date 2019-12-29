package com.freq.airline.service.implementation;

import com.freq.airline.payload.ApiResponse;
import com.freq.airline.repository.UserRepository;
import com.freq.airline.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> checkEmailAvaibility(String email){
        if(userRepository.existsByEmail(email))
            return new ResponseEntity<>(new ApiResponse(false, "Email address is already taken!"), HttpStatus.CONFLICT);

        return new ResponseEntity<>(new ApiResponse(true, "Email avaible."), HttpStatus.OK);
    }
}
