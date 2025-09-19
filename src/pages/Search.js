import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Search.css';

const Search = () => {
  const { state } = useLocation();
  const [filters, setFilters] = useState({
    location: '',
    priceRange: 500000,
    propertyTypes: [],
    bedrooms: '',
    bathrooms: ''
  });

  useEffect(() => {
    if (state?.city) {
      setFilters(prev => ({ ...prev, location: state.city }));
    }
  }, [state]);

  const handlePropertyTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  return (
    <div className="search">
      <div className="container">
        <h1>Search Properties</h1>
        
        <div className="search-filters">
          <div className="filter-group">
            <label>Location</label>
            <select 
              value={filters.location} 
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            >
              <option value="">Select City</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="chennai">Chennai</option>
              <option value="pune">Pune</option>
              <option value="hyderabad">Hyderabad</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range (₹)
              <input
                type="number"
                value={filters.priceRange}
                onChange={e => setFilters({...filters, priceRange: parseInt(e.target.value)})}
                placeholder="e.g., 500000"
              />
            </label>
          </div>

          <div className="filter-group">
            <label>Property Type</label>
            <div className="checkbox-group">
              {['House', 'Apartment', 'Condo'].map(type => (
                <label key={type} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={filters.propertyTypes.includes(type)}
                    onChange={() => handlePropertyTypeChange(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label>Bedrooms</label>
              <select 
                value={filters.bedrooms} 
                onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Bathrooms</label>
              <select 
                value={filters.bathrooms} 
                onChange={(e) => setFilters({...filters, bathrooms: e.target.value})}
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>

          <button className="search-btn">Search Properties</button>
        </div>

        <div className="search-results">
          <h2>Search Results</h2>
          <p>Search results will appear here</p>
          <div className="results-grid">
            {/* Property cards will be displayed here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;