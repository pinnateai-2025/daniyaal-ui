import "./WishlistProduct.css";
import { useWishlist } from "../../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiShoppingCart } from "react-icons/fi";
import Wishlist from "../../assets/wishlist.png";

const WishlistProduct = () => {

    const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
    const navigate = useNavigate();

    return (
        <div className="wishlist-container">
            {wishlist.length === 0 ? (
                <div className="empty-wishlist-container">
                    <img src={Wishlist} alt="wishlist-icon" />
                    <h2>Your wishlist is empty</h2>
                    <p>Looks like you haven't added anything to your wishlist yet.</p>

                    <button
                        className="continue-btn"
                        onClick={() => navigate("/products")}
                    >
                        Continue Shopping <FiArrowRight className="arrow-icon" />
                    </button>
                </div>
            ) : (
                <div className="wishlist-info">
                    <div className="wishlist-header">
                        <h2>
                            {wishlist.length === 1 ? "Wishlist" : "Wishlists"}
                        </h2>
                        <p>
                            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} in your wishlist
                        </p>
                    </div>
                    <div className="wishlist-grid">
                        {wishlist.map((item) => (
                            <div key={item.id} className="wishlist-card">
                                <div className="wishlist-img-box">
                                    <img src={item.img} alt="" />

                                    <button
                                        className="remove-btn"
                                        onClick={() => toggleWishlist(item)}
                                    >
                                        <FiHeart /> Remove
                                    </button>

                                    <span className="brand-name">{item.category}</span>

                                    <button className="addCart-btn">
                                        <FiShoppingCart />
                                    </button>
                                </div>

                                <div className="wishlist-content">
                                    <h3>
                                        <Link
                                            to={`/product/${item.id}`}
                                            state={{ product: item }}
                                        >
                                            {item.name}
                                        </Link>
                                    </h3>

                                    <p className="wishlist-desc">{item.desc}</p>

                                    <div className="wishlist-price">
                                        <p>₹{item.price.toLocaleString()}</p>
                                        <span className="wishlist-size">{item.size}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {wishlist.length > 0 && (
                <div className="wishlist-bottom-btn">
                    <button
                        className="wishlist-clear-btn"
                        onClick={clearWishlist}
                    >
                        Clear Wishlist
                    </button>

                    <button
                        className="wishlist-shopping-btn"
                        onClick={() => navigate("/products")}
                    >
                        Continue Shopping
                    </button>
                </div>
            )}
        </div>
    )
}

export default WishlistProduct;