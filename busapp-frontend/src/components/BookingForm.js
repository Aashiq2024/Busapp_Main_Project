import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedBus = location.state?.bus;

  const storedUser = localStorage.getItem('user');
  const parsedUser = useMemo(() => {
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Invalid user JSON:", error);
      return null;
    }
  }, [storedUser]);

  useEffect(() => {
    if (!parsedUser) {
      navigate('/');
    }
  }, [parsedUser, navigate]);

  useEffect(() => {
    if (!selectedBus) {
      navigate('/dashboard/search');
    }
  }, [selectedBus, navigate]);

  // Function to get current date-time string formatted for datetime-local input's min attribute
  const getMinDateTime = () => {
    const now = new Date();

    // Format YYYY-MM-DDTHH:mm
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [bookingDate, setBookingDate] = useState(getMinDateTime());
  const [seatCount, setSeatCount] = useState(1);
  const [passengers, setPassengers] = useState([{ name: '', age: '', gender: '' }]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = field === 'name' ? value.trimStart() : value;
    setPassengers(updatedPassengers);
  };

  const handleSeatCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setSeatCount(count);
    setPassengers(Array.from({ length: count }, (_, i) => passengers[i] || { name: '', age: '', gender: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (seatCount > (selectedBus?.availableSeats || 10)) {
      return setMessage(`Error: Only ${selectedBus?.availableSeats || 10} seats available.`);
    }

    for (let p of passengers) {
      if (!p.name.trim()) {
        return setMessage("Error: Passenger name cannot be empty or just spaces.");
      }
    }

    // Check if bookingDate is in the past (just in case)
    if (new Date(bookingDate) < new Date(getMinDateTime())) {
      return setMessage("Error: Booking date/time cannot be in the past.");
    }

    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');

      const payload = {
        userId: parsedUser.id,
        busId: selectedBus?.id,
        bookingDate,
        seatCount,
        passengers: passengers.map(p => ({
          ...p,
          name: p.name.trim()
        }))
      };
          const response = await axios.post('http://localhost:8080/api/bookings/create', payload, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

      setMessage('Booking successful! Redirecting...');
      setTimeout(() => {
        navigate('/dashboard/payment', {
            state: {
              bookingId: response.data.id,  // adjust if API returns differently
              userId: parsedUser.id,
              amount: response.data.totalAmount || selectedBus.price * seatCount, // use backend or fallback
              seats: seatCount
            }
          });
      }, 1500);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: '#fdf6e3', minHeight: '100vh' }}>
      <div className="mx-auto p-5 rounded-4 shadow-lg border border-warning-subtle bg-white" style={{ maxWidth: '700px', animation: 'fadeInUp 0.8s' }}>
        <h2 className="text-center fw-bold mb-4 text-warning" style={{ fontFamily: 'Georgia, serif' }}>
          Book Your Bus Seats
        </h2>

        {selectedBus && (
          <div className="text-center text-muted mb-4 fs-5">
            <strong className="text-dark">Bus:</strong> {selectedBus.name} — {selectedBus.route}
          </div>
        )}

        {loading ? (
          <p className="text-center text-info fw-semibold mb-3">⏳ Booking your seats...</p>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Booking Date:</label>
            <input
              type="datetime-local"
              className="form-control border-warning"
              value={bookingDate}
              min={getMinDateTime()}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Number of Seats:</label>
            <input
              type="number"
              min="1"
              max={selectedBus?.availableSeats || 10}
              className="form-control border-warning"
              value={seatCount}
              onChange={handleSeatCountChange}
              required
            />
          </div>

          {passengers.map((passenger, index) => (
            <div key={index} className="border rounded-3 p-3 mb-4 bg-light shadow-sm" style={{ animation: `fadeIn 0.5s ${index * 0.2}s both` }}>
              <h5 className="text-warning mb-3">👤 Passenger {index + 1}</h5>

              <label className="form-label">Name:</label>
              <input
                type="text"
                className="form-control mb-2 border-warning"
                value={passenger.name}
                onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                placeholder="Full Name"
                required
              />

              <label className="form-label">Age:</label>
              <input
                type="number"
                className="form-control mb-2 border-warning"
                value={passenger.age}
                onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                placeholder="Age"
                required
              />

              <label className="form-label">Gender:</label>
              <select
                className="form-select border-warning"
                value={passenger.gender}
                onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
          ))}

          <button
            type="submit"
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
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(191, 163, 0, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(191, 163, 0, 0.3)';
            }}
          >
           Confirm Booking
          </button>
        </form>

        {message && (
          <div className={`mt-4 text-center fw-semibold ${message.startsWith('Error') ? 'text-danger' : 'text-success'}`}>
            {message}
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
      `}</style>
    </div>
  );
};

export default BookingForm;
