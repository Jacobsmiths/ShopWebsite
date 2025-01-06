import React from "react";
import logo from "../assets/images/logo.jpg";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <div className="navbar-inner">
          <div className="navbar-left">
            <NavLink to="https://thewaitingmarket.me">
              <div className="logo-container">
                <img className="logo" src={logo} alt="Logo" />
                <span className="site-title">Emersons Art Gallery</span>
              </div>
            </NavLink>
          </div>
          <div className="navbar-right">
            <Link
              to="/"
              className="NavLink"
            >
              Gallery
            </Link>
            <Link to="/cart" className="NavLink">
              Cart
            </Link>
            <Link to="/about" className="NavLink">
              About
            </Link>
            <Link to="/contact" className="NavLink">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
