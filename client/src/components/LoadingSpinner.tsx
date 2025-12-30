import React from 'react';

const LoadingSpinner: React.FC<{ size?: number; message?: string }> = ({ message }) => {
  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <div>Loading...</div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
