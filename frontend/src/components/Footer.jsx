import React from "react";
import { FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";
import logo from "../assets/images/logo.jpg";

const Footer = () => {
  return (
    <div className="bg-slate-700 py-2 pt-3">
      <div className="mx-auto max-w-7xl px-4 lg:px-4">
        <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-4 gap-y-10 sm:max-w-xl sm:grid-cols-2 sm:gap-x-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Left: Website Title and Logo */}

          {/* Replace the src with your logo URL */}
          <div className="">
            <img src={logo} alt="Website Logo" className="h-10 w-auto" />
            <h1 className="text-lg text-gray-200">The Waiting Market</h1>
          </div>
          <div className="flex space-x-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/emersonsmithii/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition"
            > <div className="flex">
              <FaInstagram size={24} />
              <p>Instagram</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/jacob-smith-9105a5273/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition"
            >
              <div className="flex">
              <FaLinkedin size={24} />
              <p>LinkedIn</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
