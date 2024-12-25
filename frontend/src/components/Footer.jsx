import React from "react";
import { FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";
import logo from "../assets/images/logo.jpg";

const Footer = () => {
  return (
    <div className="footer bg-slate-700 py-2 pt-3">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Left: Website Title and Logo */}
          <div className="footer-logo">
            <img src={logo} alt="Website Logo" className="max-h-10 w-fit" />
            <h1 className="footer-title">The Waiting Market</h1>
          </div>

          {/* Right: Social Links */}
          <div className="footer-socials">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/emersonsmithii/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaInstagram className="social-icon" />
              <p>Instagram</p>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/jacob-smith-9105a5273/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaLinkedin className="social-icon" />
              <p>LinkedIn</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
