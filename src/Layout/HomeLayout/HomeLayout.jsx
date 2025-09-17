import React from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

const HomeLayout = () => {
  return (
    <div className="bg-black">
      <Helmet>
        <title>Blood Wave || Save Lives by Donating Blood</title>
        <meta
          name="description"
          content="Blood Wave helps you find blood donors, request blood, and contribute to saving lives easily."
        />
        <link rel="canonical" href="https://blood-wave.netlify.app/" />
      </Helmet>

      <div className="bg-[#fff1f1] text-[#e50914] font-medium  min-h-screen max-w-7xl mx-auto ">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default HomeLayout;
