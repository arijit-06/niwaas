import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  return (
    <div className="property-details">
      <div className="container">
        <h1>Property Details</h1>
        
        <div className="property-content">
          <div className="property-images">
            <div className="main-image">
              <div className="placeholder-image">
                <span>Property Image</span>
              </div>
            </div>
          </div>

          <div className="property-info">
            <div className="price">₹5,00,000</div>
            <div className="address">123 Main Street, Sample City</div>
            
            <div className="property-features">
              <div className="feature">
                <span className="feature-label">Bedrooms:</span>
                <span className="feature-value">3</span>
              </div>
              <div className="feature">
                <span className="feature-label">Bathrooms:</span>
                <span className="feature-value">2</span>
              </div>
              <div className="feature">
                <span className="feature-label">Square Feet:</span>
                <span className="feature-value">1,850</span>
              </div>
            </div>

            <div className="property-description">
              <h3>Description</h3>
              <p>
                This beautiful property offers modern living in a prime location. 
                Features include spacious rooms, updated kitchen, and a lovely garden. 
                Perfect for families looking for comfort and convenience. 
                Close to schools, shopping centers, and public transportation.
              </p>
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