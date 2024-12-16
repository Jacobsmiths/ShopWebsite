import React from "react";
import logo from "../assets/images/logo.jpg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <img className="h-10 w-auto" src={logo} />
            <span className="hidden md:block text-white text-2xl font-bold ml-2">
              Emersons Art Gallery
            </span>
            <div className="md:ml-auto">
              <div className="flex space-x-2"></div>
            </div>
          </div>
          <div className="text-right px-5">
            <NavLink to="/about" className="NavLink">
              About
            </NavLink>
            <NavLink to="/cart" className="NavLink">
              Cart
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
