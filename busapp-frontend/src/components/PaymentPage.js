import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingId = location.state?.bookingId;
  const userId = location.state?.userId;
  const amount = location.state?.amount || 500; // fallback amount

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!bookingId || !userId) {
      setMessage("Missing payment details. Redirecting...");
      setTimeout(() => navigate('/dashboard/history'), 2000);
    }
  }, [bookingId, userId, navigate]);

  const handleMockPayment = async () => {
    setLoading(true);
    setMessage("Processing payment...");

    try {
      const token = localStorage.getItem('token');

      const paymentPayload = {
        userId,
        bookingId,
        amount,
        paymentMethod: 'MockUPI',
        status: 'Success'
      };

      await axios.post('http://localhost:8080/api/payment/save-payment', paymentPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setMessage("✅ Payment successful! Redirecting to your booking history...");
      setTimeout(() => navigate('/dashboard/history'), 2000);

    } catch (error) {
      console.error(error);
      setMessage("❌ Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="mx-auto p-4 rounded-4 shadow-lg bg-white border border-warning-subtle" style={{ maxWidth: '600px', animation: 'fadeIn 0.8s' }}>
        <h2 className="text-center text-warning mb-4">Payment Gateway</h2>

        {bookingId && (
          <>
            <div className="text-center mb-4">
              <p><strong>Booking ID:</strong> {bookingId}</p>
              <p><strong>Amount to Pay:</strong> ₹{amount}</p>
            </div>

            <button
              onClick={handleMockPayment}
              disabled={loading}
              className="btn w-100 fw-bold text-dark"
              style={{
                background: 'linear-gradient(to right, #bfa300, #ffe066)',
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                boxShadow: '0 5px 15px rgba(191, 163, 0, 0.3)',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </>
        )}

        {message && (
          <div className="mt-4 text-center fw-semibold text-info">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
