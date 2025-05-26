package com.busbooking.busapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.busbooking.busapp.model.*;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}