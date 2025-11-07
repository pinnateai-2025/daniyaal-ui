import { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [searchText, setSearchText] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = ["Home", "Products", "About", "Our Story", "Gifts", "Contact"];

  const clearSearch = () => setSearchText("");

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src={logo} alt="Daniyaal Logo" />
        </div>
        <div className="navbar-title">
          <h1>DANIYAAL</h1>
          <p>PERFUMERY</p>
        </div>
      </div>

      {/* Center Links */}
      <nav className="navbar-links">
        <ul>
          {navItems.map((item) => (
            <li key={item}>
              <a
                href="#"
                className={activeLink === item ? "active" : ""}
                onClick={() => setActiveLink(item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right Section */}
      <div className="navbar-right">
        {/* Search */}
        <div className="navbar-search">
          <FiSearch className="icon" />
          <input
            type="text"
            placeholder="Search fragrances..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && <FiX className="icon clear-icon" onClick={clearSearch} />}
        </div>

        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? (
            <MdOutlineLightMode className="icon" style={{ color: "white" }} />
          ) : (
            <MdOutlineDarkMode className="icon" />
          )}
        </button>

        {/* Cart */}
        <FiShoppingCart
          className="icon cart"
          style={{ color: isDarkMode ? "white" : "black" }}
        />

        {/* Login */}
        <button className="login-btn">
          <FiUser className="icon user" /> Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
