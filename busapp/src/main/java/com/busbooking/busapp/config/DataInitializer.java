package com.busbooking.busapp.config;

import com.busbooking.busapp.model.User;
import com.busbooking.busapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) {
        String defaultAdminEmail = "admin@bus.com";
        if (userRepository.findByEmail(defaultAdminEmail) == null) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail(defaultAdminEmail);
            admin.setPassword("admin123"); // In real use, encode passwords!
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("✅ Default admin created.");
        }
    }
}
