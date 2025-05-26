package com.busbooking.busapp.controller;


import com.busbooking.busapp.model.Bus;
import com.busbooking.busapp.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buses")
public class BusController {

    @Autowired
    private BusRepository busRepo;

    @GetMapping
    public List<Bus> getAllBuses() {
        return busRepo.findAll();
    }

    @PostMapping
    public Bus addBus(@RequestBody Bus bus) {
        return busRepo.save(bus);
    }
    @GetMapping("/search")
    public List<Bus> searchBuses(@RequestParam String from, @RequestParam String to) {
        return busRepo.findByFromLocationIgnoreCaseAndToLocationIgnoreCase(from, to);
    }

    
}

