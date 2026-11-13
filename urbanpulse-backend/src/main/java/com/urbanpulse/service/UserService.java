package com.urbanpulse.service;

import com.urbanpulse.entity.User;
import java.util.List;

public interface UserService {

    User saveUser(User user);

    User registerUser(User user);

    List<User> getAllUsers();

    User login(String email, String password);

    User findByEmail(String email);

    void deleteUser(Long id);
}
