import React, { useState } from "react";
import {
  FaBook,
  FaChartBar,
  FaChevronDown,
  FaChevronUp,
  FaClipboardList,
  FaTachometerAlt,
  FaTimes,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // Custom styles for the sidebar

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        <FaTimes />
      </button>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaTachometerAlt className="icon" /> Dashboard
            </NavLink>
          </li>
          <li>
            <button onClick={() => handleDropdownToggle("definitions")}>
              <FaBook className="icon" /> Definitions{" "}
              {openDropdown === "definitions" ? (
                <FaChevronUp className="dropdownIcon" />
              ) : (
                <FaChevronDown className="dropdownIcon" />
              )}
            </button>
            <ul
              className={`dropdown ${
                openDropdown === "definitions" ? "show" : ""
              }`}
            >
              <li>
                <NavLink
                  to="/add-item"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={toggleSidebar}
                >
                  Add Item
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-category"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={toggleSidebar}
                >
                  Add Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-court-office"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={toggleSidebar}
                >
                  Add Court/Office/Others
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-employee"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={toggleSidebar}
                >
                  Add Employee
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-vendor"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={toggleSidebar}
                >
                  Add Vendor
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-user"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={toggleSidebar}
                >
                  Add User
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <button onClick={() => handleDropdownToggle("activity")}>
              <FaClipboardList className="icon" /> Activity{" "}
              {openDropdown === "activity" ? (
                <FaChevronUp className="dropdownIcon" />
              ) : (
                <FaChevronDown className="dropdownIcon" />
              )}
            </button>
            <ul
              className={`dropdown ${
                openDropdown === "activity" ? "show" : ""
              }`}
            >
              <li>
                <NavLink
                  to="/add-stock"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={toggleSidebar}
                >
                  Add Stock
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/deduct-stock"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={toggleSidebar}
                >
                  Deduct Stock
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <button onClick={() => handleDropdownToggle("reports")}>
              <FaChartBar className="icon" /> Reports{" "}
              {openDropdown === "reports" ? (
                <FaChevronUp className="dropdownIcon" />
              ) : (
                <FaChevronDown className="dropdownIcon" />
              )}
            </button>
            <ul
              className={`dropdown ${openDropdown === "reports" ? "show" : ""}`}
            >
              <li>
                <NavLink
                  to="/datewise-report"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={toggleSidebar}
                >
                  Datewise Report
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/category-item-report"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={toggleSidebar}
                >
                  Category/Item Wise Report
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/court-office-report"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={toggleSidebar}
                >
                  Court/Office Wise Report
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
