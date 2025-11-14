import "./Story.css";
import { FiArrowRight } from "react-icons/fi";
import perfumeImg1 from "../../assets/perfume1.jfif"; 
import perfumeImg2 from "../../assets/perfume4.jpg"; 

const OurStory = () => {
    return (
        <section className="ourstory-section">
            <div className="ourstory-container">
                <div className="ourstory-text">
                    <h2 className="ourstory-title">
                        The Art of <span>Perfumery</span>
                    </h2>
                    <p className="ourstory-desc">
                        For generations, Daniyaal Perfumery has been at the forefront of
                        luxury fragrance creation, blending traditional attar-making
                        techniques with contemporary artistry. Each bottle tells a story of
                        passion, heritage, and uncompromising quality.
                    </p>
                    <p className="ourstory-desc">
                        Our master perfumers source the finest ingredients from around the
                        world, creating unique compositions that capture emotions, memories,
                        and dreams in every drop.
                    </p>
                    <button className="ourstory-btn">
                        Discover Our Story <FiArrowRight className="ourstory-icon" />
                    </button>
                </div>

                <div className="ourstory-image">
                    <img src={perfumeImg1} alt="Premium Perfume" />
                    <img src={perfumeImg2} alt="Premium Perfume" className="ourstory-image2" />
                </div>
            </div>
        </section>
    );
};

export default OurStory;
