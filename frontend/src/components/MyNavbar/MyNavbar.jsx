import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";
import "./MyNavbar.css"; // Custom styles for the navbar

const MyNavbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <Navbar bg="light" variant="light" className="my-navbar">
      <Container>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/dashboard">
            <FaTachometerAlt className="mynav-icon" /> Dashboard
          </Nav.Link>
          <NavDropdown
            title={
              <span>
                <FaBook className="mynav-icon" /> Definitions
              </span>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item as={NavLink} to="/add-item">
              Add Item
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/add-category">
              Add Category
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/add-court-office">
              Add Court/Office/Others
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/add-employee">
              Add Employee
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/add-vendor">
              Add Vendor
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/add-user">
              Add User
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <span>
                <FaClipboardList className="mynav-icon" /> Activity
              </span>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item as={NavLink} to="/add-stock">
              Add Stock
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/deduct-stock">
              Deduct Stock
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <span>
                <FaChartBar className="mynav-icon" /> Reports
              </span>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item as={NavLink} to="/datewise-report">
              Datewise Report
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/category-item-report">
              Category/Item Wise Report
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/court-office-report">
              Court/Office Wise Report
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
