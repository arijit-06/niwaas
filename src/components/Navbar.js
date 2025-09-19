import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Mobile Menu Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          NIWAAS
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/search" className="nav-link">Search</Link>
          <button 
            className="nav-button owners"
            onClick={() => navigate('/login/owner')}
          >
            For Owners
          </button>
          <button 
            className="nav-button brokers"
            onClick={() => navigate('/login/broker')}
          >
            For Brokers
          </button>
        </div>

        {/* Profile Section */}
        <div className="navbar-actions">
          {currentUser ? (
            <div className="profile-container">
              <button 
                className="profile-button" 
                onClick={toggleProfile}
                onMouseEnter={() => setIsProfileOpen(true)}
              >
                <div className="profile-avatar">
                  {currentUser.photoURL
                    ? <img src={currentUser.photoURL} alt="Profile" />
                    : <span className="fallback-icon">👤</span>
                  }
                </div>
              </button>
              
              {isProfileOpen && (
                <div 
                  className="profile-dropdown"
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <div className="dropdown-header">
                    <span className="user-name">{currentUser.displayName || 'User'}</span>
                    <span className="user-email">{currentUser.email}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                    <span className="dropdown-icon">📊</span>
                    Dashboard
                  </Link>
                  <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                    <span className="dropdown-icon">👤</span>
                    Profile
                  </Link>
                  <Link to="/favorites" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                    <span className="dropdown-icon">❤️</span>
                    Favorites
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <span className="dropdown-icon">🚪</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-button">Login</Link>
          )}
        </div>

      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/search" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
          Search
        </Link>
        <button 
          className="mobile-nav-button owners"
          onClick={() => {
            setIsMenuOpen(false);
            navigate('/login/owner');
          }}
        >
          For Owners
        </button>
        <button 
          className="mobile-nav-button brokers"
          onClick={() => {
            setIsMenuOpen(false);
            navigate('/login/broker');
          }}
        >
          For Brokers
        </button>
        {!currentUser && (
          <Link to="/login" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
