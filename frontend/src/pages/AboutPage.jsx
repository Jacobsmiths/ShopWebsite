import React from "react";
import logo from "../assets/images/logo.jpg";
import EmersonPortrait from "../assets/images/portrait.png";

const AboutPage = () => {
  return (
    <div className="block">
      <div className="flex">
        <img
          className="AboutEmiPortrait md:height-auto"
          alt="Image of Emi"
          src={EmersonPortrait}
        />
        <p className="AboutText">
          This is the about Text for emi who has yet to send me anything
        </p>
      </div>
      <div className="flex">
        <p className="AboutText">
          Yo Whatsup, this is Jacob. I am the one who made the website and did
          nothing regarding the artwork. I am just looking to build my resume so
          if you have any quetions please feel free to reach out. My linkedin is
          attatched to the bottom of the page
        </p>
        <img
          className="AboutJacobPortrait md:height-auto"
          alt="Image of Jacob"
          src={logo}
        />
      </div>
    </div>
  );
};

export default AboutPage;
