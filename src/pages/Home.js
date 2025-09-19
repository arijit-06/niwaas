import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import '../styles/Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const cities = [
    { name: 'Mumbai', properties: 0, id: 1, image: '🏙️' },
    { name: 'Delhi', properties: 0, id: 2, image: '🏛️' },
    { name: 'Bangalore', properties: 0, id: 3, image: '🌆' },
    { name: 'Chennai', properties: 0, id: 4, image: '🏖️' },
    { name: 'Pune', properties: 0, id: 5, image: '🏞️' },
    { name: 'Hyderabad', properties: 0, id: 6, image: '🏰' }
  ];

  const features = [
    { icon: '🏠', title: 'Premium Properties', desc: 'Handpicked luxury homes' },
    { icon: '🔍', title: 'Smart Search', desc: 'Find your perfect match' },
    { icon: '💰', title: 'Best Prices', desc: 'Competitive market rates' },
    { icon: '🤝', title: 'Expert Support', desc: '24/7 customer service' }
  ];

  useEffect(() => {
    const loadProperties = async () => {
      const data = await fetchAllProperties();
      setProperties(data.slice(0, 6));
      
      cities.forEach(city => {
        city.properties = data.filter(p => p.city === city.name).length;
      });
      
      setLoading(false);
    };
    loadProperties();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Discover Your Dream Home</h1>
          <p>Find the perfect property in India's most vibrant cities</p>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search by city, area, or property type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link to={`/search?q=${searchQuery}`} className="search-btn">
              🔍 Search
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Properties</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Cities</span>
            </div>
            <div className="stat">
              <span className="stat-number">5K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>Why Choose Niwaas?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cities-section">
        <div className="container">
          <h2>Explore Top Cities</h2>
          <p className="section-subtitle">Discover properties in India's most sought-after locations</p>
          <div className="cities-grid">
            {cities.map(city => (
              <div key={city.id} className="city-card">
                <div className="city-image">
                  <span className="city-emoji">{city.image}</span>
                  <div className="city-overlay"></div>
                </div>
                <div className="city-info">
                  <h3>{city.name}</h3>
                  <p>{city.properties} Properties Available</p>
                  <Link to="/search" state={{ city: city.name }} className="explore-btn">
                    Explore Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-properties">
        <div className="container">
          <h2>Featured Properties</h2>
          <p className="section-subtitle">Handpicked premium properties just for you</p>
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading amazing properties...</p>
            </div>
          ) : (
            <div className="properties-grid">
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          <div className="view-all">
            <Link to="/search" className="view-all-btn">View All Properties</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Dream Home?</h2>
            <p>Join thousands of satisfied customers who found their perfect property with us</p>
            <div className="cta-buttons">
              <Link to="/search" className="cta-primary">Start Your Search</Link>
              <Link to="/login/owner" className="cta-secondary">List Your Property</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;