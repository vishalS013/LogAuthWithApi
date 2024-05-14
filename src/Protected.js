import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './components/AuthContext';
import { axiosInstance } from './axiosInstance';

const Protected = () => {
  const { isLoggedIn, login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosInstance.get('/auth/me');
        login()
        setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.response.data.message)
        setLoading(false);
      }
    };


    fetchData();

  }, [login]);

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error}</div>

  }
  return (
    <div>

      {isLoggedIn ? (

        <Outlet />

      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Protected;
