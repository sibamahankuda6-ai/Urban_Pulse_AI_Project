package com.urbanpulse.service;

import com.urbanpulse.entity.User;
import com.urbanpulse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl
        implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {

        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @Override
    public User login(String email,
                      String password) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        if (!user.getPassword()
                .equals(password)) {

            throw new RuntimeException(
                    "Invalid Password");
        }

        return user;
    }
}
