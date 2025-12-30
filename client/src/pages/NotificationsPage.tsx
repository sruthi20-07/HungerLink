import React from 'react';

const notifications = [
  'Pickup scheduled for Rice & Curry',
  'New NGO nearby requested surplus',
  'Pickup completed for Bread & Soup',
];

const NotificationsPage: React.FC = () => {
  return (
    <div style={{ padding: 32 }}>
      <h2>Notifications</h2>

      {notifications.map((note, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #ccc',
            borderRadius: 6,
            padding: 12,
            marginBottom: 10,
          }}
        >
          {note}
        </div>
      ))}
    </div>
  );
};

export default NotificationsPage;
