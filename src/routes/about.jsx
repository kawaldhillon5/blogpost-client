import React from 'react';
import '../css/about.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faPenNib, faLightbulb, faComments } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-section">
          <h2 className="about-title">A Community of Voices</h2>
          <p className="about-description">
           Connecting readers with diverse bloggers, fostering knowledge sharing and sparking conversations.
          </p>
      </section>
      <section className="features-section">
        <h3>Explore, Share, Connect</h3>
        <div className="features-grid">
          <Link to={'../client/allBlogPosts'} className="feature browse"> 
            <div className="feature-icon">
              <FontAwesomeIcon icon={faBookOpen} />
            </div>
            <h4>Browse</h4>
          </Link>
          <Link className="feature write"> 
            <div className="feature-icon">
              <FontAwesomeIcon icon={faPenNib} />
            </div>
            <h4>Write</h4>
          </Link>
          <Link to={'../client/allBlogRequests'} className="feature suggest"> 
            <div className="feature-icon">
              <FontAwesomeIcon icon={faLightbulb} />
            </div>
            <h4>Suggest</h4>
          </Link>
          <Link className="feature discuss"> 
            <div className="feature-icon">
              <FontAwesomeIcon icon={faComments} />
            </div>
            <h4>Discuss</h4>
          </Link>
        </div>
      </section>

      <section className="contact-section">
            <h3>Contact Us</h3>
            <p>Questions or feedback? We'd love to hear from you.</p>
            <p>Email: Kawaldhillon5@gmail.com</p>
       </section>
    </div>
  );
};

export default About;