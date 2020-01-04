package com.freq.airline.controller;

import com.freq.airline.payload.UserEditRequest;
import com.freq.airline.payload.UserProfileResponse;
import com.freq.airline.payload.UserSummary;
import com.freq.airline.security.CurrentUser;
import com.freq.airline.security.UserPrincipal;
import com.freq.airline.service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> checkEmailAvailability(@PathVariable("email") String email) {
        return userService.checkEmailAvaibility(email);
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(),
                currentUser.getFirstName(), currentUser.getLastName(), currentUser.getEmail());
        return userSummary;
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    public UserProfileResponse getUserProfile(@CurrentUser UserPrincipal userPrincipal){
        return new UserProfileResponse(userPrincipal.getId(), userPrincipal.getUsername(),
                userPrincipal.getEmail(), userPrincipal.getFirstName(), userPrincipal.getLastName());
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> editUser(@CurrentUser UserPrincipal currentUser,
                                      @Valid @RequestBody UserEditRequest userEditRequest){
        return userService.editUser(currentUser, userEditRequest);
    }
}
