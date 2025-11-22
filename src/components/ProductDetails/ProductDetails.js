import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { FiShoppingCart, FiShare2, FiHeart } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import image1 from "../../assets/perfume1.jfif";
import image2 from "../../assets/perfume2.jfif";
import authentic from "../../assets/authentic.png";
import quality from "../../assets/quality.png";
import returns from "../../assets/return.png";
import shipping from "../../assets/shipping.png";

const ProductDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const product = location.state?.product;
    const allProducts = location.state?.allProducts || [];

    const fallbackImages = [image1, image2];
    const images = product?.images || [product?.img, ...fallbackImages];

    const [mainImg, setMainImg] = useState(images[0]);
    const [quantity, setQuantity] = useState(1);
    const [tab, setTab] = useState("details");

    useEffect(() => {
        if (!product) {
            navigate("/");
        }
    }, [product, navigate]);

    if (!product) return null;

    return (
        <div className="product-details">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <IoMdArrowBack /> Back
            </button>

            <div className="product-info">
                <div className="product-images">
                    <img src={mainImg} alt="Product" className="main-img" />

                    <div className="thumbnail-row">
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt="thumb"
                                className={`thumb-img ${mainImg === img ? "active-thumb" : ""}`}
                                onClick={() => setMainImg(img)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-details-section">
                    <span className="category-tag">{product.category}</span>
                    <h1 className="product-details-title">{product.name}</h1>

                    <div className="product-rating">
                        <div className="star-row">
                            {[1, 2, 3, 4, 5].map((num, i) => {
                                const filled = product.rating >= num;
                                return (
                                    <FaStar
                                        key={i}
                                        className={`star-icon ${filled ? "filled-star" : "empty-star"}`}
                                    />
                                );
                            })}
                        </div>
                        <span className="rating-score">{product.rating}</span>
                        <span className="review-count">({product.reviews} reviews)</span>
                    </div>

                    <div className="product-price">
                        <h2>₹{product.price.toLocaleString()}</h2>

                        {product.oldPrice && (
                            <p>₹{product.oldPrice.toLocaleString()}</p>
                        )}
                    </div>

                    {product.oldPrice && (
                        <p className="you-save">
                            You Save ₹{(product.oldPrice - product.price).toLocaleString()} (
                            {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off)
                        </p>
                    )}

                    <p className="product-size">Quantity: <span>{product.size}</span></p>

                    <div className="product-border"></div>

                    <p className="product-description">{product.desc}</p>

                    <div className="quantity-row">
                        <span className="qty-title">Quantity:</span>

                        <div className="product-quantity-box">
                            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>

                    <div className="product-cart-row">
                        <button className="product-add-cart"><FiShoppingCart /> Add to Cart</button>
                        <button className="product-heart-icon"><FiHeart /></button>
                        <button className="product-share-btn"><FiShare2 /></button>
                    </div>

                    <div className="product-info-grid">
                        <div className="product-info-desc">
                            <img src={shipping} alt="" />Free shipping above ₹2000
                        </div>
                        <div className="product-info-desc">
                            <img src={authentic} alt="" />Authentic guarantee
                        </div>
                        <div className="product-info-desc">
                            <img src={returns} alt="" />7-day return policy
                        </div>
                        <div className="product-info-desc">
                            <img src={quality} alt="" />Premium quality
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-desc">
                <div className="product-auth-tabs">
                    <button
                        className={tab === "details" ? "active" : ""}
                        onClick={() => setTab("details")}
                    >
                        Details
                    </button>
                    <button
                        className={tab === "ingredients" ? "active" : ""}
                        onClick={() => setTab("ingredients")}
                    >
                        Ingredients
                    </button>
                    <button
                        className={tab === "reviews" ? "active" : ""}
                        onClick={() => setTab("reviews")}
                    >
                        Reviews
                    </button>
                </div>

                {tab === "details" && (
                    <div className="product-auth-form">
                        <div className="description">
                            <h4>Frangrance Notes</h4>
                            <div className="inner-desc">
                                <div className="notes">
                                    <h6>Top Notes</h6>
                                    <p>Rose, Bergamot</p>
                                </div>
                                <div className="notes">
                                    <h6>Middle Notes</h6>
                                    <p>Oud, Jasmine</p>
                                </div>
                                <div className="notes">
                                    <h6>Base Notes</h6>
                                    <p>Amber, Sandalwood, Musk</p>
                                </div>
                            </div>
                        </div>

                        <div className="product-border"></div>

                        <div className="product-information">
                            <h4>Product Information</h4>
                            <ul>
                                <li>Volume: {product.size}</li>
                                <li>Category: {product.category}</li>
                                <li>Long-lasting fragrance</li>
                                <li>Alcohol-free formula</li>
                                <li>Suitable for all skin types</li>
                            </ul>
                        </div>
                    </div>
                )}

                {tab === "ingredients" && (
                    <div className="product-auth-form">
                        <div className="ingredients-desc">
                            <h4>Key Ingredients</h4>
                            <p className="ingredients-desc-p">Saffron, Rose Petals, White Musk, Cedarwood</p>
                            <p className="ingredients-p">Our attars are crafted using traditional methods with the finest natural ingredients sourced from around the world.</p>
                            <p className="ingredients-p">Each fragrance is carefully blended to ensure longevity and exceptional quality.</p>
                        </div>
                    </div>
                )}

                {tab === "reviews" && (
                    <div className="product-auth-form">
                        <div className="reviews-header">
                            <h4>Customer Reviews</h4>
                            <button className="write-review-btn">Write a Review</button>
                        </div>

                        <div className="review-item">
                            <div className="review-top">
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map((s, i) => (
                                        <FaStar key={i} className={s <= 4 ? "star filled" : "star"} />
                                    ))}
                                </div>

                                <span className="reviewer-name">Satisfied Customer</span>
                                <span className="review-time">2 days ago</span>
                            </div>

                            <p className="review-text">
                                Absolutely love this fragrance! The quality is exceptional and the scent lasts all day. Highly recommend to anyone looking for premium attars.
                            </p>

                            <div className="review-divider"></div>
                        </div>

                        <div className="review-item">
                            <div className="review-top">
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map((s, i) => (
                                        <FaStar key={i} className={s <= 4 ? "star filled" : "star"} />
                                    ))}
                                </div>

                                <span className="reviewer-name">Satisfied Customer</span>
                                <span className="review-time">2 days ago</span>
                            </div>

                            <p className="review-text">
                                Absolutely love this fragrance! The quality is exceptional and the scent lasts all day. Highly recommend to anyone looking for premium attars.
                            </p>

                            <div className="review-divider"></div>
                        </div>

                        <div className="review-item">
                            <div className="review-top">
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map((s, i) => (
                                        <FaStar key={i} className={s <= 4 ? "star filled" : "star"} />
                                    ))}
                                </div>

                                <span className="reviewer-name">Satisfied Customer</span>
                                <span className="review-time">2 days ago</span>
                            </div>

                            <p className="review-text">
                                Absolutely love this fragrance! The quality is exceptional and the scent lasts all day. Highly recommend to anyone looking for premium attars.
                            </p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default ProductDetails;