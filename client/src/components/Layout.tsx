import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ padding: 16, background: '#1976d2', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
        <b>HungerLink</b>
        <div>
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/surplus')}>Surplus</button>
          <button onClick={() => navigate('/notifications')}>Notifications</button>
          <button onClick={() => navigate('/profile')}>Profile</button>
        </div>
      </div>

      <div style={{ padding: 24 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
