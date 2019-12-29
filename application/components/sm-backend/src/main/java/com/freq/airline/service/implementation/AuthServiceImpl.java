package com.freq.airline.service.implementation;

import com.freq.airline.exception.AppException;
import com.freq.airline.model.user.User;
import com.freq.airline.model.user.roles.Role;
import com.freq.airline.model.user.roles.RoleName;
import com.freq.airline.payload.ApiResponse;
import com.freq.airline.payload.user.JwtAuthenticationResponse;
import com.freq.airline.payload.user.LoginRequest;
import com.freq.airline.payload.user.RegisterRequest;
import com.freq.airline.repository.RoleRepository;
import com.freq.airline.repository.UserRepository;
import com.freq.airline.security.JwtTokenProvider;
import com.freq.airline.service.AuthService;
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
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;

    private AuthenticationManager authenticationManager;

    private PasswordEncoder passwordEncoder;

    private RoleRepository roleRepository;

    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, AuthenticationManager authenticationManager,
                           PasswordEncoder passwordEncoder, RoleRepository roleRepository, JwtTokenProvider jwtTokenProvider){
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public ResponseEntity<?> registerUser(RegisterRequest registerRequest){
        if(userRepository.existsByEmail(registerRequest.getEmail()))
            return new ResponseEntity<>(new ApiResponse(false,
                                                "Email address is already taken"), HttpStatus.BAD_REQUEST);

        User user = new User(registerRequest.getFirstName(), registerRequest.getLastName(),
                registerRequest.getUsername(), registerRequest.getEmail(), registerRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(()
                                                -> new AppException("User role not set."));
        user.setRoles(Collections.singleton(userRole));

        User resultUser = userRepository.save(user);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/users/{username}").buildAndExpand(resultUser.getEmail()).toUri();

        return ResponseEntity.created(location).body(
                new ApiResponse(true, "User registered succesfully"));
    }

    public ResponseEntity<?> loginUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtTokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }
}
