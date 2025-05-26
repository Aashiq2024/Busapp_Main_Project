package com.busbooking.busapp.controller;

import com.busbooking.busapp.model.Payment;
import com.busbooking.busapp.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Value("${razorpay.key_id}")
    private String razorpayKeyId;

    @Value("${razorpay.key_secret}")
    private String razorpayKeySecret;

    @Autowired
    private PaymentRepository paymentRepository;

    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        int amount = (int) data.get("amount"); // in paisa (e.g., 50000 = ₹500)
        JSONObject options = new JSONObject();
        options.put("amount", amount);
        options.put("currency", "INR");
        options.put("receipt", UUID.randomUUID().toString());
        options.put("payment_capture", 1);

        Order order = client.orders.create(options); // corrected 'Orders' to 'orders'

        Map<String, Object> response = new HashMap<>();
        response.put("id", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/save-payment")
    public ResponseEntity<String> savePayment(@RequestBody Payment payment) {
        paymentRepository.save(payment);
        return ResponseEntity.ok("Payment saved successfully");
    }
}
