package com.urbanpulse.controller;

import com.urbanpulse.dao.LoginRequest;
import com.urbanpulse.dto.LoginResponse;
import com.urbanpulse.dto.RegisterRequest;
import com.urbanpulse.entity.User;
import com.urbanpulse.security.JwtUtil;
import com.urbanpulse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000"}, allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // ── REGISTRATION ────────────────────────────────────────────────────────
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(errorBody("Full name is required"));
            }
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(errorBody("Email is required"));
            }
            if (request.getPassword() == null || request.getPassword().length() < 8) {
                return ResponseEntity.badRequest().body(errorBody("Password must be at least 8 characters"));
            }

            User user = new User();
            user.setName(request.getName().trim());
            user.setEmail(request.getEmail().trim().toLowerCase());
            user.setPhone(request.getPhone());
            user.setPassword(request.getPassword());

            User saved = userService.registerUser(user);

            Map<String, Object> resp = new HashMap<>();
            resp.put("message", "Registration successful");
            resp.put("id", saved.getId());
            resp.put("name", saved.getName());
            resp.put("email", saved.getEmail());
            resp.put("role", saved.getRole());
            return ResponseEntity.status(HttpStatus.CREATED).body(resp);

        } catch (RuntimeException ex) {
            if (ex.getMessage() != null && ex.getMessage().contains("already registered")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(errorBody(ex.getMessage()));
            }
            return ResponseEntity.badRequest().body(errorBody(ex.getMessage()));
        }
    }

    // ── LOGIN ────────────────────────────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(errorBody("Email is required"));
            }
            if (request.getPassword() == null || request.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body(errorBody("Password is required"));
            }

            User user = userService.login(
                    request.getEmail().trim().toLowerCase(),
                    request.getPassword()
            );

            String role = user.getRole() != null ? user.getRole().toUpperCase() : "USER";
            String token = jwtUtil.generateToken(user.getEmail(), role, user.getName());

            LoginResponse resp = new LoginResponse(
                    token,
                    role,
                    user.getName(),
                    user.getEmail(),
                    user.getId(),
                    user.getPhone()
            );
            return ResponseEntity.ok(resp);

        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(errorBody("Invalid email or password"));
        }
    }

    // ── ALL USERS (ADMIN) ────────────────────────────────────────────────────
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        // Clear passwords before returning
        users.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(users);
    }

    // ── DELETE USER (ADMIN) ──────────────────────────────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        Map<String, String> resp = new HashMap<>();
        resp.put("message", "User deleted successfully");
        return ResponseEntity.ok(resp);
    }

    // ── CURRENT USER PROFILE ─────────────────────────────────────────────────
    @GetMapping("/me")
    public ResponseEntity<?> getMe(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorBody("No token provided"));
            }
            // The email is already in the Spring Security principal; resolve from token
            String token = authHeader.substring(7);
            String email = jwtUtil.extractEmail(token);
            User user = userService.findByEmail(email);
            user.setPassword(null); // never expose password
            return ResponseEntity.ok(user);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorBody("Invalid or expired token"));
        }
    }

    // Helper
    private Map<String, String> errorBody(String message) {
        Map<String, String> map = new HashMap<>();
        map.put("error", message != null ? message : "An error occurred");
        return map;
    }
}
