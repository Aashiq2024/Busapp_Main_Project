package com.busbooking.busapp.controller;

import com.busbooking.busapp.model.Bus;
import com.busbooking.busapp.repository.BusRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private BusRepository busRepo;

    @PostMapping("/add-bus")
    public Object addBus(@RequestBody Bus bus, HttpServletRequest request) {
        String role = (String) request.getAttribute("role");

        if (!"ADMIN".equals(role)) {
            return "Access Denied: Only admin can add buses.";
        }

        return busRepo.save(bus);
    }
}
