import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PropertyCard.css';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <div className="property-image">
        <div className="placeholder-image">Property Image</div>
        <div className="property-price">₹{property.listed_price?.toLocaleString()}</div>
      </div>
      <div className="property-info">
        <h3>{property.title}</h3>
        <p className="property-location">{property.location}</p>
        <div className="property-features">
          <span>{property.bhk} BHK</span>
          <span>{property.size_sqft} sq ft</span>
          <span>Floor {property.floor}</span>
        </div>
        <Link to={`/property/${property.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;