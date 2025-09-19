import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import '../styles/Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const cities = [
    { name: 'Mumbai', properties: 0, id: 1 },
    { name: 'Delhi', properties: 0, id: 2 },
    { name: 'Bangalore', properties: 0, id: 3 },
    { name: 'Chennai', properties: 0, id: 4 },
    { name: 'Pune', properties: 0, id: 5 },
    { name: 'Hyderabad', properties: 0, id: 6 },
    { name: 'Kolkata', properties: 0, id: 7 },
    { name: 'Ahmedabad', properties: 0, id: 8 }
  ];

  useEffect(() => {
    const loadProperties = async () => {
      const data = await fetchAllProperties();
      setProperties(data.slice(0, 6));
      
      // Update city counts
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
        <div className="hero-content">
          <h1>Find Your Dream Property</h1>
          <p>Discover the perfect home in your favorite city</p>
          <Link to="/search" className="cta-button">Start Searching</Link>
        </div>
      </section>

      <section className="cities-section">
        <div className="container">
          <h2>Explore Properties by City</h2>
          <div className="cities-grid">
            {cities.map(city => (
              <div key={city.id} className="city-card">
                <div className="city-image">
                  <div className="placeholder-image"></div>
                </div>
                <div className="city-info">
                  <h3>{city.name}</h3>
                  <p>{city.properties} Properties</p>
                  <Link to="/search" state={{ city: city.name }} className="explore-btn">Explore</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-properties">
        <div className="container">
          <h2>Featured Properties</h2>
          {loading ? (
            <p>Loading properties...</p>
          ) : (
            <div className="properties-grid">
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;