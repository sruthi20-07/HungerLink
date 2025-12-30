import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40, background: '#f5f7fb', minHeight: '100vh' }}>
      <h1 style={{ color: '#1976d2' }}>HungerLink Dashboard</h1>
      <p>Welcome! Manage surplus food and help your community.</p>

      <div style={gridStyle}>
        <Card title="Create Surplus" desc="Add available food" onClick={() => navigate('/surplus/create')} />
        <Card title="View Surplus" desc="See all surplus food" onClick={() => navigate('/surplus')} />
        <Card title="Notifications" desc="Pickup & NGO alerts" onClick={() => navigate('/notifications')} />
        <Card title="My Profile" desc="Your impact & details" onClick={() => navigate('/profile')} />
      </div>
    </div>
  );
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 20,
  marginTop: 30
};

const Card = ({ title, desc, onClick }: any) => (
  <div
    onClick={onClick}
    style={{
      background: 'white',
      padding: 25,
      borderRadius: 12,
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: '0.2s',
    }}
  >
    <h3 style={{ color: '#1976d2' }}>{title}</h3>
    <p>{desc}</p>
  </div>
);

export default DashboardPage;
