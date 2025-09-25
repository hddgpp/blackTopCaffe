import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Wavy SVG Top Edge - FIXED */}
      {/* Wavy SVG Top Edge - PROPERLY FIXED */}
<div className="wave-container">
  <svg 
    viewBox="0 0 1200 120" 
    preserveAspectRatio="none"
    className="wave-svg"
  >
    <path 
      d="M0,96 C150,128 300,64 450,96 C600,128 750,64 900,96 C1050,128 1200,64 1200,64 L1200,320 L0,320 Z" 
      opacity=".25" 
      className="wave-path"
    ></path>
    <path 
      d="M0,112 C150,144 300,80 450,112 C600,144 750,80 900,112 C1050,144 1200,80 1200,80 L1200,320 L0,320 Z" 
      opacity=".5" 
      className="wave-path"
    ></path>
    <path 
      d="M0,128 C150,160 300,96 450,128 C600,160 750,96 900,128 C1050,160 1200,96 1200,96 L1200,320 L0,320 Z" 
      className="wave-path"
    ></path>
  </svg>
</div>


      {/* Main Footer Content */}
      <div className="footer-content">
        {/* Left Column - Logo & Description */}
        <div className="footer-column">
          <div className="footer-logo">
            <img src="../../../public/images/logo22.png" alt="Blacktop Coffee" />
            <h2>BlackTop</h2>
            <span className="logo-fallback">BLACKTOP</span>
          </div>
          <p className="footer-description">
            Crafting exceptional coffee experiences in the heart of Safi. 
            Where every cup tells a story of passion and quality.
          </p>
        </div>

        {/* Middle Column - Quick Links */}
        <div className="footer-column">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#menu">Menu</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Location</a></li>
            <li><a href="https://glovoapp.com/ma/en/safi/blacktop-coffee-asf/" target='_blank'>Order Now</a></li>
            <li><a href="https://www.instagram.com/blacktopcoffee_/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>

        {/* Right Column - Contact Info */}
        <div className="footer-column">
          <h3 className="footer-title">Contact Info</h3>
          <div className="contact-info">
            <p> Avenue Moulay Youssef, SAFI</p>
            <p>7AM - 12AM Daily</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="divider"></div>
        <p className="copyright">
          © 2025 Blacktop Coffee. Built with ❤️ and way too much coffee by Youssef (hddgpp)
        </p>
      </div>
    </footer>
  );
};

export default Footer;