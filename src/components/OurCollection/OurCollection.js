import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineFormatListBulleted, MdOutlineGridOn } from "react-icons/md";
import { FaChevronDown, FaStar } from "react-icons/fa";
import { PiCheckBold } from "react-icons/pi";
import { FiFilter, FiHeart, FiShoppingCart } from "react-icons/fi";
import "./OurCollection.css";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useCategory } from "../../context/CategoryContext";

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
    stock: true,
    desc: "A premium fragrance crafted with the finest ingredients and traditional techniques for a long-lasting and luxurious experience."
};

const OurCollection = () => {
    const { categories, loading: catLoading } = useCategory();
    const [allFragrances, setAllFragrances] = useState([]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [selectedSort, setSelectedSort] = useState("Featured");
    const [view, setView] = useState("grid");
    const [searchTerm, setSearchTerm] = useState("");

    const { wishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const filterRef = useRef(null);
    const sortRef = useRef(null);

    // Sync allFragrances with categories from API
    useEffect(() => {
        if (categories && categories.length > 0) {
            const apiProducts = categories.map((item, index) => ({
                id: item.id,
                // Cycle through local images if API doesn't provide one
                img: [perfume1, perfume2, perfume3, perfume4][index % 4],
                name: item.name,
                // Content from API or Raw fallback
                desc: item.description || DEFAULT_CARD_DATA.desc,
                category: item.name, // In this structure, category name is used for both filtering and identifying

                // Fields not in API (Filhal raw data me rahega)
                rating: DEFAULT_CARD_DATA.rating,
                reviews: DEFAULT_CARD_DATA.reviews,
                price: DEFAULT_CARD_DATA.price,
                oldPrice: DEFAULT_CARD_DATA.oldPrice,
                size: DEFAULT_CARD_DATA.size,
                discount: DEFAULT_CARD_DATA.discount,
                stock: DEFAULT_CARD_DATA.stock
            }));
            setAllFragrances(apiProducts);
        }
    }, [categories]);

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
    let filteredFragrances = allFragrances.filter((item) => {
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

    if (catLoading && allFragrances.length === 0) {
        return <div className="loading-container">Loading Collection...</div>;
    }

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
                    <div className="collection-search-box">
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
                                    {["All", ...categories.map(c => c.name)].map((item) => (
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
                    Showing {filteredFragrances.length} of {allFragrances.length} products
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
                                    className="ourcollection-cart-icon"
                                    onClick={() => {
                                        addToCart(item);
                                    }}
                                />
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
                                        state={{ product: item, allProducts: allFragrances }}
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
                                        <button className="add-cart-btn" onClick={() => addToCart(item)}>
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
