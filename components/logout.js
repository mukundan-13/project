import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send request to the server to logout and update the database
      await axios.get('/api/logout', { withCredentials: true });
      
      // Clear user data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      
      // Trigger a custom storage event to notify other components of the change
      window.dispatchEvent(new Event('storage'));
      
      // Redirect to the login page after logging out
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
      Logout
    </button>
  );
};

export default LogoutButton;