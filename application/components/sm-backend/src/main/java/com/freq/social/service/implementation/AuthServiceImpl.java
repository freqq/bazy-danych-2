package com.freq.social.service.implementation;

import com.freq.social.exception.AppException;
import com.freq.social.model.user.User;
import com.freq.social.model.user.roles.Role;
import com.freq.social.model.user.roles.RoleName;
import com.freq.social.payload.ApiResponse;
import com.freq.social.payload.user.JwtAuthenticationResponse;
import com.freq.social.payload.user.LoginRequest;
import com.freq.social.payload.user.RegisterRequest;
import com.freq.social.repository.RoleRepository;
import com.freq.social.repository.UserRepository;
import com.freq.social.security.JwtTokenProvider;
import com.freq.social.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.Date;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public ResponseEntity<?> registerUser(RegisterRequest registerRequest){
        if(userRepository.existsByEmail(registerRequest.getEmail()))
            return new ResponseEntity<>(new ApiResponse(false, "Email address is already taken"), HttpStatus.BAD_REQUEST);

        User user = new User(registerRequest.getFirstName(), registerRequest.getLastName(), registerRequest.getEmail(), registerRequest.getPassword(), registerRequest.getGender(), new Date(registerRequest.getBirthDay()));

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(() -> new AppException("User role not set."));
        user.setRoles(Collections.singleton(userRole));

        User resultUser = userRepository.save(user);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/vi/api/users/{username}").buildAndExpand(resultUser.getEmail()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered succesfully"));
    }

    public ResponseEntity<?> loginUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtTokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }
}
