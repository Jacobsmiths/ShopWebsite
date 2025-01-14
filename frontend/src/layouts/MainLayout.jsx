import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="HomePage">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
