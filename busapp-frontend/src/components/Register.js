import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showTimer, setShowTimer] = useState(null);

  const handleShowPassword = () => {
    setShowPassword(true);
    if (showTimer) clearTimeout(showTimer);
    const timer = setTimeout(() => {
      setShowPassword(false);
    }, 3000);
    setShowTimer(timer);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage('Registration successful!');
        navigate('/');
      } else {
        const errMsg = await res.text();
        setMessage('Registration failed: ' + errMsg);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: '#fdf6e3', minHeight: '100vh' }}>
      <div
        className="mx-auto p-5 rounded-4 shadow-lg border border-warning-subtle bg-white animate__animated animate__fadeInDown"
        style={{ maxWidth: '400px', fontFamily: 'Georgia, serif' }}
      >
        <h2 className="text-center fw-bold mb-4 text-warning">
          User Registration
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              className="form-control border-warning"
              onChange={handleChange}
              required
              style={{ fontSize: '1.1rem' }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="form-control border-warning"
              onChange={handleChange}
              required
              style={{ fontSize: '1.1rem' }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                className="form-control border-warning"
                onChange={handleChange}
                required
                style={{ fontSize: '1.1rem', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}
              />
              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={handleShowPassword}
                style={{
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                Show
              </button>
            </div>
          </div>


          <button
            type="submit"
            className="btn fw-bold text-dark w-100"
            style={{
              background: 'linear-gradient(to right, #bfa300, #ffe066)',
              borderRadius: '50px',
              padding: '10px',
              boxShadow: '0 5px 15px rgba(191, 163, 0, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(191, 163, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(191, 163, 0, 0.3)';
            }}
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center" style={{ fontSize: '0.95rem' }}>
          Already have an account?{' '}
          <a href="/" className="text-warning fw-semibold" style={{ textDecoration: 'underline' }}>
            Login here
          </a>
        </p>

        {message && (
          <p className={`mt-3 text-center fw-semibold ${message.startsWith('Registration successful') ? 'text-success' : 'text-danger'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
