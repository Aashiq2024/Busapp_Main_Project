import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

const LoadingWrapper = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); // loader shows 800ms on every route change
    return () => clearTimeout(timer);
  }, [location]);

  return loading ? <Loader /> : children;
};

export default LoadingWrapper;
