import React from "react";
import { FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";
import logo from "../assets/images/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-slate-700 py-6">
      <div className="container mx-auto px-4 flex items-center">
        {/* Left: Website Title and Logo */}
        <div className="flex items-center justify-center mb-4 md:mb-0">
          {/* Replace the src with your logo URL */}
          <img src={logo} alt="Website Logo" className="h-10 w-auto" />
          <h1 className="text-lg text-gray-200 px-4">The Waiting Market</h1>
        </div>

        {/* Right: Connect Tab */}
        <div className="flex space-x-6">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/emersonsmithii/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            <FaInstagram size={24} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/jacob-smith-9105a5273/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
