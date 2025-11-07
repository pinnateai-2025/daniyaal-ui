import "./HeroSection.css";
import { FiArrowRight, FiPlay } from "react-icons/fi";

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>Luxury <span>Attars</span></h1>
                <h3>Crafted to Perfection</h3>
                <p>
                    Experience the finest collection of traditional and modern <br /> fragrances,
                    where heritage meets contemporary elegance.
                </p>
                <div className="hero-button">
                    <button className="collection-btn">
                        Explore Collection <FiArrowRight className="btn-icon" />
                    </button>
                    <button className="our-story-btn">
                        <FiPlay className="btn-icon" /> Our Story
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;