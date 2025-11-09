import "./FragranceCollection.css";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi";
import perfume1 from "../../assets/perfume1.jfif";
import perfume2 from "../../assets/perfume2.jfif";
import perfume3 from "../../assets/perfume3.jpg";
import perfume4 from "../../assets/perfume4.jpg";

const fragrances = [
    {
        id: 1,
        img: perfume1,
        name: "Royal Oud Majestic",
        desc: "A luxurious blend of premium oud with hints of rose and amber. This fragrance exudes timeless elegance.",
        rating: 4.8,
        reviews: 156,
        price: 2800,
        oldPrice: 3200,
        size: "12ml",
        discount: "₹400",
        category: "Oud"
    },
    {
        id: 2,
        img: perfume2,
        name: "Golden Saffron Elixir",
        desc: "An enchanting attar infused with precious saffron and delicate floral notes.",
        rating: 4.6,
        reviews: 92,
        price: 2200,
        oldPrice: 2600,
        size: "10ml",
        discount: "₹400",
        category: "Floral"
    },
    {
        id: 3,
        img: perfume3,
        name: "Desert Breeze Collection",
        desc: "An exclusive collection inspired by the vast deserts, featuring warm spicy undertones.",
        rating: 4.9,
        reviews: 203,
        price: 3200,
        oldPrice: 3800,
        size: "15ml",
        discount: "₹600",
        category: "Woody"
    },
    {
        id: 4,
        img: perfume4,
        name: "Sultan's Secret Blend",
        desc: "The most exclusive attar in our collection, crafted with rare ingredients and unmatched sophistication.",
        rating: 5,
        reviews: 45,
        price: 4200,
        oldPrice: 4800,
        size: "20ml",
        discount: "₹600",
        category: "Premium"
    },
];

const FragranceCollection = () => {
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
                            <FiHeart className="heart-icon" />
                            <FiShoppingCart className="cart-icon" />
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

                            <h3>{item.name}</h3>
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
                <button className="products-btn">
                    View All Products <FiArrowRight className="products-icon" />
                </button>
            </div>
        </section>
    );
};

export default FragranceCollection;
