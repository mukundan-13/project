package com.rentwheelz.rentwheelz.controllers;

import com.rentwheelz.rentwheelz.model.User;
import com.rentwheelz.rentwheelz.security.JwtUtil;
import com.rentwheelz.rentwheelz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/api/auth/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userService.register(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/api/auth/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        Optional<User> existingUser = userService.findByEmail(user.getEmail());
        if (existingUser.isPresent() &&
                passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    // New endpoint to check authentication
    @PostMapping("/check")
    public ResponseEntity<String> checkAuth(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // Remove "Bearer " prefix
            
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.extractEmail(token);
                return ResponseEntity.ok("User is authenticated: " + email);
            } else {
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        return ResponseEntity.status(401).body("Authorization header missing");
    }
}
