package com.busbooking.busapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String fromLocation;

    private String toLocation;

    private String departureTime;

    private String arrivalTime;

    private double price;
}
