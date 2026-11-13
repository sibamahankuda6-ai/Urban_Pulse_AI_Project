package com.urbanpulse;

import com.urbanpulse.entity.User;
import com.urbanpulse.security.JwtUtil;
import com.urbanpulse.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class UrbanpulseBackendApplicationTests {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Test
    void contextLoads() {
        Assertions.assertNotNull(passwordEncoder);
        Assertions.assertNotNull(jwtUtil);
        Assertions.assertNotNull(userService);
    }

    @Test
    void testBCryptPasswordEncoding() {
        String raw = "SecurePass123";
        String encoded = passwordEncoder.encode(raw);
        Assertions.assertTrue(passwordEncoder.matches(raw, encoded));
        Assertions.assertFalse(passwordEncoder.matches("WrongPass", encoded));
    }

    @Test
    void testJwtGenerationAndValidation() {
        String email = "testuser@urbanpulse.com";
        String role = "ADMIN";
        String name = "Test Administrator";

        String token = jwtUtil.generateToken(email, role, name);
        Assertions.assertNotNull(token);
        Assertions.assertTrue(jwtUtil.validateToken(token));
        Assertions.assertEquals(email, jwtUtil.extractEmail(token));
        Assertions.assertEquals(role, jwtUtil.extractRole(token));
        Assertions.assertFalse(jwtUtil.isTokenExpired(token));
    }

    @Test
    void testExistingUserLogin() {
        User user = userService.login("admin@gmail.com", "12345");
        Assertions.assertNotNull(user);
        Assertions.assertEquals("ADMIN", user.getRole());
    }

    @Test
    void testRegistrationEnforcesUserRoleAndHashesPassword() {
        String uniqueEmail = "citizen_" + System.currentTimeMillis() + "@test.com";
        User citizen = new User();
        citizen.setName("John Citizen");
        citizen.setEmail(uniqueEmail);
        citizen.setPhone("9876543210");
        citizen.setPassword("Citizen@123");
        // Attempt to supply ADMIN role
        citizen.setRole("ADMIN");

        User registered = userService.registerUser(citizen);
        Assertions.assertNotNull(registered.getId());
        // Must enforce USER role regardless of input
        Assertions.assertEquals("USER", registered.getRole());
        // Password must be hashed with BCrypt ($2a$ or $2b$)
        Assertions.assertTrue(registered.getPassword().startsWith("$2"));
        Assertions.assertTrue(passwordEncoder.matches("Citizen@123", registered.getPassword()));

        // Login with new citizen
        User loggedIn = userService.login(uniqueEmail, "Citizen@123");
        Assertions.assertNotNull(loggedIn);
        Assertions.assertEquals("USER", loggedIn.getRole());
    }
}
