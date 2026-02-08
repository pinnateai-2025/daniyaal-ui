import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FiHeart, FiSearch, FiShoppingCart, FiUser, FiX, FiMenu, FiLogOut } from "react-icons/fi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Register from "../Register/Register";

const Navbar = () => {

  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { user, logout } = useAuth();

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

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (showRegister) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showRegister]);

  useEffect(() => {
    const current = navItems.find((item) => item.path === location.pathname);
    if (current) setActiveLink(current.name);
  }, [location.pathname]);

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
      if (navbar) {
        if (window.scrollY > 10) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="top-row">
          {/* LEFT */}
          <div className="navbar-left" onClick={() => navigate("/")}>
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
                      setMenuOpen(false)
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

              <div className="mobile-right-btns">
                <button className="heart-btn">
                  <div className="mobile-heart-icon-wrapper" onClick={() => navigate("/wishlist")}>
                    <FiHeart
                      className="icon heart"
                      style={{ color: isDarkMode ? "white" : "black" }}
                    />

                    {wishlist.length > 0 && (
                      <span className="mobile-wishlist-badge">{wishlist.length}</span>
                    )}
                  </div>
                  <span>Wishlist</span>
                </button>

                <button className="cart-btn" onClick={() => navigate("/cart")}>
                  <div className="mobile-cart-icon-wrapper" onClick={() => navigate("/cart")}>
                    <FiShoppingCart
                      className="icon cart"
                    />

                    {cart.length > 0 && (
                      <span className="mobile-cart-badge">{cart.length}</span>
                    )}
                  </div>
                  <span>Cart</span>
                </button>
              </div>

              {user ? (
                <div className="mobile-auth-btns">
                  <button className="mobile-profile-btn" onClick={() => { navigate("/profile"); setMenuOpen(false); }}>
                    <FiUser /> {user.name.split(' ')[0]}'s Profile
                  </button>
                  <button className="mobile-logout-btn" onClick={() => { logout(); setMenuOpen(false); }}>
                    <FiLogOut /> Logout
                  </button>
                </div>
              ) : (
                <button className="mobile-login-btn" onClick={() => { setShowRegister(true); setMenuOpen(false); }}>
                  <FiUser /> Login / Sign Up
                </button>
              )}
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

            <div className="heart-icon-wrapper" onClick={() => navigate("/wishlist")}>
              <FiHeart
                className="icon heart"
                style={{ color: isDarkMode ? "white" : "black" }}
              />

              {wishlist.length > 0 && (
                <span className="wishlist-badge">{wishlist.length}</span>
              )}
            </div>

            <div className="cart-icon-wrapper" onClick={() => navigate("/cart")}>
              <FiShoppingCart
                className="icon cart"
                style={{ color: isDarkMode ? "white" : "black" }}
              />

              {cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </div>

            {/* LOGIN BUTTON OR USER PROFILE */}
            {user ? (
              <div className="user-nav-item">
                <div className="profile-dropdown-container">
                  <button className="profile-btn" onClick={() => navigate("/profile")}>
                    <FiUser className="icon user" /> {user.name.split(' ')[0]}
                  </button>
                  <div className="profile-dropdown">
                    <div className="dropdown-header">
                      <p className="user-name">{user.name}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button onClick={() => navigate("/profile")}>
                      <FiUser /> View Profile
                    </button>
                    <button onClick={logout} className="logout-action">
                      <FiLogOut /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button className="login-btn" onClick={() => setShowRegister(true)}>
                <FiUser className="icon user" /> Login
              </button>
            )}
          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div >

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
      </nav >

      {/* REGISTER MODAL */}
      {
        showRegister && (
          <div className="modal-overlay" onClick={() => setShowRegister(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <Register onClose={() => setShowRegister(false)} />
            </div>
          </div>
        )
      }
    </>
  );
};

export default Navbar;
