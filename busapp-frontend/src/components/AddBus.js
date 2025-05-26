import React, { useState } from 'react';
import axios from 'axios';

const AddBus = () => {
  const [bus, setBus] = useState({
    name: '',
    fromLocation: '',
    toLocation: '',
    departureTime: '',
    arrivalTime: '',
    price: ''
  });

  const handleChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/buses', bus, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Bus added successfully!');
      setBus({ name: '', fromLocation: '', toLocation: '', departureTime: '', arrivalTime: '', price: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add bus.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: '#bfa300', fontFamily: 'Georgia, serif', fontWeight: 'bold' }}>Add New Bus</h2>
      <form 
        className="mx-auto p-4 border rounded shadow" 
        style={{ 
          maxWidth: "500px", 
          background: '#fff', 
          borderColor: '#bfa300', 
          boxShadow: '0 0 20px rgba(191, 163, 0, 0.3)',
          animation: 'fadeIn 1s ease-in-out'
        }} 
        onSubmit={handleSubmit}
      >
        {['name', 'fromLocation', 'toLocation', 'departureTime', 'arrivalTime', 'price'].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label fw-semibold" style={{ color: '#bfa300' }}>{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              className="form-control"
              name={field}
              value={bus[field]}
              onChange={handleChange}
              required
              style={{
                borderColor: '#bfa300',
                backgroundColor: '#fffdf5',
                color: '#333',
                fontWeight: '500'
              }}
            />
          </div>
        ))}
        <button 
          type="submit" 
          className="btn w-100 fw-bold" 
          style={{ 
            backgroundColor: '#bfa300', 
            color: '#fff', 
            border: 'none', 
            transition: 'transform 0.3s',
            boxShadow: '0 4px 12px rgba(191, 163, 0, 0.5)'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Submit
        </button>
      </form>

      {/* Inline CSS animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default AddBus;
