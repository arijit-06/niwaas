import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import '../styles/Search.css';

const Search = () => {
  const { state } = useLocation();
  const [filters, setFilters] = useState({
    location: '',
    propertyTypes: [],
    bedrooms: '',
    bathrooms: ''
  });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state?.city) {
      setFilters(prev => ({ ...prev, location: state.city }));
    }
  }, [state]);

  const handleSearch = async () => {
    setLoading(true);
    const results = await searchProperties(filters);
    setProperties(results);
    setLoading(false);
  };

  const handlePropertyTypeChange = (bhk) => {
    setFilters(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(bhk)
        ? prev.propertyTypes.filter(t => t !== bhk)
        : [...prev.propertyTypes, bhk]
    }));
  };

  useEffect(() => {
    if (state?.city) {
      handleSearch();
    }
  }, [filters.location]);

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
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>

          <div className="filter-group">
            <label>BHK Type</label>
            <div className="checkbox-group">
              {['1', '2', '3', '4'].map(bhk => (
                <label key={bhk} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={filters.propertyTypes.includes(bhk)}
                    onChange={() => handlePropertyTypeChange(bhk)}
                  />
                  {bhk} BHK
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

          <button className="search-btn" onClick={handleSearch}>Search Properties</button>
        </div>

        <div className="search-results">
          <h2>Search Results</h2>
          {loading ? (
            <p>Searching properties...</p>
          ) : properties.length > 0 ? (
            <div className="results-grid">
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p>No properties found. Try adjusting your search criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;