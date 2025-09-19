import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const LoginForm = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      
      let user;
      if (isSignup) {
        const result = await signup(email, password);
        user = result.user;
        // Store user type in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          userType
        });
      } else {
        const result = await login(email, password);
        user = result.user;
      }
      
      // Navigate based on user type
      if (userType === 'owner') {
        navigate('/owner/dashboard');
      } else if (userType === 'broker') {
        navigate('/broker/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Failed to ' + (isSignup ? 'create account' : 'sign in'));
    }
    
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const result = await signInWithGoogle();
      const user = result.user;
      
      // Store user type in Firestore for Google sign-in
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        userType
      }, { merge: true });
      
      // Navigate based on user type
      if (userType === 'owner') {
        navigate('/owner/dashboard');
      } else if (userType === 'broker') {
        navigate('/broker/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Failed to sign in with Google');
    }
    setLoading(false);
  };

  return (
    <div className="login-form">
      <h3>{isSignup ? 'Sign Up' : 'Login'} as {userType}</h3>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={loading} className="auth-btn">
          {loading ? 'Loading...' : (isSignup ? 'Sign Up' : 'Login')}
        </button>
      </form>
      
      <button onClick={handleGoogleSignIn} disabled={loading} className="google-btn">
        Sign in with Google
      </button>
      
      <p className="toggle-auth">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button 
          type="button" 
          onClick={() => setIsSignup(!isSignup)}
          className="toggle-btn"
        >
          {isSignup ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;