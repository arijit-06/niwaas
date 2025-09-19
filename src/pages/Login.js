import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/Login.css';

const Login = () => {
  const [selectedUserType, setSelectedUserType] = useState(null);
  
  const loginModules = [
    {
      id: 1,
      title: 'Property Owner',
      description: 'List and manage your properties',
      icon: '🏠',
      type: 'Property Owner'
    },
    {
      id: 2,
      title: 'User/Buyer',
      description: 'Find and save your favorite properties',
      icon: '👤',
      type: 'User/Buyer'
    },
    {
      id: 3,
      title: 'Broker/Agent',
      description: 'Connect buyers with sellers',
      icon: '💼',
      type: 'Broker/Agent'
    }
  ];

  if (selectedUserType) {
    return (
      <div className="login">
        <div className="container">
          <button 
            onClick={() => setSelectedUserType(null)} 
            className="back-btn"
          >
            ← Back to User Types
          </button>
          <LoginForm userType={selectedUserType} />
        </div>
      </div>
    );
  }

  return (
    <div className="login">
      <div className="container">
        <h1>Login to Your Account</h1>
        <div className="login-modules">
          {loginModules.map(module => (
            <div key={module.id} className="login-card">
              <div className="login-icon">
                <span>{module.icon}</span>
              </div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <button 
                className="login-btn"
                onClick={() => setSelectedUserType(module.type)}
              >
                Continue
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;