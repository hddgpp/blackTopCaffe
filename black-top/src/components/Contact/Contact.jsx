import React from 'react';
import './Contact.css';

import locationIcon from '../../assets/images/location-icon.jpg';
import hoursIcon from '../../assets/images/hours-icon.jpg';
import phoneIcon from '../../assets/images/phone-icon.jpg';
import ig from "../../assets/images/ig.png"

const Contact = () => {
  const handleGetDirections = () => {
    window.open('https://www.google.com/maps/place/BLACKTOP/@32.2989911,-9.2324314,556m/data=!3m2!1e3!4b1!4m6!3m5!1s0xdac21006550d3db:0x4a6f7434dc137893!8m2!3d32.2989911!4d-9.2324314!16s%2Fg%2F11yf61lcm1?entry=ttu', '_blank');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com/blacktopcoffee_', '_blank');
  };

  return (
    <section id="contact" className="contact-section">
      {/* Top Section */}
      <div className="contact-header">
        <h1 className="contact-title">Visit Us</h1>
        <p className="contact-subtitle">Come experience the best coffee in town</p>
      </div>

      {/* Two-Column Main Content */}
      <div className="contact-content">
        {/* Left Column - Interactive Map */}
        <div className="map-column">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3413.474152500944!2d-9.2324314!3d32.2989911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdac21006550d3db%3A0x4a6f7434dc137893!2sBLACKTOP!5e0!3m2!1sen!2sma!4v1737552000000!5m2!1sen!2sma"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Blacktop Coffee Location"
            ></iframe>
          </div>
        </div>

        {/* Right Column - Contact Info */}
        <div className="info-column">
          {/* Location Section */}
          <div className="info-section">
            <h3 className="info-title">Location</h3>
            <div className="info-content">
              <img src={locationIcon} alt="Location" className="info-icon-img" />
              <div className="info-text">
                <p>Avenue Moulay Youssef, SAFI</p>
              </div>
            </div>
          </div>

          {/* Hours Section */}
          <div className="info-section">
            <h3 className="info-title">Hours</h3>
            <div className="info-content">
              <img src={hoursIcon} alt="Business hours" className="info-icon-img" />
              <div className="info-text">
                <p><strong>All week:</strong></p>
                <p>7 AM – 12 AM</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="info-section">
            <h3 className="info-title">Contact</h3>
            <div className="info-content">
              <img src={phoneIcon} alt="Contact phone" className="info-icon-img" />
              <div className="info-text">
                <p><strong>Phone:</strong> +212 XXX-XXXXXX</p>
                <p><strong>Email:</strong> info@blacktopcoffee.com</p>
              </div>
            </div>
          </div>

          {/* NEW: Buttons Section */}
          <div className="buttons-section">
            <button className="btn-direction" onClick={handleGetDirections}>
              Get Directions
            </button>
            <button className="btn-instagram" onClick={handleInstagram}>
             <img src={ig} alt="Instagram" className="instagram-icon-img" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;