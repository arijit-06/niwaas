import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();

  const dashboardStats = [
    { title: 'Total Properties', value: '12', icon: '🏠', color: 'blue' },
    { title: 'Favorites', value: '8', icon: '❤️', color: 'red' },
    { title: 'Saved Searches', value: '5', icon: '🔍', color: 'green' },
    { title: 'Profile Views', value: '143', icon: '👁️', color: 'purple' }
  ];

  const recentActivity = [
    { action: 'Viewed property at Marine Drive', time: '2 hours ago' },
    { action: 'Saved search for 3BHK apartments', time: '1 day ago' },
    { action: 'Added property to favorites', time: '2 days ago' },
    { action: 'Updated profile information', time: '3 days ago' }
  ];

  const quickActions = [
    { title: 'Search Properties', icon: '🔍', link: '/search' },
    { title: 'My Favorites', icon: '❤️', link: '/favorites' },
    { title: 'Edit Profile', icon: '✏️', link: '/profile' },
    { title: 'Contact Support', icon: '💬', link: '/contact' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Welcome back, {currentUser?.displayName || 'User'}!</h1>
            <p>Here's what's happening with your property search</p>
          </div>
          <div className="header-date">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {dashboardStats.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Quick Actions */}
          <div className="dashboard-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              {quickActions.map((action, index) => (
                <a key={index} href={action.link} className="quick-action-item">
                  <span className="action-icon">{action.icon}</span>
                  <span className="action-title">{action.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-content">
                    <p>{activity.action}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Overview */}
          <div className="dashboard-card">
            <h2>Property Overview</h2>
            <div className="property-overview">
              <div className="overview-item">
                <span className="overview-label">Active Searches</span>
                <span className="overview-value">3</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Price Alerts</span>
                <span className="overview-value">5</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Scheduled Visits</span>
                <span className="overview-value">2</span>
              </div>
            </div>
          </div>

          {/* Market Insights */}
          <div className="dashboard-card">
            <h2>Market Insights</h2>
            <div className="market-insights">
              <div className="insight-item">
                <h4>Mumbai Property Trends</h4>
                <p>Average price increased by 5.2% this month</p>
                <span className="insight-trend positive">📈 +5.2%</span>
              </div>
              <div className="insight-item">
                <h4>Your Area Analysis</h4>
                <p>New listings in your preferred areas</p>
                <span className="insight-count">12 new properties</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
