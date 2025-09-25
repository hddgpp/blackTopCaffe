import React, { useState } from 'react';
import logo from '/images/Screenshot_2025-09-24_145927-removebg-preview.png'
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        
        <div className="nav-logo">
          <img src={logo} alt="Coffee Shop Logo" className="logo-image" />
          <h2>BlackTop</h2>
          {/* Fallback text if image doesn't load */}
          <span className="logo-fallback">BlackTop</span>
        </div>

        {/* Navigation Links - Desktop */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="#home" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="#menu" className="nav-link">Menu</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">Contact</a>
          </li>
        </ul>

        {/* CTA Button */}
        <div className="nav-cta">
          <a href="https://glovoapp.com/ma/en/safi/blacktop-coffee-asf/" target='_blank'>
          <button className="cta-button">Order Online</button>
          </a>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;