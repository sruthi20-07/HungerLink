import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSurplusPage: React.FC = () => {
  const [food, setFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const existing = JSON.parse(localStorage.getItem('surplus') || '[]');
    const newItem = { id: Date.now(), food, quantity };
    localStorage.setItem('surplus', JSON.stringify([...existing, newItem]));
    navigate('/surplus');
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Create Surplus Food</h2>

      <input
        placeholder="Food Name"
        value={food}
        onChange={(e) => setFood(e.target.value)}
        style={{ display: 'block', marginBottom: 12 }}
      />

      <input
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{ display: 'block', marginBottom: 12 }}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateSurplusPage;
