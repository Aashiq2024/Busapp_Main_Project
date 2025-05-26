import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BusSearch from './BusSearch';
import BookingHistory from './BookingHistory';
import BookingForm from './BookingForm';

const offersList = [
  '10% off on first booking!',
  'Get ₹100 cashback on round trip bookings.',
  'Refer a friend and earn ₹50!',
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [offerIndex, setOfferIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOfferIndex(prev => (prev + 1) % offersList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#fdf6e3', minHeight: '100vh', fontFamily: "'Georgia', serif" }}>
      <div className="container mt-4">
        {/* Dashboard Home View */}
        <div className="jumbotron text-center p-5 rounded" style={{
          backgroundColor: '#fff',
          boxShadow: '0 4px 15px rgba(191,163,0,0.3)',
          animation: 'fadeInDown 1s',
          borderRadius: '20px',
        }}>
          <h1 className="fw-bold" style={{ color: '#bfa300' }}>Welcome to SmartBus Booking</h1>
          <p style={{ fontSize: '1.2rem' }}>Find, Book, and Travel with Ease!</p>
          <button className="btn fw-bold text-dark mt-3"
            onClick={() => navigate('search')}
            style={{
              background: 'linear-gradient(to right, #bfa300, #ffe066)',
              borderRadius: '50px',
              padding: '10px 30px',
              boxShadow: '0 5px 15px rgba(191,163,0,0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(191,163,0,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(191,163,0,0.3)';
            }}
          >
            Search Buses
          </button>
        </div>

        {/* Offers Section */}
        <div className="my-5 p-4 rounded" style={{
          backgroundColor: '#fff8dc',
          border: '2px solid #bfa300',
          maxWidth: '600px',
          margin: '3rem auto',
          boxShadow: '0 5px 20px rgba(191,163,0,0.25)',
          fontSize: '1.3rem',
          fontWeight: '600',
          color: '#bfa300',
          textAlign: 'center',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '15px',
          userSelect: 'none',
          animation: 'fadeIn 1s',
        }}>
          {offersList[offerIndex]}
        </div>

        {/* Bus Operators */}
        <div className="my-5">
          <h3 className="fw-bold text-warning mb-4">Bus Operators</h3>
          <div className="row">
            {["KPN Travels", "Ashif Express", "GreenLine", "SRS Travels"].map((operator, i) => (
              <div key={i} className="col-md-3 mb-3">
                <div className="card shadow-sm" style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  borderRadius: '15px',
                  overflow: 'hidden',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img src={`/static/img/bus-back-image.jpg`} className="card-img-top" alt={operator}
                    style={{ height: '180px', objectFit: 'cover' }} />
                  <div className="card-body text-center">
                    <h5 className="card-title text-warning fw-bold">{operator}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bus Carousel */}
        <div className="my-5">
          <h3 className="fw-bold text-warning mb-4">Our Buses</h3>
          <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" style={{
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 5px 20px rgba(191,163,0,0.3)'
          }}>
            <div className="carousel-inner">
              {["bus1", "bus2", "bus3"].map((bus, i) => (
                <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                  <img src={`/static/img/${bus}.jpg`} className="d-block w-100" alt={`Bus ${i + 1}`} style={{
                    objectFit: 'cover',
                    maxHeight: '400px'
                  }} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" style={{ filter: 'invert(1)' }}>
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next" style={{ filter: 'invert(1)' }}>
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>

        {/* Nested Routes */}
        <Routes>
          <Route path="search" element={<BusSearch />} />
          <Route path="history" element={<BookingHistory />} />
          <Route path="book" element={<BookingForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserDashboard;
