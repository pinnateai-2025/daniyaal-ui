import "./FragranceCollection.css";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useCategory } from "../../context/CategoryContext";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import perfume1 from "../../assets/perfume1.jfif";
import perfume2 from "../../assets/perfume2.jfif";
import perfume3 from "../../assets/perfume3.jpg";
import perfume4 from "../../assets/perfume4.jpg";

// Raw/Default data for fields missing in API
const DEFAULT_CARD_DATA = {
    rating: 4.8,
    reviews: 120,
    price: 2500,
    oldPrice: 3000,
    size: "12ml",
    discount: "₹500",
    desc: "A premium fragrance crafted with the finest ingredients and traditional techniques."
};

const FragranceCollection = () => {
    const { categories, loading } = useCategory();
    const [fragrances, setFragrances] = useState([]);
    const { wishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Limit to 4 featured items for home page
    useEffect(() => {
        if (categories && categories.length > 0) {
            const apiProducts = categories.slice(0, 4).map((item, index) => ({
                id: item.id,
                img: [perfume1, perfume2, perfume3, perfume4][index % 4],
                name: item.name,
                desc: item.description || DEFAULT_CARD_DATA.desc,
                category: item.name,
                rating: DEFAULT_CARD_DATA.rating,
                reviews: DEFAULT_CARD_DATA.reviews,
                price: DEFAULT_CARD_DATA.price,
                oldPrice: DEFAULT_CARD_DATA.oldPrice,
                size: DEFAULT_CARD_DATA.size,
                discount: DEFAULT_CARD_DATA.discount
            }));
            setFragrances(apiProducts);
        }
    }, [categories]);

    if (loading && fragrances.length === 0) {
        return null; // Or a skeleton loader
    }

    return (
        <section className="fragrance-collection">
            <div className="fragrance-title">
                <h1>
                    Featured <span>Fragrances</span>
                </h1>
                <p>
                    Discover our most beloved attars, each carefully crafted to capture
                    the <br /> essence of luxury and tradition.
                </p>
            </div>

            <div className="fragrance-grid">
                {fragrances.map((item) => (
                    <div key={item.id} className="fragrance-card">
                        <div className="card-image">
                            <img src={item.img} alt={item.name} />
                            <span className="discount-badge">Save {item.discount}</span>
                            <FiHeart
                                className="ourcollection-heart-icon"
                                style={{
                                    color: wishlist.some((p) => p.id === item.id) ? "#ff0000" : "#fff",
                                    backgroundColor: wishlist.some((p) => p.id === item.id)
                                        ? "rgba(255,255,255,0.6)"
                                        : "rgba(255,255,255,0.3)",
                                }}
                                onClick={() => {
                                    toggleWishlist(item);
                                }}
                            />
                            <FiShoppingCart
                                className="cart-icon"
                                onClick={() => {
                                    addToCart(item);
                                }}
                            />
                        </div>

                        <div className="card-content">
                            <div className="rating-collection">
                                <div className="rating">
                                    <FaStar className="star-icon" />
                                    <span>{item.rating}</span>
                                    <p>({item.reviews} reviews)</p>
                                </div>
                                <div className="collection">
                                    <span>{item.category}</span>
                                </div>
                            </div>

                            <h3>
                                <Link
                                    to={`/product/${item.id}`}
                                    state={{ product: item, allProducts: fragrances }}
                                    className="h3-link"
                                >
                                    {item.name}
                                </Link>
                            </h3>

                            <p className="desc">{item.desc}</p>

                            <div className="price-row">
                                <div className="price">
                                    <h2>₹{item.price.toLocaleString()}</h2>
                                    <span className="old-price">₹{item.oldPrice.toLocaleString()}</span>
                                </div>
                                <div className="size">{item.size}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="fragrance-button">
                <button className="products-btn" onClick={() => navigate("/products")}>
                    View All Products <FiArrowRight className="products-icon" />
                </button>
            </div>
        </section>
    );
};

export default FragranceCollection;
