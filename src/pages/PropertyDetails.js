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
              <div className="placeholder-image">
                <span>Property Image</span>
              </div>
            </div>
          </div>

          <div className="property-info">
            <div className="price">₹{property.listed_price?.toLocaleString()}</div>
            <div className="address">{property.location}</div>
            
            <div className="property-features">
              <div className="feature">
                <span className="feature-label">BHK:</span>
                <span className="feature-value">{property.bhk}</span>
              </div>
              <div className="feature">
                <span className="feature-label">Floor:</span>
                <span className="feature-value">{property.floor}</span>
              </div>
              <div className="feature">
                <span className="feature-label">Square Feet:</span>
                <span className="feature-value">{property.size_sqft?.toLocaleString()}</span>
              </div>
              <div className="feature">
                <span className="feature-label">Facing:</span>
                <span className="feature-value">{property.facing}</span>
              </div>
              <div className="feature">
                <span className="feature-label">Year Built:</span>
                <span className="feature-value">{property.year_built}</span>
              </div>
            </div>

            <div className="property-description">
              <h3>Amenities</h3>
              <div className="amenities-list">
                {property.amenities?.map((amenity, index) => (
                  <span key={index} className="amenity-tag">{amenity}</span>
                ))}
              </div>
              
              <h3>Reviews</h3>
              <div className="reviews-list">
                {property.reviews?.map((review, index) => (
                  <div key={index} className="review">
                    <div className="review-rating">{'★'.repeat(review.rating)}</div>
                    <p className="review-text">{review.text}</p>
                    <span className="review-user">- {review.user}</span>
                  </div>
                ))}
              </div>
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