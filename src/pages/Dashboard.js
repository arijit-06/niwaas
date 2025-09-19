import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="dashboard">
      <div className="container">
        <h1>Welcome to Your Dashboard</h1>
        <div className="user-info">
          <p>Email: {currentUser?.email}</p>
          <p>User ID: {currentUser?.uid}</p>
        </div>
        <div className="dashboard-content">
          <p>Dashboard functionality will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;