import React from 'react';

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-white"
      style={{ flexDirection: 'column', gap: '1.5rem' }}
    >
      <div
        role="status"
        style={{
          width: '6rem',
          height: '6rem',
          borderRadius: '50%',
          position: 'relative',
          boxShadow: '0 0 15px 5px #d4af37aa', // soft golden glow
          background:
            'conic-gradient(from 0deg, #d4af37 0deg 90deg, transparent 90deg 180deg, #d4af37 180deg 270deg, transparent 270deg 360deg)',
          animation: 'spin 4s linear infinite',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'wait',
        }}
      >
        {/* Inner circle to mimic Ben10 watch center */}
        <div
          style={{
            width: '2.5rem',
            height: '2.5rem',
            backgroundColor: '#fff',
            borderRadius: '50%',
            boxShadow: 'inset 0 0 10px #d4af37',
          }}
        ></div>
      </div>

      {/* <h4
        style={{
          color: '#d4af37',
          fontFamily: "'Georgia', serif",
          fontWeight: '700',
          letterSpacing: '1px',
          textShadow: '0 0 5px #d4af37cc',
          userSelect: 'none',
          cursor: 'wait',
        }}
      >
        Loading, Please Wait...
      </h4> */}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
