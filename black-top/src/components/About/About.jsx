import React from 'react';
import aboutImage from '../../assets/images/about-photo.png';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      {/* Top Section */}
      <div className="about-header">
        <h1 className="about-title">Our Story</h1>
        <p className="about-subtitle">Discover the journey behind every cup</p>
      </div>

      {/* Two-Column Main Content */}
      <div className="about-content">
        {/* Left Column - Story Text */}
        <div className="story-column">
          <div className="story-content">
            <h2 className="story-heading">Serving Safi Since 2025</h2>
            <div className="story-text">
              <p>
                At Blacktop Coffee, we may be new, but in a short time we’ve built a reputation 
                for offering the best service and the finest coffee in all of Safi. Every cup we 
                serve is crafted with care and passion.
              </p>
              <p>
                From the very beginning, our mission has been simple: deliver exceptional coffee 
                made from high-quality beans, roasted to perfection, and prepared with attention 
                to detail. We believe great coffee is more than just a drink — it’s an experience.
              </p>
              <p>
                Today, we are proud to be known as Safi’s favorite spot for coffee lovers. Whether 
                you’re here for your morning boost, an afternoon break, or time with friends, 
                Blacktop Coffee is dedicated to making every visit unforgettable.
              </p>
          </div>
        </div>
      </div>


        {/* Right Column - Photo */}
        <div className="photo-column">
          <img src={aboutImage} alt="Blacktop Coffee interior and team" className="about-image" />
        </div>
      </div>
    </section>
  );
};

export default About;