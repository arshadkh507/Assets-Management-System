import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import MyNavbar from "../components/MyNavbar/MyNavbar";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MyNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
