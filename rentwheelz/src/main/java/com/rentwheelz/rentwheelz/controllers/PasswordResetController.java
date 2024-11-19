package com.rentwheelz.rentwheelz.controllers;

import com.rentwheelz.rentwheelz.dto.PasswordResetRequest;
import com.rentwheelz.rentwheelz.dto.PasswordResetToken;
import com.rentwheelz.rentwheelz.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody PasswordResetRequest request) {
        passwordResetService.sendResetLink(request);
        return ResponseEntity.ok("Password reset link sent!");
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetToken tokenRequest) {
    	System.out.println("Reset token: ");
        System.out.println("New password: " + tokenRequest.getNewPassword());
        passwordResetService.resetPassword(tokenRequest);
        return ResponseEntity.ok("Password has been reset successfully!");
    }
}