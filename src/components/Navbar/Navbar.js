import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FiSearch, FiShoppingCart, FiUser, FiX, FiMenu } from "react-icons/fi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";
import Register from "../Register/Register";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false); 
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 10) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="top-row">
          {/* LEFT */}
          <div className="navbar-left">
            <div className="navbar-logo">
              <img src={logo} alt="Daniyaal Logo" />
            </div>
            <div className="navbar-title">
              <h1>DANIYAAL</h1>
              <p>PERFUMERY</p>
            </div>
          </div>

          {/* CENTER LINKS */}
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

          {/* RIGHT */}
          <div className="navbar-right">
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

            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? (
                <MdOutlineLightMode className="icon" style={{ color: "white" }} />
              ) : (
                <MdOutlineDarkMode className="icon" />
              )}
            </button>

            <FiShoppingCart
              className="icon cart"
              style={{ color: isDarkMode ? "white" : "black" }}
            />

            {/* LOGIN BUTTON OPENS MODAL */}
            <button className="login-btn" onClick={() => setShowRegister(true)}>
              <FiUser className="icon user" /> Login
            </button>
          </div>

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

      {/* REGISTER MODAL */}
      {showRegister && (
        <div className="modal-overlay" onClick={() => setShowRegister(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Register onClose={() => setShowRegister(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
