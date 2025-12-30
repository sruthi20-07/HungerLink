import React from 'react';
import { useParams } from 'react-router-dom';

const SurplusDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: 32 }}>
      <h2>Surplus Details</h2>
      <p>View and manage surplus report #{id}</p>

      <div style={{ marginTop: 16 }}>
        <p>Surplus detail view will be implemented here.</p>
      </div>
    </div>
  );
};

export default SurplusDetailPage;
