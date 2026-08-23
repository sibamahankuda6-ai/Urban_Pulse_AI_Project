package com.urbanpulse.controller;

import com.urbanpulse.dao.LoginRequest;
import com.urbanpulse.entity.User;
import com.urbanpulse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(
            @RequestBody User user) {

        return userService.saveUser(user);
    }

    @PostMapping("/login")
    public User login(
            @RequestBody LoginRequest request) {

        return userService.login(
                request.getEmail(),
                request.getPassword());
    }

    @GetMapping
    public List<User> getAllUsers() {

        return userService.getAllUsers();
    }
}
