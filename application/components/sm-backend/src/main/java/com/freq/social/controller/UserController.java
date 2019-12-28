package com.freq.social.controller;

import com.freq.social.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
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

}
