import React from 'react';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '1px solid #eee',
        paddingBottom: '20px'
      }}>
        <h1>Welcome to SynergySphere, {user.name}!</h1>
        <button 
          onClick={onLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Dashboard Coming Soon!</h2>
        <p>Your authentication system is working perfectly.</p>
        <p>User ID: {user.id}</p>
        <p>Email: {user.email}</p>
        
        <div style={{ marginTop: '30px' }}>
          <h3>Next Features to Add:</h3>
          <ul style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
            <li>Create Projects</li>
            <li>Add Tasks</li>
            <li>Team Management</li>
            <li>Real-time Updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;