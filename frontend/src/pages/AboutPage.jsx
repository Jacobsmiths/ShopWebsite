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
          Yo Whatsup, this is Jacob, and I made the website. This website is a
          full-stack project consisting of a backend running a node js server
          and a frontend powered by Vite React and tailwind CSS. The backend API
          supplies the front end with data stored in an SQL database, which the
          owner of the website manipulates via the backend using a secure Google
          Sheets file. This project also included setting up a server that runs
          nginx to serve the frontend or direct API calls and handling HTTP and
          HTTP calls. The code for the website can be found on my GitHub, which
          you can get from my LinkedIn attached in the footer.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
