import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import Gifts from "./pages/Gifts";
import Product from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Profile from "./pages/Profile";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { CategoryProvider } from "./context/CategoryContext";
import { OrderProvider } from "./context/OrderContext";
import ScrollRestorationFix from "./components/ScrollRestorationFix";

function App() {
  if (performance.navigation.type === 1) {
    window.location.href = "/";
  }

  return (
    <CategoryProvider>
      <OrderProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollRestorationFix />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/about" element={<About />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gifts" element={<Gifts />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </OrderProvider>
    </CategoryProvider>
  );
}


export default App;
