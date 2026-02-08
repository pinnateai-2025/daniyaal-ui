import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { FiCreditCard, FiTruck, FiCheckCircle } from "react-icons/fi";
import { MdOutlinePayments } from "react-icons/md";

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const { createOrder, processCOD, createRazorpayOrder, verifyOrderPayment } = useOrder();
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("razorpay");
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    const shipping = subtotal >= 2000 ? 0 : 150;
    const total = subtotal + shipping;

    useEffect(() => {
        if (!token) {
            navigate("/cart");
            alert("Please login to checkout");
        }
        if (cart.length === 0 && !orderId) {
            navigate("/products");
        }
    }, [token, cart, orderId, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        const fullAddress = `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`;

        // Normalize items for backend
        const orderItems = cart.map(item => ({
            product_id: item.id || item.productId,
            productId: item.id || item.productId,
            quantity: item.quantity || 1,
            price: item.price
        }));

        const orderData = {
            items: orderItems,
            totalAmount: total,
            address: fullAddress,
            phone: address.phone,
            paymentMethod
        };

        console.log("Creating order with data:", orderData);
        const res = await createOrder(orderData);

        if (res.success) {
            console.log("Order created successfully:", res.data);
            const newOrderId = res.data.id || res.data.orderId || (res.data.order && res.data.order.id);
            if (!newOrderId) {
                console.error("No order ID found in response:", res.data);
                alert("Order created but failed to retrieve ID. Please contact support.");
                setLoading(false);
                return;
            }
            setOrderId(newOrderId);

            if (paymentMethod === "cod") {
                const codRes = await processCOD(newOrderId);
                if (codRes.success) {
                    clearCart();
                    alert("Order placed successfully via COD!");
                    navigate("/profile"); // Assuming profile shows orders
                } else {
                    alert("Failed to process COD. Please try again.");
                }
            } else {
                // Razorpay logic
                const razorRes = await createRazorpayOrder(total);
                if (razorRes.success) {
                    const isLoaded = await loadRazorpay();
                    if (!isLoaded) {
                        alert("Razorpay SDK failed to load. Are you online?");
                        setLoading(false);
                        return;
                    }

                    const options = {
                        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_your_key",
                        amount: total * 100,
                        currency: "INR",
                        name: "DANIYAAL PERFUMERY",
                        description: "Fragrance Purchase",
                        order_id: razorRes.data.id,
                        handler: async (response) => {
                            const verifyRes = await verifyOrderPayment({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderId: newOrderId
                            });
                            if (verifyRes.success) {
                                clearCart();
                                alert("Payment successful and order placed!");
                                navigate("/profile");
                            } else {
                                alert("Payment verification failed.");
                            }
                        },
                        prefill: {
                            name: user.name,
                            email: user.email,
                            contact: address.phone,
                        },
                        theme: {
                            color: "#D4AF37",
                        },
                    };

                    const rzp1 = new window.Razorpay(options);
                    rzp1.open();
                }
            }
        } else {
            alert(res.message || "Failed to create order");
        }
        setLoading(false);
    };

    return (
        <div className="checkout-container">
            <div className="checkout-wrapper">
                <h1 className="checkout-title">Complete Your <span>Purchase</span></h1>

                <div className="checkout-grid">
                    <form className="checkout-form" onSubmit={handlePlaceOrder}>
                        <div className="form-section">
                            <h3><FiTruck /> Shipping Address</h3>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="street"
                                    placeholder="Street Address"
                                    required
                                    value={address.street}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-row">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    required
                                    value={address.city}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    required
                                    value={address.state}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-row">
                                <input
                                    type="text"
                                    name="zipCode"
                                    placeholder="ZIP / Postal Code"
                                    required
                                    value={address.zipCode}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    required
                                    value={address.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3><FiCreditCard /> Payment Method</h3>
                            <div className="payment-options">
                                <label className={`payment-option ${paymentMethod === "razorpay" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="razorpay"
                                        checked={paymentMethod === "razorpay"}
                                        onChange={() => setPaymentMethod("razorpay")}
                                    />
                                    <div className="option-content">
                                        <MdOutlinePayments />
                                        <span>Pay Online (Razorpay)</span>
                                    </div>
                                </label>
                                <label className={`payment-option ${paymentMethod === "cod" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={paymentMethod === "cod"}
                                        onChange={() => setPaymentMethod("cod")}
                                    />
                                    <div className="option-content">
                                        <FiTruck />
                                        <span>Cash on Delivery</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="place-order-btn" disabled={loading}>
                            {loading ? "Processing..." : paymentMethod === "razorpay" ? "Pay & Place Order" : "Place Order"}
                        </button>
                    </form>

                    <div className="order-summary-sidebar">
                        <div className="summary-card">
                            <h3>Order Summary</h3>
                            <div className="summary-items">
                                {cart.map((item) => (
                                    <div key={item.id} className="summary-item">
                                        <div className="item-info">
                                            <p className="item-name">{item.name}</p>
                                            <p className="item-qty">Qty: {item.quantity || 1}</p>
                                        </div>
                                        <p className="item-price">₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? <span className="free">Free</span> : `₹${shipping}`}</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total">
                                <span>Total Amount</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>

                            <div className="security-note">
                                <FiCheckCircle />
                                <p>Secure SSL encrypted transaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
