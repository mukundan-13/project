package com.rentwheelz.rentwheelz.repository;

import com.rentwheelz.rentwheelz.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findByResetToken(String resetToken);
}
