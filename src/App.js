import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import Gifts from "./pages/Gifts";
import Product from "./pages/Product";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gifts" element={<Gifts />} />
      </Routes>
  );
}

export default App;