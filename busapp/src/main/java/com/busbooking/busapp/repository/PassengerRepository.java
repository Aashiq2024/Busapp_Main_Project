package com.busbooking.busapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.busbooking.busapp.model.Passenger;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {}
