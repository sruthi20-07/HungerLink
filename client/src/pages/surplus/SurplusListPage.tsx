import React, { useEffect, useState } from 'react';

const SurplusListPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('surplus') || '[]');
    setItems(data);
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h2>Available Surplus Food</h2>

      {items.length === 0 && <p>No surplus food available</p>}

      {items.map(item => (
        <div
          key={item.id}
          style={{
            padding: 16,
            marginTop: 12,
            border: '1px solid #ccc',
            borderRadius: 6
          }}
        >
          <p><b>Food:</b> {item.food}</p>
          <p><b>Quantity:</b> {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default SurplusListPage;
