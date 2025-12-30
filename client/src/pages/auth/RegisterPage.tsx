import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #43cea2, #185a9d)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        width: '380px',
        boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#1976d2' }}>Create Account</h2>
        <p style={{ textAlign: 'center', marginBottom: 20 }}>Join HungerLink Community</p>

        <input placeholder="Organization Name" style={inputStyle} />
        <input placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />

        <button style={buttonStyle} onClick={() => navigate('/login')}>
          Register
        </button>

        <p style={{ textAlign: 'center', marginTop: 15 }}>
          Already have an account?{' '}
          <span
            style={{ color: '#1976d2', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => navigate('/login')}
          >
            Login
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

export default RegisterPage;
