import "./AddCart.css";
import { useCart } from "../../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import CartImg from "../../assets/cart.png";
import Remove from "../../assets/remove.png";
import PriceTag from "../../assets/price-tag.png";
import Checkout from "../../assets/checkout.png";
import Shipping from "../../assets/shipping.png";
import Gift from "../../assets/gift.png";
import Payment from "../../assets/payment.png";

const AddCart = () => {
    const { cart, updateQuantity, removeItem, clearCart } = useCart();
    const navigate = useNavigate();

    return (
        <div className="cart-container">
            {cart.length === 0 ? (
                <div className="empty-cart-container">
                    <img src={CartImg} alt="cart-icon" />
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart yet.</p>

                    <button
                        className="cart-continue-btn"
                        onClick={() => navigate("/products")}
                    >
                        Continue Shopping <FiArrowRight className="cart-arrow-icon" />
                    </button>
                </div>
            ) : (
                <div className="cart-info">
                    <div className="cart-header">
                        <h2>Shopping Cart</h2>
                        <p>
                            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
                        </p>
                    </div>

                    <div className="cart-grid">
                        <div className="cart-left-container">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item-card">
                                    <div className="cart-img">
                                        <img src={item.img} alt={item.name} />
                                    </div>

                                    <div className="cart-inner-info">
                                        <div className="cart-title">
                                            <h4>
                                                <Link
                                                    to={`/product/${item.id}`}
                                                    state={{ product: item }}
                                                >
                                                    {item.name}
                                                </Link>
                                            </h4>
                                            <p>₹{item.price.toLocaleString()}</p>
                                        </div>

                                        <div className="cart-content">
                                            <div className="inner-content">
                                                <p>{item.category}</p>
                                                <span>{item.quantity}</span>
                                            </div>
                                            <div className="each-price">
                                                <p>₹{(item.price * item.quantity).toLocaleString()} each</p>
                                            </div>
                                        </div>

                                        <p className="cart-desc">{item.desc}</p>

                                        <div className="cart-button">
                                            <div className="cart-quantity-box">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity > 1
                                                                ? item.quantity - 1
                                                                : 1
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                className="delete-btn"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <img src={Remove} alt="delete" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="cart-bottom-btn">
                                <button
                                    className="clear-btn"
                                    onClick={clearCart}
                                >
                                    Clear Cart
                                </button>
                                <button
                                    className="shopping-btn"
                                    onClick={() => navigate("/products")}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>

                        <div className="cart-right-container">
                            <div className="cart-promo-code">
                                <div className="promo-code">
                                    <img src={PriceTag} alt="PriceTag" />
                                    <p>Promo Code</p>
                                </div>
                                <div className="promo-input">
                                    <input type="text" placeholder="Enter promo code" />
                                    <button>Apply</button>
                                </div>
                                <div className="promo-desc">
                                    <p>Try: WELCOME10 or DANIYAAL15</p>
                                </div>
                            </div>

                            <div className="cart-order">
                                <p className="order-summary">Order Summary</p>
                                <div className="subtotal">
                                    <p>Subtotal</p>
                                    <p>2000</p>
                                </div>
                                <div className="shipping">
                                    <p>Shipping</p>
                                    <p className="free">Free</p>
                                </div>
                                <div className="cart-order-border"></div>
                                <div className="total">
                                    <p>Total</p>
                                    <p>2000</p>
                                </div>
                                <button className="checkout">
                                    <img src={Checkout} alt="checkout" /> Proceed to Checkout
                                </button>
                                <p className="cart-order-note">Please login to continue with checkout</p>
                            </div>

                            <div className="cart-points">
                                <div className="free-shipping">
                                    <img src={Shipping} alt="shipping" />
                                    <p>Free shipping above ₹2000</p>
                                </div>
                                <div className="gift-wrapping">
                                    <img src={Gift} alt="gift" />
                                    <p>Free gift wrapping available</p>
                                </div>
                                <div className="secure-payment">
                                    <img src={Payment} alt="payment" />
                                    <p>Secure payment via Razorpay</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCart;
