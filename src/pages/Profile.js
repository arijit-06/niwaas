import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [profileData, setProfileData] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
    bio: ''
  });

  useEffect(() => {
    // Fetch additional profile fields from Firestore if stored
  }, [currentUser]);

  const handleChange = e => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Save profileData to Firestore under 'profiles' collection
    console.log('Saving profile:', profileData);
  };

  return (
    <div className="profile-page container">
      <h1>My Profile</h1>
      <div className="profile-form">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input type="email" value={profileData.email} disabled />
        </label>
        <label>
          Phone
          <input
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Bio
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSave}>Save Changes</button>
        <button className="logout-btn" onClick={logout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;