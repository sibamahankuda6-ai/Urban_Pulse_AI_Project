package com.urbanpulse.service;

import com.urbanpulse.entity.User;
import com.urbanpulse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User registerUser(User user) {
        // Check for duplicate email
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered: " + user.getEmail());
        }

        // Enforce USER role — never trust client-submitted role
        user.setRole("USER");

        // Hash password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User login(String email, String password) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // Support both BCrypt-hashed and legacy plain-text passwords
        boolean passwordMatches;
        String storedPassword = user.getPassword();

        if (storedPassword != null && storedPassword.startsWith("$2")) {
            // BCrypt hashed
            passwordMatches = passwordEncoder.matches(password, storedPassword);
        } else {
            // Legacy plain-text (for existing test accounts in DB)
            passwordMatches = storedPassword != null && storedPassword.equals(password);
        }

        if (!passwordMatches) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
