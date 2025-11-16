import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FiSearch, FiShoppingCart, FiUser, FiX, FiMenu } from "react-icons/fi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const menuRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Our Story", path: "/our-story" },
    { name: "Gifts", path: "/gifts" },
    { name: "Contact", path: "/contact" },
  ];

  const clearSearch = () => setSearchText("");

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Add scroll listener to detect when navbar should change opacity
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="top-row">
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
        <nav ref={menuRef} className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={activeLink === item.name ? "active" : ""}
                  onClick={() => {
                    setActiveLink(item.name);
                    setMenuOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile extra buttons (only visible on <=768px) */}
          <div className="mobile-extra-buttons">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? (
                <>
                  <MdOutlineLightMode className="icon" style={{ color: "white" }} />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <MdOutlineDarkMode className="icon" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <button className="cart-btn">
              <FiShoppingCart className="icon cart" />
              <span>Cart</span>
            </button>
          </div>
        </nav>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Search */}
          <div className="navbar-searching">
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

        {/* Hamburger (visible only on mobile) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      <div className="bottom-row">
        <div className="mobile-navbar-search">
          <FiSearch className="icon" />
          <input
            type="text"
            placeholder="Search fragrances..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && <FiX className="icon clear-icon" onClick={clearSearch} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
