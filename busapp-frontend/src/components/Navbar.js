import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#fff', boxShadow: '0 4px 10px rgba(218, 165, 32, 0.2)', zIndex: 1000 }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold glitter-text" style={{ color: '#d4af37' }}>
            BusBooking App
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fw-semibold nav-glow" to="/dashboard/search">
                  Search Buses
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold nav-glow" to="/dashboard/history">
                  Booking History
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light nav-logout ms-lg-3 mt-2 mt-lg-0" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Internal Glitter & Styling */}
      <style>{`
        .glitter-text {
          animation: glitterStar 3s infinite linear;
        }

        @keyframes glitterStar {
          0%, 100% {
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
          }
          50% {
            text-shadow: 0 0 18px rgba(212, 175, 55, 1);
          }
        }

        .nav-glow {
          color: #333;
          transition: all 0.3s ease-in-out;
        }

        .nav-glow:hover {
          color: #d4af37;
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
        }

        .nav-logout {
          font-weight: 600;
          transition: transform 0.3s ease, background-color 0.3s;
          border: 2px solid #d4af37;
          color: #d4af37;
        }

        .nav-logout:hover {
          transform: scale(1.05);
          background-color: #d4af37;
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default Navbar;
