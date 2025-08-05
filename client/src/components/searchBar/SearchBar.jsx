import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="search-bar">
      <div className="search-bar__container">
        <div className="search-bar__header">
          <h2 className="search-bar__title">Find Your Dream Land</h2>
          <p className="search-bar__subtitle">
            Discover the perfect land for investment opportunity
          </p>
        </div>

        <div className="search-bar__type-selector">
          {/* {types.map((type) => (
            <button
              key={type}
              onClick={() => switchType(type)}
              className={`search-bar__type-btn ${query.type === type ? "active" : ""}`}
            >
              <img 
                src={`/${type === 'buy' ? 'sale' : 'rent'}.png`} 
                alt="" 
                className="search-bar__type-icon"
              />
              {type === 'buy' ? 'Buy' : 'Rent'}
            </button>
          ))} */}
        </div>

        <form className="search-bar__form">
          <div className="search-bar__input-group">
            <div className="search-bar__input-wrapper">
              <img src="/pin.png" alt="" className="search-bar__input-icon" />
              <input 
                type="text" 
                name="city" 
                placeholder="Enter location (e.g., Accra, Kumasi)" 
                onChange={handleChange}
                className="search-bar__input"
              />
            </div>
            
            <div className="search-bar__input-wrapper">
              <img src="/price.png" alt="" className="search-bar__input-icon" />
              <input
                type="number"
                name="minPrice"
                min={0}
                max={10000000}
                placeholder="Min Price (₵)"
                onChange={handleChange}
                className="search-bar__input"
              />
            </div>
            
            <div className="search-bar__input-wrapper">
              <img src="/price.png" alt="" className="search-bar__input-icon" />
              <input
                type="number"
                name="maxPrice"
                min={0}
                max={10000000}
                placeholder="Max Price (₵)"
                onChange={handleChange}
                className="search-bar__input"
              />
            </div>
            
            <Link 
              to={`/list?type=${query.type}&city=${query.location}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
              className="search-bar__submit"
            >
              <button type="button" className="search-bar__submit-btn">
                <img src="/search.png" alt="" />
                <span>Search Properties</span>
              </button>
            </Link>
          </div>
        </form>

        <div className="search-bar__quick-filters">
          <span className="search-bar__quick-label">Popular searches:</span>
          <button className="search-bar__quick-btn">Lands in Accra</button>
          <button className="search-bar__quick-btn">Lands in East Legon</button>
          <button className="search-bar__quick-btn">Lands under ₵2000</button>
        </div>
      </div>
    </div>
  );
}



export default SearchBar;