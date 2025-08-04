import { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore.js";

function Navbar() {
  const [open, setOpen] = useState(false);
  const {currentUser} = useContext(AuthContext)

  const fetch = useNotificationStore((state) => state.fetch)
  const number = useNotificationStore((state) => state.number)


  useEffect(() => {
    if (currentUser) {
      fetch(); // correct usage
    }
  }, [currentUser, fetch]);


  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="navbar__container">
        <div className="navbar__left">
          <a href="/" className="navbar__logo" aria-label="LandLink Ghana Home">
            <img src="/logo.png" alt="LandLink Ghana Logo" />
            <span>LandLink Ghana</span>
          </a>
          <a href="/" className="navbar__link"><img src="/home.png" alt="" className="navbar__icon"/>Home</a>
          <a href="/about" className="navbar__link"><img src="/about.png" alt="" className="navbar__icon"/>About</a>
          <a href="/contact" className="navbar__link"><img src="/contact.png" alt="" className="navbar__icon"/>Contact</a>
          <a href="/agents" className="navbar__link"><img src="/agents.png" alt="" className="navbar__icon"/>Agents</a>
        </div>
        <div className="navbar__right">
          <a href="/list-property" className="navbar__cta">List Your Property</a>
          {currentUser ? (
            <div className="navbar__user">
              <img
                src={currentUser.avatar || "/noavatar.png"}
                alt="User Avatar"
              />
              <span>{currentUser.username}</span>
              <Link to="/profile" className="profile">
                {number > 0 && <div className="notification" aria-label="Notifications">{number}</div>}
                <span>Profile</span>
              </Link>
            </div>
          ) : (
            <>
              <a href="/login">Sign in</a>
              <a href="/register" className="register">
                Sign up
              </a>
            </>
          )}
          <button className="menuIcon" aria-label="Open menu" onClick={() => setOpen((prev) => !prev)}>
            <img
              src="/menu.png"
              alt="Menu"
            />
          </button>
          <div className={open ? "menu active" : "menu"}>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/agents">Agents</a>
            <a href="/login">Sign in</a>
            <a href="/register">Sign up</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
