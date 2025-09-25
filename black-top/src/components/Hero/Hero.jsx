import React, { useState, useEffect } from 'react';
import blackTop1 from '/images/blacktop-img4.webp'
import blackTop2 from '/images/blacktop-img3.webp'
import blackTop3 from '/images/blacktop-img5.webp'
import logo from '/images/blackTop-logo.jpg'
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Replace these with your actual image paths
  const slides = [
    blackTop1,
    blackTop2, 
    blackTop3
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="hero">
      {/* Background Slider */}
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          ></div>
        ))}
        
        {/* Dark Overlay */}
        <div className="dark-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        {/* Logo */}
        <div className="hero-logo">
          <img src={logo} alt="Coffee Shop Logo" />
          {/* Fallback text */}
          <span className="logo-fallback">BLACKTOP</span>
        </div>

        {/* Title */}
        <h1 className="hero-title">Blacktop Coffee</h1>

        {/* Description */}
        <p className="hero-description">
          Crafting exceptional coffee experiences in the heart of the city. 
          Where every cup tells a story.
        </p>

        {/* Buttons */}
        <div className="hero-buttons">
          <a href="#contact">
          <button className="btn btn-light">
            Contact
          </button>
          </a>
          <a href="#menu">
          <button className="btn btn-dark">Menu</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;