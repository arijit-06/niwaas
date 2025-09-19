import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSlider } from '../components/HeroSlider';
import { cities } from '../data/cities';
import { fetchAllProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import '../styles/Home.css';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProperties = async () => {
      const data = await fetchAllProperties();
      setProperties(data);
      setLoading(false);
    };
    loadProperties();
  }, []);

  const getTopPropertiesForCity = (cityName) => {
    return properties.filter(property => 
      property.city?.toLowerCase() === cityName.toLowerCase()
    ).slice(0, 4);
  };

  const handleCityClick = (cityName) => {
    navigate(`/search?city=${cityName}`);
  };

  return (
    <main>
      <HeroSlider
        slides={cities}
        activeIndex={activeIndex}
        onSlideChange={setActiveIndex}
      />
      <section className="explore-section">
        <h3>Explore Your City</h3>
        <ul className="city-list">
          {cities.map((city, idx) => (
            <li
              key={city.id}
              className={idx === activeIndex ? 'active' : ''}
              onClick={() => setActiveIndex(idx)}
            >
              {city.name}
            </li>
          ))}
        </ul>
        
        <div className="city-properties">
          <div className="city-header">
            <h4>Top Properties in {cities[activeIndex].name}</h4>
            <button 
              className="view-all-btn"
              onClick={() => handleCityClick(cities[activeIndex].name)}
            >
              View All Properties
            </button>
          </div>
          {loading ? (
            <div className="loading">Loading properties...</div>
          ) : (
            <div className="properties-grid">
              {getTopPropertiesForCity(cities[activeIndex].name).map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          {!loading && getTopPropertiesForCity(cities[activeIndex].name).length === 0 && (
            <div className="no-properties">No properties available in {cities[activeIndex].name}</div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Niwaas?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Verified Properties</h3>
              <p>All properties are verified and authenticated by our expert team</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Get the best deals and competitive prices in the market</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Expert Support</h3>
              <p>24/7 customer support from our real estate experts</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy Process</h3>
              <p>Simple and hassle-free property buying and selling process</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Dream Home?</h2>
            <p>Join thousands of satisfied customers who found their perfect property with Niwaas</p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Browse Properties</button>
              <button className="btn btn-secondary">List Your Property</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;