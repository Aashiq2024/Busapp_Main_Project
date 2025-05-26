import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'animate.css';

const BusSearch = () => {
  const [from, setFrom] = useState('Chennai');
  const [to, setTo] = useState('Madurai');
  const [buses, setBuses] = useState([]);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
  const token = localStorage.getItem("token"); // get JWT token from local storage

  try {
    const response = await axios.get(`http://localhost:8080/api/buses/search`, {
      params: { from, to },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setBuses(response.data);
    setSearched(true);
  } catch (error) {
    console.error('Error fetching buses:', error);
  }
};


  const handleBookNow = (bus) => {
    navigate('/dashboard/book', { state: { bus } });
  };

  return (
    <div className="container py-5" style={{ backgroundColor: '#fdf6e3', minHeight: '100vh' }}>
      <div className="mx-auto p-5 rounded-4 shadow-lg border border-warning-subtle bg-white animate__animated animate__fadeInUp" style={{ maxWidth: '900px' }}>
        <h2 className="text-center fw-bold mb-4 text-warning" style={{ fontFamily: 'Georgia, serif' }}>
           Find Your Bus
        </h2>

        <div className="row g-3 mb-4">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control form-control-lg border-warning"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control form-control-lg border-warning"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="col-md-2 d-grid">
            <button
              className="btn fw-bold text-dark"
              style={{
                background: 'linear-gradient(to right, #bfa300, #ffe066)',
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                boxShadow: '0 5px 15px rgba(191, 163, 0, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(191, 163, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(191, 163, 0, 0.3)';
              }}
              onClick={handleSearch}
            >
              🔍
            </button>
          </div>
        </div>

        {searched && buses.length === 0 ? (
          <p className="text-danger text-center animate__animated animate__shakeX fw-semibold">
             No buses found for this route.
          </p>
        ) : (
          buses.length > 0 && (
            <div className="table-responsive animate__animated animate__fadeInUp">
              <table className="table table-hover text-center align-middle border border-warning-subtle">
                <thead className="bg-warning text-dark">
                  <tr>
                    <th>Bus Name</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus, index) => (
                    <tr key={index}>
                      <td className="fw-semibold">{bus.name}</td>
                      <td>{bus.fromLocation}</td>
                      <td>{bus.toLocation}</td>
                      <td>{bus.departureTime}</td>
                      <td>{bus.arrivalTime}</td>
                      <td>₹{bus.price}</td>
                      <td>
                        <button
                          onClick={() => handleBookNow(bus)}
                          className="btn btn-sm fw-bold text-dark"
                          style={{
                            background: 'linear-gradient(to right, #bfa300, #ffe066)',
                            borderRadius: '30px',
                            padding: '6px 16px',
                            transition: '0.3s',
                            boxShadow: '0 4px 12px rgba(191, 163, 0, 0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(191, 163, 0, 0.5)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(191, 163, 0, 0.3)';
                          }}
                        >
                          Book Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BusSearch;
