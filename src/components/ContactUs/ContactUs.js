import { useState, useRef, useEffect } from "react";
import "./ContactUs.css";
import { FaChevronDown } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa";
import location from "../../assets/location.png";
import call from "../../assets/call.png";
import email from "../../assets/email.png";
import clock from "../../assets/clock.png";
import chat from "../../assets/chat.png";
import phone from "../../assets/phone.png";
import order from "../../assets/order.png";

const ContactUs = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Select a subject");

    const dropdownRef = useRef();

    const subjects = [
        "General Inquiry",
        "Product Information",
        "Order Support",
        "Custom Fragrance",
        "Business Partnership",
        "Feedback & Suggestions"
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="contact-us">

            {/* Title Section */}
            <div className="contact-title">
                <h1>
                    Get in <span>Touch</span>
                </h1>
                <p>
                    Have questions about our fragrances? Need personalized recommendations?
                    <br />Our fragrance experts are here to help you find your perfect scent.
                </p>
            </div>

            <div className="contact-container">

                {/* LEFT SIDE CONTACT INFO */}
                <div className="contact-info">
                    <div className="info-card">
                        <div className="info-header">
                            <div className="icon-circle">
                                <img src={location} alt="location" />
                            </div>
                            <h3>Visit Our Store</h3>
                        </div>

                        <p>
                            123 Fragrance Street<br />
                            Kannauj, Uttar Pradesh<br />
                            India 209725
                        </p>
                    </div>

                    <div className="info-card">
                        <div className="info-header">
                            <div className="icon-circle">
                                <img src={call} alt="call" />
                            </div>
                            <h3>Call Us</h3>
                        </div>

                        <p>
                            +91 98765 43210<br />
                            +91 98765 43211<br />
                            Mon-Sat: 9AM-8PM
                        </p>
                    </div>

                    <div className="info-card">
                        <div className="info-header">
                            <div className="icon-circle">
                                <img src={email} alt="email" />
                            </div>
                            <h3>Email Us</h3>
                        </div>

                        <p>
                            info@daniyaalperfumery.com<br />
                            support@daniyaalperfumery.com<br />
                            Response within 24 hours
                        </p>
                    </div>

                    <div className="info-card">
                        <div className="info-header">
                            <div className="icon-circle">
                                <img src={clock} alt="clock" />
                            </div>
                            <h3>Store Hours</h3>
                        </div>

                        <div className="store-hours">
                            <div className="row">
                                <span className="day">Monday - Friday</span>
                                <span className="time">9:00 AM – 8:00 PM</span>
                            </div>

                            <div className="row">
                                <span className="day">Saturday</span>
                                <span className="time">9:00 AM – 6:00 PM</span>
                            </div>

                            <div className="row">
                                <span className="day">Sunday</span>
                                <span className="time">10:00 AM – 4:00 PM</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE CONTACT FORM */}
                <div className="contact-form">

                    <h2>Send us a Message</h2>

                    <form>
                        <div className="form-row">
                            <div className="form-field">
                                <label>Full Name *</label>
                                <input type="text" placeholder="Enter your full name" required />
                            </div>

                            <div className="form-field">
                                <label>Email *</label>
                                <input type="email" placeholder="Enter your email" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label>Phone Number</label>
                                <input type="text" placeholder="Enter your phone number" />
                            </div>

                            {/* Custom Dropdown */}
                            <div className="form-field">
                                <label>Subject *</label>

                                <div
                                    className="custom-dropdown"
                                    ref={dropdownRef}
                                >
                                    <div
                                        className="dropdown-header"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <span>{selected}</span>
                                        <FaChevronDown className={isOpen ? "rotate" : ""} />
                                    </div>

                                    {isOpen && (
                                        <div className="dropdown-list">
                                            {subjects.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setSelected(item);
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="form-field">
                            <label>Message *</label>
                            <textarea placeholder="Tell us how we can help you..."></textarea>
                        </div>

                        <button className="send-btn">
                            <FaRegPaperPlane />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            <div className="quick-help">
                <div className="quick-help-title">
                    <h3>Quick <span>Help</span></h3>
                </div>

                <div className="quick-help-container">
                    <div className="quick-help-card">
                        <div className="icon-wrapper">
                            <img src={chat} alt="chat" />
                        </div>
                        <h4>Live Chat</h4>
                        <p>Get instant help from our fragrance experts. Available during business hours.</p>
                        <button>Start Chat</button>
                    </div>

                    <div className="quick-help-card">
                        <div className="icon-wrapper">
                            <img src={phone} alt="phone" />
                        </div>
                        <h4>Phone Support</h4>
                        <p>Speak directly with our customer service team for personalized assistance.</p>
                        <button>Call Now</button>
                    </div>

                    <div className="quick-help-card">
                        <div className="icon-wrapper">
                            <img src={order} alt="order" />
                        </div>
                        <h4>Order Status</h4>
                        <p>Track your order or get updates on shipping and delivery information.</p>
                        <button>Track Order</button>
                    </div>
                </div>
            </div>

            <div className="faqs">
                <h2>
                    Frequently Asked <span>Questions</span>
                </h2>

                <div className="faq-box">
                    <div className="faq-col">
                        <div className="faq-item">
                            <h4>How long do attars last?</h4>
                            <p>Our premium attars are designed to last 8-12 hours on the skin, with some variations depending on skin type and application.</p>
                        </div>

                        <div className="faq-item">
                            <h4>Do you offer custom fragrances?</h4>
                            <p>Yes! We offer bespoke fragrance creation services. Contact us to discuss your requirements with our master perfumers.</p>
                        </div>

                        <div className="faq-item">
                            <h4>What are your shipping charges?</h4>
                            <p>We offer free shipping on orders above ₹2000. Standard shipping charges apply for smaller orders.</p>
                        </div>
                    </div>

                    <div className="faq-col">
                        <div className="faq-item">
                            <h4>Can I return a product?</h4>
                            <p>Yes, we have a 7-day return policy for unopened products. Please check our return policy for detailed terms.</p>
                        </div>

                        <div className="faq-item">
                            <h4>Are your attars alcohol-free?</h4>
                            <p>All our traditional attars are alcohol-free and made using natural oils as carriers, following authentic methods.</p>
                        </div>

                        <div className="faq-item">
                            <h4>Do you ship internationally?</h4>
                            <p>Currently, we ship within India. International shipping is coming soon. Contact us for special arrangements.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ContactUs;
