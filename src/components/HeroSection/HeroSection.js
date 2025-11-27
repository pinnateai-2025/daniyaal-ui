import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import heroVideo from "../../assets/hero-video.mp4";

const HeroSection = () => {

    const navigate = useNavigate();

    return (
        <section className="hero-section">
            <video className="hero-video" autoPlay loop muted playsInline>
                <source src={heroVideo} type="video/mp4" />
            </video>
            <div className="hero-content">
                <h1>Luxury <span>Attars</span></h1>
                <h3>Crafted to Perfection</h3>
                <p>
                    Experience the finest collection of traditional and modern <br /> fragrances,
                    where heritage meets contemporary elegance.
                </p>
                <div className="hero-button">
                    <button
                        className="collection-btn"
                        onClick={() => navigate("/products")}
                    >
                        Explore Collection <FiArrowRight className="btn-icon" />
                    </button>

                    <button
                        className="our-story-btn"
                        onClick={() => navigate("/our-story")}
                    >
                        <FiPlay className="btn-icon" /> Our Story
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;