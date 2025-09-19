import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/Login.css';

const LoginOwner = () => (
  <div className="login-page">
    <div className="container">
      <h1>Owner Login</h1>
      <LoginForm userType="owner" />
    </div>
  </div>
);

export default LoginOwner;