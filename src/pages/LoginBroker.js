import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/Login.css';

const LoginBroker = () => (
  <div className="login-page">
    <div className="container">
      <h1>Broker/Agent Login</h1>
      <LoginForm userType="broker" />
    </div>
  </div>
);

export default LoginBroker;