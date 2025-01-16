import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';
import menuIcon from '../assets/menu_icon.jpg';
import { useCookies } from "react-cookie"





export const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Kraina Trivii</h1>
      <div className={`nav-links ${isNavVisible ? 'show' : ''}`}>
        <Link to="/home" className="nav-item">Home</Link>
        <Link to="/categories" className="nav-item">Categories</Link>
        <Link to="/leaderboard" className="nav-item">Leaderboard</Link>
        <Link to="/about" className="nav-item">About</Link>
        {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
      </div>
      <div className="nav-toggle" onClick={toggleNav}>
        <img src={menuIcon} alt="Menu" className="menu-icon" />
      </div>
    </nav>
  );
};
