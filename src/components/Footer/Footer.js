import "./Footer.css";
import logo from "../../assets/logo.png";
import { TbBrandFacebook, TbBrandInstagram, TbBrandTwitter } from "react-icons/tb";
import email from "../../assets/email.png";
import call from "../../assets/call.png";
import location from "../../assets/location.png";
import StayInLoop from "../StayInLoop/StayInLoop";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-top">

        {/* -------------------- Brand Logo -------------------- */}
        <div className="footer-section">
          <div className="footer-logo">
            <img src={logo} alt="DANIYAAL" />
            <div>
              <h2>DANIYAAL</h2>
              <p>PERFUMERY</p>
            </div>
          </div>

          <p className="footer-desc">
            Crafting luxury attars and perfumes where tradition meets elegance.
            Experience the finest fragrances that tell your unique story.
          </p>

          <div className="footer-socials">
            <TbBrandFacebook />

            <TbBrandInstagram
              onClick={() =>
                window.open("https://www.instagram.com/daniyaal_perfumery/", "_blank")
              }
            />

            <TbBrandTwitter />
          </div>

        </div>

        {/* -------------------- Quick Links -------------------- */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li onClick={() => navigate("/about")}>About Us</li>
            <li onClick={() => navigate("/our-story")}>Our Story</li>
            <li onClick={() => navigate("/products")}>All Products</li>
            <li onClick={() => navigate("/gifts")}>Gift Sets</li>
            <li onClick={() => navigate("/contact")}>Contact</li>
          </ul>
        </div>

        {/* -------------------- Customer Care -------------------- */}
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

        {/* -------------------- Contact -------------------- */}
        <div className="footer-section contact">
          <h3>Get in Touch</h3>
          <ul>
            <li><img src={call} alt="call" /> +91 7542944441 </li>
            <li><img src={email} alt="email" /> daniyaalperfumery@gmail.com</li>
            <li><img src={location} alt="location" /> DANISH APARTMENT ROAD, Samanpura, Raja Bazar, Indrapuri, Patna, Bihar 800014</li>
          </ul>
        </div>

      </div>

      {/* -------------------- Newsletter -------------------- */}
      <div className="footer-newsletter">
        <StayInLoop />
      </div>

      {/* -------------------- Footer Bottom -------------------- */}
      <div className="footer-bottom">
        <p>
          © 2025 Daniyaal Perfumery. All rights reserved. | 
          <span className="footer-link" onClick={() => navigate("/privacy-policy")}> Privacy Policy </span> | 
          <span className="footer-link"> Terms of Service </span>
        </p>

        <p>
          Designed and Developed by{" "}
          <a
            href="https://pinnate.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pinnate Technologies.
          </a>
        </p>
      </div>

    </footer>
  );
};

export default Footer;
