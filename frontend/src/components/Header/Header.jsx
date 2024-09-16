import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons
import "./Header.css";

const Header = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logged out");
  };

  return (
    <header className="header bg-dark text-white py-3">
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col xs="auto" className="d-md-none">
            <button
              className="sidebar-toggle btn text-white"
              onClick={toggleSidebar}
            >
              <FaBars />
            </button>
          </Col>
          <Col xs className="text-md-left">
            <h1 className="m-0 header-h1">Assets Management System</h1>
          </Col>
          <Col xs="auto" className="d-flex justify-content-end">
            <div className="user-menu">
              <img
                src="/images/child.jpg"
                alt="User"
                className="user-picture"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
