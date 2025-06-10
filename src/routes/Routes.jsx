import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";

const Routes = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="h-20">
        <Navbar />
      </div>

      <div className="min-h-[calc(100vh-368.8px)]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Routes;
