import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PropertyCard.css';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.image || '/placeholder-property.jpg'} alt={property.title} />
        <div className="property-price">₹{property.price?.toLocaleString()}</div>
      </div>
      <div className="property-info">
        <h3>{property.title}</h3>
        <p className="property-location">{property.address}, {property.city}</p>
        <div className="property-features">
          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>
          <span>{property.area} sq ft</span>
        </div>
        <Link to={`/property/${property.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;