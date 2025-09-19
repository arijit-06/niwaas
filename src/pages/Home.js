import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const cities = [
    { name: 'Mumbai', properties: 1250, id: 1 },
    { name: 'Delhi', properties: 980, id: 2 },
    { name: 'Bangalore', properties: 750, id: 3 },
    { name: 'Chennai', properties: 620, id: 4 },
    { name: 'Pune', properties: 540, id: 5 },
    { name: 'Hyderabad', properties: 480, id: 6 },
    { name: 'Kolkata', properties: 420, id: 7 },
    { name: 'Ahmedabad', properties: 350, id: 8 }
  ];

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
                  <Link to="/search" className="explore-btn">Explore</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;