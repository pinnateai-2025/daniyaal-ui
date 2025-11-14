import "./OurJourney.css";
import JourneyBeginning from "../../assets/about-img.jfif";
import img1 from "../../assets/img1.jfif";
import img2 from "../../assets/img2.jfif";
import img3 from "../../assets/img3.jfif";
import img4 from "../../assets/img4.jpeg";
import img5 from "../../assets/img5.jfif";
import scent1 from "../../assets/scent1.jfif";
import scent2 from "../../assets/scent2.jfif";

const OurJourney = () => {
    return (
        <div className="ourjourney">
            <div className="ourjourney-title">
                <h1>
                    Our <span>Journey</span>
                </h1>
                <p>
                    From a small attar workshop to a renowned perfumery, our story is one of
                    <br /> passion, dedication, and an unwavering commitment to excellence.
                </p>
            </div>

            <div className="ourjourney-beginning">
                <div className="journey-beginning">
                    <div className="journey-beginning-img">
                        <img src={JourneyBeginning} alt="JourneyBeginning" />
                    </div>

                    <div className="journey-beginning-desc">
                        <p className="the-beginning">The Beginning</p>
                        <h3>Where It All Started</h3>
                        <p>
                            In the narrow lanes of Kannauj, the perfume capital of India, a young artisan named
                            Daniyaal Ahmed had a dream. Surrounded by the intoxicating aromas of traditional
                            attar-making, he envisioned creating fragrances that would capture the very essence
                            of human emotions.
                        </p>
                        <p>
                            With nothing but passion and a small inheritance from his grandfather—a master perfumer
                            himself—Daniyaal began his journey. He spent years learning the ancient techniques,
                            understanding the subtle art of blending, and developing his signature style that would
                            eventually define Daniyaal Perfumery.
                        </p>
                        <p>
                            What started as a small workshop has grown into a legacy, but our core values remain
                            unchanged: authenticity, quality, and the belief that fragrance is poetry in liquid
                            form.
                        </p>
                    </div>
                </div>
            </div>

            <div className="timeline-section">
                <h1 className="timeline-heading">
                    Milestones of <span>Excellence</span>
                </h1>

                <div className="timeline-grid">

                    {/* LEFT TEXT — RIGHT IMAGE */}
                    <div className="timeline-card text-card">
                        <span className="year-badge">1985</span>
                        <h3>The Beginning</h3>
                        <p>
                            Founded by master perfumer Daniyaal Ahmed with a vision to create the finest attars
                            using traditional methods.
                        </p>
                    </div>

                    <div className="timeline-image">
                        <img src={img1} alt="milestone" />
                    </div>

                    {/* LEFT IMAGE — RIGHT CARD */}
                    <div className="timeline-image">
                        <img src={img2} alt="milestone" />
                    </div>

                    <div className="timeline-card text-card">
                        <span className="year-badge">1992</span>
                        <h3>First Recognition</h3>
                        <p>
                            Our signature Rose Oud blend won the prestigious Fragrance Excellence Award,
                            establishing our reputation.
                        </p>
                    </div>

                    {/* LEFT CARD — RIGHT IMAGE */}
                    <div className="timeline-card text-card">
                        <span className="year-badge">2005</span>
                        <h3>Expansion</h3>
                        <p>
                            Opened our flagship store and began sourcing rare ingredients from across the globe.
                        </p>
                    </div>

                    <div className="timeline-image">
                        <img src={img3} alt="milestone" />
                    </div>

                    {/* LEFT IMAGE — RIGHT CARD */}
                    <div className="timeline-image">
                        <img src={img4} alt="milestone" />
                    </div>

                    <div className="timeline-card text-card">
                        <span className="year-badge">2018</span>
                        <h3>Digital Revolution</h3>
                        <p>
                            Launched our online presence, bringing luxury attars to fragrance enthusiasts
                            worldwide.
                        </p>
                    </div>

                    {/* LEFT CARD — RIGHT IMAGE */}
                    <div className="timeline-card text-card">
                        <span className="year-badge">2024</span>
                        <h3>Innovation Continues</h3>
                        <p>
                            Today, we continue to innovate while honoring our heritage, creating fragrances
                            for the modern connoisseur.
                        </p>
                    </div>

                    <div className="timeline-image">
                        <img src={img5} alt="milestone" />
                    </div>
                </div>
            </div>

            <div className="art-of-scent">
                <div className="scent-desc">
                    <p className="our-philosophy">Our Philosophy</p>
                    <h3>The Art of Scent</h3>
                    <p>
                        We believe that fragrance is an invisible art form—one that speaks directly to the soul
                        without words. Each attar we create is a carefully orchestrated symphony of notes,
                        designed to evoke emotions, trigger memories, and create new experiences.
                    </p>
                    <p>
                        Our approach combines the wisdom of ancient perfumery traditions with modern understanding
                        of fragrance chemistry. We don't just make perfumes; we craft olfactory journeys that
                        transport you to different times and places.
                    </p>
                    <div className="scent-points">
                        <ul>
                            <li>Traditional techniques</li>
                            <li>Premium ingredients</li>
                            <li>Artisan craftsmanship</li>
                            <li>Modern innovation</li>
                        </ul>
                    </div>
                </div>
                <div className="scent-img">
                    <img src={scent1} alt="scent1" />
                    <img src={scent2} alt="scent2" className="scent-img2" />
                </div>
            </div>

            <div className="looking-ahead">
                <div className="looking-ahead-desc">
                    <h3>Looking Ahead</h3>
                    <p>
                        As we continue our journey, we remain committed to our founding principles while embracing
                        new technologies and sustainable practices. Our vision is to make luxury fragrances accessible
                        to fragrance lovers around the world, while preserving the artisanal traditions that make each
                        bottle truly special.
                    </p>
                </div>
                <div className="looking-ahead-stats">
                    <div className="stats">
                        <h4>39+</h4>
                        <p>Years of Excellence</p>
                    </div>
                    <div className="stats">
                        <h4>50+</h4>
                        <p>Unique Fragrances</p>
                    </div>
                    <div className="stats">
                        <h4>10K+</h4>
                        <p>Happy Customers</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurJourney;
