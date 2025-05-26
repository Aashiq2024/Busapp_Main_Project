package com.busbooking.busapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Long busId;
    private Long userId;
    private LocalDateTime bookingDate;
    private int seatCount;
    private List<PassengerDTO> passengers;
}

