package com.busbooking.busapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.busbooking.busapp.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
