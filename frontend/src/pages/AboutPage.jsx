import React from "react";
import logo from "../assets/images/logo.jpg";
import EmersonPortrait from "../assets/images/portrait.png";

const AboutPage = () => {
  return (
    <div className="block">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <img
          className="w-32 sm:w-48 h-auto md:m-8 sm:m-2"
          alt="Image of Emi"
          src={EmersonPortrait}
        />
        <p className="AboutText md:text-lg sm:text-xs">
          I'm a multi-media, mei Ed-media artist focusing on oil and acrylic
          painting. I'll graduate in May 2025 with a BA in art and a minor in
          sociology. My interests and topics include self-discovery, politics,
          religion, and growth/ change. In addition to painting, I enjoy
          sculpture and graphite drawing.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row-reverse items-center sm:items-start">
        <img
          className="w-32 sm:w-48 h-auto md:m-8 sm:m-2"
          alt="Image of Jacob"
          src={logo}
        />
        <p className="AboutText md:text-lg sm:text-xs">
          Yo Whatsup, this is Jacob. I am the one who made the website and did
          nothing regarding the artwork. I am an aspiring software engineer so
          if you have any quetions or inquiries please feel free to reach out.
          My linkedin is attatched to the bottom of the page
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
