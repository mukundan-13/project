package com.rentwheelz.rentwheelz.security;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {
    private static final String SECRET = "your-secret-key"; // Replace with a secure secret key
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    // Generate JWT Token
    public String generateToken(String email) {
        long now = System.currentTimeMillis();
        long exp = now + EXPIRATION_TIME;

        String header = Base64.getUrlEncoder().encodeToString("{\"alg\":\"HS256\",\"typ\":\"JWT\"}".getBytes());
        String payload = Base64.getUrlEncoder().encodeToString((
            "{\"sub\":\"" + email + "\",\"iat\":" + now + ",\"exp\":" + exp + "}"
        ).getBytes());

        String signature = sign(header + "." + payload, SECRET);
        return header + "." + payload + "." + signature;
    }

    // Validate JWT Token
    public boolean validateToken(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) return false;

            String headerPayload = parts[0] + "." + parts[1];
            String signature = parts[2];

            // Verify the signature
            return signature.equals(sign(headerPayload, SECRET));
        } catch (Exception e) {
            return false; // Invalid token
        }
    }

    // Extract Email from JWT Token
    public String extractEmail(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) return null;

            String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
            String subKey = "\"sub\":\"";
            int startIndex = payload.indexOf(subKey) + subKey.length();
            int endIndex = payload.indexOf("\"", startIndex);

            return payload.substring(startIndex, endIndex);
        } catch (Exception e) {
            return null; // Invalid token
        }
    }

    // Generate HMAC SHA-256 Signature
    private String sign(String data, String secret) {
        try {
            SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(secretKey);
            byte[] signatureBytes = mac.doFinal(data.getBytes());
            return Base64.getUrlEncoder().withoutPadding().encodeToString(signatureBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error signing JWT", e);
        }
    }

    public static void main(String[] args) {
        JwtUtil jwtUtil = new JwtUtil();

        // Example usage
        String email = "test@example.com";
        String token = jwtUtil.generateToken(email);
        System.out.println("Generated Token: " + token);

        boolean isValid = jwtUtil.validateToken(token);
        System.out.println("Is Token Valid: " + isValid);

        String extractedEmail = jwtUtil.extractEmail(token);
        System.out.println("Extracted Email: " + extractedEmail);
    }
}
