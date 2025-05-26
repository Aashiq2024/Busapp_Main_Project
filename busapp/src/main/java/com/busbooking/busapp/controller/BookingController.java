package com.busbooking.busapp.controller;

import com.busbooking.busapp.dto.BookingDTO;
import com.busbooking.busapp.model.Booking;
import com.busbooking.busapp.model.Bus;
import com.busbooking.busapp.model.Passenger;
import com.busbooking.busapp.model.User;
import com.busbooking.busapp.repository.BookingRepository;
import com.busbooking.busapp.repository.BusRepository;
import com.busbooking.busapp.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    
    @Autowired
    private BusRepository busRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO bookingDto) {
    	System.out.println("BookingDTO received: " + bookingDto);
    	System.out.println("Passenger count: " + bookingDto.getPassengers().size());
        if (bookingDto.getUserId() == null || bookingDto.getBusId() == null) {
            throw new IllegalArgumentException("User ID and Bus ID are required");
        }

        User user = userRepository.findById(bookingDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        Bus bus = busRepository.findById(bookingDto.getBusId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid bus ID"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBus(bus);
        booking.setBookingDate(bookingDto.getBookingDate());
        booking.setSeatCount(bookingDto.getSeatCount());

        List<Passenger> passengerList = bookingDto.getPassengers().stream().map(dto -> {
            Passenger p = new Passenger();
            p.setName(dto.getName());
            p.setAge(dto.getAge());
            p.setGender(dto.getGender());
            p.setBooking(booking);  // important!
            return p;
        }).toList();

        booking.setPassengers(passengerList);

        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return ResponseEntity.ok(bookings);
    }


}
