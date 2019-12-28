package com.freq.social.service.implementation;

import com.freq.social.payload.ApiResponse;
import com.freq.social.payload.user.CheckEmailRequest;
import com.freq.social.repository.UserRepository;
import com.freq.social.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> checkEmailAvaibility(String email){
        if(userRepository.existsByEmail(email))
            return new ResponseEntity<>(new ApiResponse(false, "Email address is already taken!"), HttpStatus.CONFLICT);

        return new ResponseEntity<>(new ApiResponse(true, "Email avaible."), HttpStatus.OK);
    }
}
