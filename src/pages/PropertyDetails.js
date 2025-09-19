import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPropertyById } from '../services/propertyService';
import '../styles/PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const loadProperty = async () => {
      const data = await fetchPropertyById(id);
      setProperty(data);
      setLoading(false);
    };
    loadProperty();
  }, [id]);

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    alert('Message sent successfully!');
    setContactForm({ name: '', email: '', message: '' });
  };

  if (loading) {
    return (
      <div className="property-details">
        <div className="container">
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-details">
        <div className="container">
          <p>Property not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="property-details">
      <div className="container">
        <h1>{property.title}</h1>
        
        <div className="property-content">
          <div className="property-images">
            <div className="main-image">
              <img src={property.image || '/placeholder-property.jpg'} alt={property.title} />
            </div>
          </div>

          <div className="property-info">
            <div className="price">₹{property.price?.toLocaleString()}</div>
            <div className="address">{property.address}, {property.city}</div>
            
            <div className="property-features">
              <div className="feature">
                <span className="feature-label">Bedrooms:</span>
                <span className="feature-value">{property.bedrooms}</span>
              </div>
              <div className="feature">
                <span className="feature-label">Bathrooms:</span>
                <span className="feature-value">{property.bathrooms}</span>
              </div>
              <div className="feature">
                <span className="feature-label">Square Feet:</span>
                <span className="feature-value">{property.area?.toLocaleString()}</span>
              </div>
              <div className="feature">
                <span className="feature-label">Type:</span>
                <span className="feature-value">{property.type}</span>
              </div>
            </div>

            <div className="property-description">
              <h3>Description</h3>
              <p>{property.description || 'No description available.'}</p>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <h3>Contact Agent</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name"
                value={contactForm.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                value={contactForm.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="I'm interested in this property..."
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;