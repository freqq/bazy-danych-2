package com.freq.airline.service.implementation;

import com.freq.airline.model.user.User;
import com.freq.airline.payload.ApiResponse;
import com.freq.airline.payload.UserEditRequest;
import com.freq.airline.repository.UserRepository;
import com.freq.airline.security.UserPrincipal;
import com.freq.airline.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> checkEmailAvaibility(String email){
        if(userRepository.existsByEmail(email))
            return new ResponseEntity<>(new ApiResponse(false, "Email address is already taken!"), HttpStatus.CONFLICT);

        return new ResponseEntity<>(new ApiResponse(true, "Email avaible."), HttpStatus.OK);
    }

    public ResponseEntity<?> editUser(UserPrincipal userPrincipal, UserEditRequest userEditRequest) {
        Optional<User> user = userRepository.findById(userPrincipal.getId());

        if(user.isPresent()){
            if(userEditRequest.getEmail() != null)
                user.get().setEmail(userEditRequest.getEmail());
            if(userEditRequest.getFirstName() != null)
                user.get().setFirstName(userEditRequest.getFirstName());
            if(userEditRequest.getLastName() != null)
                user.get().setLastName(userEditRequest.getLastName());
            if(userEditRequest.getPassword() != null || userEditRequest.getPassword().length() > 5)
                user.get().setPassword(passwordEncoder.encode(userEditRequest.getPassword()));

            userRepository.save(user.get());

            return new ResponseEntity<>("Edited given user correctly", HttpStatus.OK);
        }

        return new ResponseEntity<>("Given user doesnt exists", HttpStatus.NOT_FOUND);
    }

}
