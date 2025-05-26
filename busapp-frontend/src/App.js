import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import Register from './components/Register';
import Login from './components/Login';
import BusSearch from './components/BusSearch';
import BookingForm from './components/BookingForm';
import BookingHistory from './components/BookingHistory';
import ProtectedRoute from './components/ProtectedRoute'; 
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import LoadingWrapper from './components/LoadingWrapper';
import AddBus from './components/AddBus';
import PaymentPage from './components/PaymentPage';

function AppContent() {
  const location = useLocation();

  // Hide Navbar on login and register routes
  const hideNavbar = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Suspense fallback={<Loader />}>
        <LoadingWrapper>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/search"
              element={
                <ProtectedRoute>
                  <BusSearch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/history"
              element={
                <ProtectedRoute>
                  <BookingHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/book"
              element={
                <ProtectedRoute>
                  <BookingForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-bus"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AddBus />
                </ProtectedRoute>
              }
            />
            <Route path="/dashboard/payment"
             element={
             <ProtectedRoute>
              <PaymentPage />
              </ProtectedRoute>
            } 
            />

          </Routes>
        </LoadingWrapper>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
