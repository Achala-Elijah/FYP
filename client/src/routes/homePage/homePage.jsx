import { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import List from "../../components/list/List";

function HomePage() {
  const {currentUser} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
  
    getPosts();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__badge">
              <span>🏡 Trusted by 10,000+ Customers</span>
            </div>
            <h1 className="hero__title">
              Find Your Perfect Property in Ghana
            </h1>
            <p className="hero__subtitle">
              Discover premium real estate opportunities across Ghana. From luxurious homes 
              to profitable investments, we connect you with your dream property.
            </p>
            
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number">5,000+</span>
                <span className="hero__stat-label">Properties Listed</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-number">1,200+</span>
                <span className="hero__stat-label">Happy Clients</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-number">15+</span>
                <span className="hero__stat-label">Cities Covered</span>
              </div>
            </div>
          </div>
          
          <div className="hero__image">
            <img src="/bg.png" alt="Beautiful property in Ghana" />
            <div className="hero__floating-card">
              <div className="hero__floating-card-content">
                <img src="/house-icon.png" alt="" />
                <div>
                  <h4>Premium Properties</h4>
                  <p>Verified listings from trusted agents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <SearchBar />

      {/* Featured Properties Section */}
      <section className="featured-properties">
        <div className="featured-properties__container">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading amazing properties...</p>
            </div>
          ) : (
            <List posts={posts.slice(0, 6)} />
          )}
          
          {posts.length > 6 && (
            <div className="view-all-section">
              <a href="/list" className="view-all-btn">
                View All Properties
                <img src="/arrow.png" alt="" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features__container">
          <div className="features__header">
            <h2>Why Choose LandLink Ghana?</h2>
            <p>We provide comprehensive real estate solutions tailored for the Ghanaian market</p>
          </div>
          
          <div className="features__grid">
            <div className="feature-card">
              <div className="feature-card__icon">
                <img src="/verified.png" alt="" />
              </div>
              <h3>Verified Properties</h3>
              <p>All listings are thoroughly verified by our expert team for authenticity and accuracy.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-card__icon">
                <img src="/support.png" alt="" />
              </div>
              <h3>24/7 Support</h3>
              <p>Our dedicated support team is available round the clock to assist you.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-card__icon">
                <img src="/legal.png" alt="" />
              </div>
              <h3>Legal Assistance</h3>
              <p>Get professional legal guidance for property transactions and documentation.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-card__icon">
                <img src="/finance.png" alt="" />
              </div>
              <h3>Financing Options</h3>
              <p>Connect with trusted financial institutions for mortgage and loan solutions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
