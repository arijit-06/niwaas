import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import '../styles/Upload.css';

const BrokerDashboard = () => {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    title: '',
    location: '',
    listed_price: '',
    city: '',
    bhk: '',
    size_sqft: '',
    floor: '',
    facing: '',
    year_built: '',
    amenities: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const amenitiesArray = form.amenities.split(',').map(a => a.trim());
      await addDoc(collection(db, 'propertySubmissions'), {
        ...form,
        listed_price: parseInt(form.listed_price),
        bhk: parseInt(form.bhk),
        size_sqft: parseInt(form.size_sqft),
        floor: parseInt(form.floor),
        year_built: parseInt(form.year_built),
        amenities: amenitiesArray,
        userType: 'broker',
        userId: currentUser.uid,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setStatus('Submission received. Pending verification.');
      setForm({
        title: '',
        location: '',
        listed_price: '',
        city: '',
        bhk: '',
        size_sqft: '',
        floor: '',
        facing: '',
        year_built: '',
        amenities: ''
      });
    } catch (err) {
      setStatus('Error submitting. Please try again.');
    }
  };

  return (
    <div className="upload-page container">
      <h1>Broker Property Submission</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Location
          <input name="location" value={form.location} onChange={handleChange} required />
        </label>
        <label>
          Price
          <input name="listed_price" type="number" value={form.listed_price} onChange={handleChange} required />
        </label>
        <label>
          City
          <input name="city" value={form.city} onChange={handleChange} required />
        </label>
        <label>
          BHK
          <input name="bhk" type="number" value={form.bhk} onChange={handleChange} required />
        </label>
        <label>
          Size (sq ft)
          <input name="size_sqft" type="number" value={form.size_sqft} onChange={handleChange} required />
        </label>
        <label>
          Floor
          <input name="floor" type="number" value={form.floor} onChange={handleChange} required />
        </label>
        <label>
          Facing
          <input name="facing" value={form.facing} onChange={handleChange} required />
        </label>
        <label>
          Year Built
          <input name="year_built" type="number" value={form.year_built} onChange={handleChange} required />
        </label>
        <label>
          Amenities (comma separated)
          <textarea name="amenities" value={form.amenities} onChange={handleChange} required />
        </label>
        <button type="submit">Submit for Verification</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default BrokerDashboard;