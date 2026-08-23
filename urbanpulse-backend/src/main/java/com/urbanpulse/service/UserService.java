package com.urbanpulse.service;

import com.urbanpulse.entity.User;

import java.util.List;

public interface UserService {

    User saveUser(User user);

    List<User> getAllUsers();

    User login(String email, String password);
}
