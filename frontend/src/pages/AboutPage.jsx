import React from "react";
import jacob from "../assets/images/jacob.jpg";
import EmersonPortrait from "../assets/images/logo.jpg";

const AboutPage = () => {
  return (
    <div className="block">
      <div className="flex flex-col sm:flex-row items-center sm:items-start md:m-0 mt-4">
        <img
          className="w-10/12 sm:w-1/2 h-auto md:m-8 sm:m-2"
          alt="Image of Emi"
          src={EmersonPortrait}
        />
        <p className="AboutText md:text-lg md:pr-4 sm:text-xs">
          I’m a multi-discipline, mixed-media artist focusing on oil and acrylic
          painting. I’ll graduate in May of 2025 with a BA in art and a minor in
          sociology. My interests and topics include self-discovery, politics,
          religion, and growth/change. In addition to painting, I enjoy
          sculpture, collage, and graphite drawing.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row-reverse items-center sm:items-start">
        <img
          className="w-2/3 sm:w-1/3 h-auto md:m-8 sm:m-2"
          alt="Image of Jacob"
          src={jacob}
        />
        <p className="AboutText md:text-lg sm:text-xs">
          Yo Whatsup, this is Jacob. I am the guy who made the website. So
          basically, I am renting a server where I am running nginx to control
          access to the server and then running a node js backend as well as a
          vite react frontend. The way the website works is via a connection to
          a google sheets file that controls all the items that are displayed.
          This is my first ever fully developed website and my code is public on
          my github, althought it does not have on there what or how I am
          running the server. If you have any inquiries please contact me via my
          LinkedIn on the footer of the website.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
