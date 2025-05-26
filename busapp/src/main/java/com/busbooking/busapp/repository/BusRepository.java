package com.busbooking.busapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.busbooking.busapp.model.Bus;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {
	List<Bus> findByFromLocationIgnoreCaseAndToLocationIgnoreCase(String fromLocation, String toLocation);
}