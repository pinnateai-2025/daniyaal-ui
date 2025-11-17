import "./Gift.css";
import { FaStar } from "react-icons/fa";
import gift from "../../assets/gift.png";
import star from "../../assets/star.png";
import box from "../../assets/box.png";
import birthday from "../../assets/birthday.png";
import anniversary from "../../assets/anniversay.png";
import festival from "../../assets/festival.png";
import corporate from "../../assets/corporate.png";
import gift1 from "../../assets/gift1.jfif";
import img1 from "../../assets/img1.jfif";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const Gift = () => {
    return (
        <div className="gifts">
            <div className="gifts-title">
                <div className="gifts-wrapper">
                    <img src={gift} alt="chat" />
                </div>
                <h1>
                    Luxury <span>Gift Sets</span>
                </h1>
                <p>
                    Share the gift of luxury with our carefully curated fragrance collections. Perfect
                    <br /> for every occasion, beautifully presented, and unforgettable.
                </p>
            </div>

            <div className="curated-collection">
                <div className="curated-collection-title">
                    <h3>
                        Curated <span>Collections</span>
                    </h3>
                </div>

                <div className="curated-grid">
                    {/* CARD 1 */}
                    <div className="gift-card">
                        <div className="gift-img-box">
                            <span className="save-tag">Save ₹1,400</span>
                            <img src={img1} alt="Royal Gift Set" />
                            <span className="box-img"><img src={box} alt="box" /></span>
                        </div>

                        <div className="gift-content">
                            <h2 className="gift-title">Royal Collection Gift Set</h2>

                            <div className="rating">
                                <FaStar /> <span>4.9</span>
                            </div>

                            <p className="gift-desc">
                                A luxurious gift set featuring our three most popular attars in elegant packaging.
                            </p>

                            <div className="included-container">
                                <div className="included-heading">
                                    <img src={star} alt="star" />
                                    <p>What's Included:</p>
                                </div>
                                <div className="included-list">
                                    <ul>
                                        <li>Royal Oud Majestic 12ml</li>
                                        <li>Golden Saffron Elixir 10ml</li>
                                        <li>Velvet Rose Passion 10ml</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="price-block">
                                <h3>₹6,800</h3>
                                <p className="mrp">₹8,200</p>
                                <p className="discount">17% off</p>
                            </div>

                            <div className="curated-btns">
                                <button className="cart-btn"><FiShoppingCart /> Add to Cart</button>
                                <button className="like-btn"><FiHeart /></button>
                            </div>

                            <div className="gift-footer">
                                <img src={gift} alt="gift-icon" />
                                <p>Free luxury gift wrapping included</p>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2 */}
                    <div className="gift-card">
                        <div className="gift-img-box">
                            <span className="save-tag">Save ₹1,100</span>
                            <img src={gift1} alt="Royal Gift Set" />
                            <span className="box-img"><img src={box} alt="box" /></span>
                        </div>

                        <div className="gift-content">
                            <h2 className="gift-title">Premium Discovery Set</h2>

                            <div className="rating">
                                <FaStar /> <span>4.7</span>
                            </div>

                            <p className="gift-desc">
                                Perfect for trying multiple fragrances with our premium selection in travel sizes.
                            </p>

                            <div className="included-container">
                                <div className="included-heading">
                                    <img src={star} alt="star" />
                                    <p>What's Included:</p>
                                </div>
                                <div className="included-list">
                                    <ul>
                                        <li>5 Premium Attars 3ml each</li>
                                        <li>Luxury Gift Box</li>
                                        <li>Fragrance Guide</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="price-block">
                                <h3>₹4,500</h3>
                                <p className="mrp">₹5,600</p>
                                <p className="discount">20% off</p>
                            </div>

                            <div className="curated-btns">
                                <button className="cart-btn"><FiShoppingCart /> Add to Cart</button>
                                <button className="like-btn"><FiHeart /></button>
                            </div>

                            <div className="gift-footer">
                                <img src={gift} alt="gift-icon" />
                                <p>Free luxury gift wrapping included</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="gift-occasion">
                <div className="gift-occasion-title">
                    <h3>Gift Ideas by <span>Occasion</span></h3>
                </div>
                <div className="gift-occasion-grid">
                    <div className="gift-occasion-desc">
                        <img src={birthday} alt="birthday-icon" />
                        <h4>Birthdays</h4>
                        <p className="desc-para1">Celebrate with our signature fragrance collections</p>
                        <p className="desc-para2">Recommended: Royal Collection Gift Set</p>
                    </div>
                    <div className="gift-occasion-desc">
                        <img src={anniversary} alt="anniversary-icon" />
                        <h4>Anniversaries</h4>
                        <p className="desc-para1">Romantic attars for special moments</p>
                        <p className="desc-para2">Recommended: Velvet Rose Passion + Mystic Amber Dreams</p>
                    </div>
                    <div className="gift-occasion-desc">
                        <img src={festival} alt="festival-icon" />
                        <h4>Festivals</h4>
                        <p className="desc-para1">Traditional fragrances for festive celebrations</p>
                        <p className="desc-para2">Recommended: Golden Saffron Elixir</p>
                    </div>
                    <div className="gift-occasion-desc">
                        <img src={corporate} alt="corporate-icon" />
                        <h4>Corporate Gifts</h4>
                        <p className="desc-para1">Premium selections for business relationships</p>
                        <p className="desc-para2">Recommended: Sultan's Secret Blend</p>
                    </div>
                </div>
            </div>

            <div className="custom-gift-service">
                <div className="custom-gift-desc">
                    <h3>Custom Gift <span>Service</span></h3>
                    <p>
                        Create a personalized gift experience with our custom service. Choose your favorite fragrances, add a personal message,
                        and we'll create a beautiful gift package that's as unique as the person receiving it.
                    </p>
                    <div className="custom-gift-list">
                        <ul>
                            <li>Personalized fragrance selection</li>
                            <li>Custom gift message cards</li>
                            <li>Premium packaging options</li>
                            <li>Express delivery available</li>
                        </ul>
                    </div>
                    <button className="custom-gift-btn">Create Custom Gift</button>
                </div>
                <div className="custom-gift-img">
                    <img src={gift1} alt="custom-gift-img" />
                </div>
            </div>

            <div className="perfect-gift">
                <div className="perfect-gift-desc">
                    <h3>Ready to Give the Perfect Gift?</h3>
                    <p>Browse our complete collection or contact us for personalized recommendations.</p>
                </div>
                <div className="perfect-gift-btns">
                    <button className="shop-all">Shop All Products</button>
                    <button className="gift-advice">Get Gift Advice</button>
                </div>
            </div>

        </div>
    )
}

export default Gift;