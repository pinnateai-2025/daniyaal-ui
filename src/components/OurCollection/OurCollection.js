import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineFormatListBulleted, MdOutlineGridOn } from "react-icons/md";
import { FaChevronDown, FaStar } from "react-icons/fa";
import { PiCheckBold } from "react-icons/pi";
import { FiFilter, FiHeart, FiShoppingCart } from "react-icons/fi";
import "./OurCollection.css";
import { Link } from "react-router-dom";

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
        category: "Oud",
        stock: true
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
        category: "Floral",
        stock: true
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
        category: "Woody",
        stock: true
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
        category: "Premium",
        stock: true
    },
    {
        id: 5,
        img: perfume4,
        name: "Mystic Amber Dreams",
        desc: "The most exclusive attar in our collection, crafted with rare ingredients and unmatched sophistication.",
        rating: 4.7,
        reviews: 78,
        price: 1800,
        oldPrice: 2200,
        size: "8ml",
        discount: "₹400",
        category: "Oriental",
        stock: true
    },
    {
        id: 6,
        img: perfume4,
        name: "Velvet Rose Passion",
        desc: "A romantic floral scent capturing the essence of fresh roses and soft musk.",
        rating: 4.5,
        reviews: 134,
        price: 2000,
        size: "10ml",
        category: "Floral",
        stock: true
    },
    {
        id: 7,
        img: perfume4,
        name: "Himalayan Breeze",
        desc: "A crisp and refreshing attar inspired by the cool Himalayan winds.",
        rating: 4.4,
        reviews: 67,
        price: 1600,
        oldPrice: 1900,
        size: "8ml",
        discount: "₹300",
        category: "Fresh",
        stock: true
    },
    {
        id: 8,
        img: perfume4,
        name: "Midnight Jasmine",
        desc: "A deep floral attar with intoxicating jasmine notes blended with soft musk.",
        rating: 4.6,
        reviews: 88,
        price: 1900,
        oldPrice: 2300,
        size: "9ml",
        discount: "₹400",
        category: "Floral",
        stock: false
    },
];

const OurCollection = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [selectedSort, setSelectedSort] = useState("Featured");
    const [view, setView] = useState("grid");
    const [searchTerm, setSearchTerm] = useState("");

    const filterRef = useRef(null);
    const sortRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Filter and search logic combined
    let filteredFragrances = fragrances.filter((item) => {
        const matchesCategory =
            selectedFilter === "All" ||
            item.category.toLowerCase() === selectedFilter.toLowerCase();

        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Sorting logic
    switch (selectedSort) {
        case "Name A-Z":
            filteredFragrances = [...filteredFragrances].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;

        case "Price: Low to High":
            filteredFragrances = [...filteredFragrances].sort((a, b) => a.price - b.price);
            break;

        case "Price: High to Low":
            filteredFragrances = [...filteredFragrances].sort((a, b) => b.price - a.price);
            break;

        case "Customer Rating":
            filteredFragrances = [...filteredFragrances].sort((a, b) => b.rating - a.rating);
            break;

        default:
            break;
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 499) {
                setView("grid");
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="ourcollection">
            <div className="ourcollection-title">
                <h1>
                    Our <span>Collection</span>
                </h1>
                <p>
                    Discover our complete range of luxury attars and perfumes, each <br />
                    crafted with the finest ingredients and traditional techniques.
                </p>
            </div>

            {/* Filter Bar */}
            <div className="collection-filter-container">
                <div className="collection-filter-bar">
                    <div className="search-box">
                        <FiSearch className="icon" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="dropdowns">
                        {/* Filter Dropdown */}
                        <div className="dropdown" ref={filterRef}>
                            <button
                                className="filter-btn"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <FiFilter /> {selectedFilter}{" "}
                                <FaChevronDown color="#71717A" size={14} />
                            </button>
                            {isFilterOpen && (
                                <div className="dropdown-menu">
                                    {[
                                        "All",
                                        "Oud",
                                        "Floral",
                                        "Oriental",
                                        "Woody",
                                        "Fresh",
                                        "Premium",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="dropdown-item"
                                            onClick={() => {
                                                setSelectedFilter(item);
                                                setIsFilterOpen(false);
                                            }}
                                        >
                                            {item}{" "}
                                            {selectedFilter === item && (
                                                <PiCheckBold className="dropdown-check" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="dropdown" ref={sortRef}>
                            <button
                                className="sort-btn"
                                onClick={() => setIsSortOpen(!isSortOpen)}
                            >
                                {selectedSort}{" "}
                                <FaChevronDown color="#71717A" size={14} />
                            </button>
                            {isSortOpen && (
                                <div className="dropdown-menu">
                                    {[
                                        "Featured",
                                        "Name A-Z",
                                        "Price: Low to High",
                                        "Price: High to Low",
                                        "Customer Rating",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="dropdown-item"
                                            onClick={() => {
                                                setSelectedSort(item);
                                                setIsSortOpen(false);
                                            }}
                                        >
                                            {item}{" "}
                                            {selectedSort === item && (
                                                <PiCheckBold
                                                    style={{
                                                        float: "right",
                                                        color: "#000",
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className={`view-toggle ${window.innerWidth <= 499 ? "hide" : ""}`}>
                        <button
                            className={`grid ${view === "grid" ? "active" : ""}`}
                            onClick={() => setView("grid")}
                        >
                            <MdOutlineGridOn />
                        </button>
                        <button
                            className={`list ${view === "list" ? "active" : ""}`}
                            onClick={() => setView("list")}
                        >
                            <MdOutlineFormatListBulleted />
                        </button>
                    </div>
                </div>

                {/* Product Count */}
                <p className="product-count">
                    Showing {filteredFragrances.length} of {fragrances.length} products
                </p>
            </div>

            {/* Product Grid / List */}
            <div
                className={`ourcollection-fragrance-container ${view === "list" ? "list-view" : "grid-view"
                    }`}
            >
                {filteredFragrances.length > 0 ? (
                    filteredFragrances.map((item) => (
                        <div
                            key={item.id}
                            className={`ourcollection-fragrance-card ${view === "list" ? "list" : "grid"
                                }`}
                        >
                            <div className="ourcollection-card-image">
                                <img src={item.img} alt={item.name} />

                                {item.oldPrice && item.discount && (
                                    <span className="ourcollection-discount-badge">
                                        Save {item.discount}
                                    </span>
                                )}

                                {!item.stock && (
                                    <span
                                        className={`ourcollection-outofstock ${view === "list" ? "list" : "grid"
                                            }`}
                                    >
                                        Out of Stock
                                    </span>
                                )}

                                <FiHeart className="ourcollection-heart-icon" />
                                <FiShoppingCart className="ourcollection-cart-icon" />
                            </div>

                            <div className="ourcollection-card-content">
                                <div className="ourcollection-rating-collection">
                                    <div className="ourcollection-rating">
                                        <FaStar className="ourcollection-star-icon" />
                                        <span>{item.rating}</span>
                                        <p>({item.reviews} reviews)</p>
                                    </div>
                                    <div className="ourcollection-collection">
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

                                <p className="ourcollection-desc">{item.desc}</p>

                                <div className="ourcollection-price-row">
                                    <div className="ourcollection-price">
                                        <h2>₹{item.price.toLocaleString()}</h2>
                                        {item.oldPrice && (
                                            <span className="ourcollection-old-price">
                                                ₹{item.oldPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="ourcollection-size">{item.size}</div>
                                </div>

                                {view === "list" && (
                                    <div className="ourcollection-list-buttons">
                                        <button className="view-details-btn">
                                            View Details
                                        </button>
                                        <button className="add-cart-btn">
                                            <FiShoppingCart /> Add to Cart
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-products-found">
                        <h3>No products found</h3>
                        <p>Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </div>

            <div className="ourcollection-button">
                <button>Load More Products</button>
            </div>
        </div>
    );
};

export default OurCollection;
