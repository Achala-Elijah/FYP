import { Link } from "react-router-dom";
import "./card.scss";

function Card({ item }) {
  // Format price for better display
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `₵${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `₵${(price / 1000).toFixed(0)}K`;
    }
    return `₵${price}`;
  };

  return (
    <div className="property-card">
      <Link to={`/${item.id}`} className="property-card__image-container">
        <img 
          src={item.images?.[0] || "/noavatar.png"} 
          alt={item.title || "Property"}
          loading="lazy"
        />
        <div className="property-card__price-badge">
          {formatPrice(item.price)}
        </div>
        <div className="property-card__overlay">
          <span>View Details</span>
        </div>
      </Link>
      
      <div className="property-card__content">
        <div className="property-card__header">
          <h3 className="property-card__title">
            <Link to={`/${item.id}`}>{item.title}</Link>
          </h3>
          <div className="property-card__actions">
            <button className="property-card__save" aria-label="Save property">
              <img src="/save.png" alt="" />
            </button>
            <button className="property-card__contact" aria-label="Contact about property">
              <img src="/chat.png" alt="" />
            </button>
          </div>
        </div>
        
        <div className="property-card__location">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </div>
        
        <div className="property-card__features">
          {/* {item.bedroom && (
            <div className="property-card__feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} {item.bedroom === 1 ? 'Bedroom' : 'Bedrooms'}</span>
            </div>
          )}
          {item.bathroom && (
            <div className="property-card__feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} {item.bathroom === 1 ? 'Bathroom' : 'Bathrooms'}</span>
            </div>
          )} */}
          {item.size && (
            <div className="property-card__feature">
              <img src="/size.png" alt="" />
              <span>{item.size} sqft</span>
            </div>
          )}
        </div>
        
        <div className="property-card__footer">
          <div className="property-card__type">
            {item.type || 'Property'}
          </div>
          <div className="property-card__status">
            For Sale
            {/* {item.property === 'rent' ? 'For Rent' : 'For Sale'} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
