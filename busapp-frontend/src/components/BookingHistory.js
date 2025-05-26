import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    if (!userId) return;
    const token = localStorage.getItem('token');
        axios.get(`http://localhost:8080/api/bookings/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching booking history:", err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div className="text-center text-warning fs-4 mt-5">
        <div className="spinner-border text-warning me-2" role="status" />
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="min-vh-100 py-5 px-3" style={{ backgroundColor: "#fdf6e3" }}>
      <div className="container">
        <h1 className="text-center mb-5 fw-bold" style={{ color: "#bfa300", fontFamily: "Georgia, serif" }}>
           Booking History
        </h1>

        {bookings.length === 0 ? (
          <p className="text-center text-secondary fs-5">No bookings yet.</p>
        ) : (
          <div className="row g-4">
            {bookings.map((booking, index) => (
              <div key={index} className="col-md-6">
                <div
                  className="card h-100 border-start border-5"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#bfa300",
                    borderRadius: "20px",
                    transition: "all 0.3s",
                    boxShadow: "0 4px 12px rgba(191, 163, 0, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(191, 163, 0, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(191, 163, 0, 0.3)";
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title text-dark">{booking.bus.name}</h5>
                      <span className="badge bg-warning text-dark">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="mb-1">
                      <strong>Route:</strong>{" "}
                      <span className="text-dark">
                        {booking.bus.fromLocation} ➝ {booking.bus.toLocation}
                      </span>
                    </p>
                    <p className="mb-3">
                      <strong>Seats:</strong>{" "}
                      <span className="text-success fw-bold">{booking.seatCount}</span>
                    </p>

                    <div className="p-3 rounded" style={{ backgroundColor: "#fffbe6", border: "1px solid #f0e68c" }}>
                      <h6 className="text-dark">Passengers:</h6>
                      <ul className="mb-0 ps-3">
                        {booking.passengers.map((p, i) => (
                          <li key={i} className="text-secondary">
                            {p.name} — {p.age} yrs, {p.gender}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-5">
          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-lg fw-bold"
            style={{
              background: "linear-gradient(to right, #bfa300, #ffe066)",
              color: "#000",
              borderRadius: "50px",
              boxShadow: "0 5px 15px rgba(191, 163, 0, 0.3)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(191, 163, 0, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(191, 163, 0, 0.3)";
            }}
          >
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
