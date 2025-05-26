package com.busbooking.busapp.controller;

import com.busbooking.busapp.dto.UserResponseDTO;
import com.busbooking.busapp.model.User;
import com.busbooking.busapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.busbooking.busapp.util.JwtUtil;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public UserResponseDTO loginUser(@RequestBody User user) {
        User loggedInUser = userService.login(user.getEmail(), user.getPassword());
        if (loggedInUser == null) {
            throw new RuntimeException("Invalid credentials");
        }
        String token = jwtUtil.generateToken(loggedInUser.getEmail(), loggedInUser.getRole());


        return new UserResponseDTO(
        	    loggedInUser.getId(),
        	    loggedInUser.getName(),
        	    loggedInUser.getEmail(),
        	    loggedInUser.getRole(),
        	    token
        	);
    }

}
