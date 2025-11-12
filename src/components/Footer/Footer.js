import "./Footer.css";
import logo from "../../assets/logo.png";
import { TbBrandFacebook, TbBrandInstagram, TbBrandTwitter } from "react-icons/tb";
import email from "../../assets/email.png";
import call from "../../assets/call.png";
import location from "../../assets/location.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <div className="footer-logo">
            <img src={logo} alt="DANIYAAL" />
            <div>
              <h2>DANIYAAL</h2>
              <p>PERFUMERY</p>
            </div>
          </div>
          <p className="footer-desc">
            Crafting luxury attars and perfumes since tradition meets elegance. 
            Experience the finest fragrances that tell your unique story.
          </p>
          <div className="footer-socials">
            <TbBrandFacebook />
            <TbBrandInstagram />
            <TbBrandTwitter />
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>About Us</li>
            <li>Our Story</li>
            <li>All Products</li>
            <li>Gift Sets</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-section care">
          <h3>Customer Care</h3>
          <ul>
            <li>Shipping Info</li>
            <li>Return Policy</li>
            <li>Size Guide</li>
            <li>Care Instructions</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Get in Touch</h3>
          <ul>
            <li><img src={call} alt="call" /> +91 98765 43210</li>
            <li><img src={email} alt="email"  /> info@daniyaalperfumery.com</li>
            <li><img src={location} alt="location"  /> 123 Fragrance Street, Kannauj, Uttar Pradesh, India 209725</li>
          </ul>
        </div>
      </div>

      <div className="footer-newsletter">
        <h3>Stay Connected</h3>
        <p>
          Subscribe to our newsletter and be the first to know about new <br /> fragrances, 
          exclusive offers, and perfumery insights.
        </p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Daniyaal Perfumery. All rights reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
