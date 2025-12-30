import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div>
      <h2>My Profile</h2>

      <div style={{ border: '1px solid #ccc', padding: 16 }}>
        <p><b>Name:</b> Demo Organization</p>
        <p><b>Role:</b> Food Provider</p>
        <p><b>Location:</b> Hyderabad</p>
        <p><b>Impact:</b> 120 meals saved</p>
      </div>
    </div>
  );
};

export default ProfilePage;
