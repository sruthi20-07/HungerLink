import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        width: '360px',
        boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#1976d2' }}>HungerLink</h2>
        <p style={{ textAlign: 'center', marginBottom: 20 }}>Reducing Food Waste, Together</p>

        <input placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />

        <button style={buttonStyle} onClick={() => navigate('/dashboard')}>
          Login
        </button>

        <p style={{ textAlign: 'center', marginTop: 15 }}>
          New user?{' '}
          <span
            style={{ color: '#1976d2', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  marginBottom: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  outline: 'none'
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  background: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 600
};

export default LoginPage;
