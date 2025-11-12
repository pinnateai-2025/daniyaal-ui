import "./AboutUs.css";
import OurLegacy from "../../assets/about-img.jfif";
import { LiaCertificateSolid } from "react-icons/lia";
import { FaRegHeart } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { RiGlobalLine } from "react-icons/ri";

const AboutUs = () => {
    return (
        <div className="about">
            <div className="about-title">
                <h1>About <span>Daniyaal Perfumery</span></h1>
                <p>
                    Where tradition meets innovation, and every fragrance tells a story
                    of heritage, <br /> craftsmanship, and the timeless art of perfumery.
                </p>
            </div>
            <div className="about-desc">
                <div className="about-our-legacy">
                    <h3>Our Legacy</h3>
                    <p>
                        Founded with a passion for creating exceptional fragrances, Daniyaal Perfumery
                        has been at the forefront of luxury attar and perfume creation. Our journey
                        began with a simple belief: that fragrance is more than just a scent—it's a
                        memory, an emotion, a story waiting to be told.
                    </p>
                    <p>Each of our attars is meticulously crafted using time-honored techniques passed
                        down through generations, combined with modern innovation to create fragrances
                        that are both timeless and contemporary.
                    </p>
                    <p>We source the finest raw materials from around the world—from the sacred agarwood
                        of Southeast Asia to the precious saffron of Kashmir—ensuring that every bottle
                        embodies purity, quality, and luxury.
                    </p>
                </div>
                <div className="about-our-img">
                    <img src={OurLegacy} alt="" />
                </div>
            </div>
            <div className="about-our-values">
                <div className="our-values-title">
                    <h3>Our Values</h3>
                </div>
                <div className="our-values-container">
                    <div className="our-values">
                        <LiaCertificateSolid />
                        <h6>Quality Excellence</h6>
                        <p>
                            We never compromise on quality. Every ingredient is carefully selected
                            and every process meticulously monitored.
                        </p>
                    </div>
                    <div className="our-values">
                        <FaRegHeart />
                        <h6>Passion</h6>
                        <p>
                            Our love for fragrance drives everything we do. It's not just business—it's
                            our calling and our art.
                        </p>
                    </div>
                    <div className="our-values">
                        <LuUsers />
                        <h6>Craftsmanship</h6>
                        <p>
                            Our master perfumers blend traditional techniques with modern innovation
                            to create unique compositions.
                        </p>
                    </div>
                    <div className="our-values">
                        <RiGlobalLine />
                        <h6>Heritage</h6>
                        <p>
                            We honor the rich tradition of attar-making while embracing innovation
                            for the modern connoisseur.
                        </p>
                    </div>
                </div>
            </div>
            <div className="about-our-artisans">
                <div className="our-artisans-title">
                    <h3>Meet Our Artisans</h3>
                </div>
                <div className="our-artisans-container">
                    <div className="our-artisans">
                        <h5>MA</h5>
                        <h6>Master Ahmad</h6>
                        <p>Chief Perfumer</p>
                        <p>
                            With over 30 years of experience, Master Ahmad leads our fragrance creation with
                            unparalleled expertise in traditional attar-making.
                        </p>
                    </div>
                    <div className="our-artisans">
                        <h5>SF</h5>
                        <h6>Sophia Francis</h6>
                        <p>Fragrance Specialist</p>
                        <p>
                            Sophia brings modern innovation to traditional techniques, creating unique blends
                            that appeal to contemporary tastes.
                        </p>
                    </div>
                    <div className="our-artisans">
                        <h5>RK</h5>
                        <h6>Rajesh Kumar</h6>
                        <p>Quality Assurance</p>
                        <p>
                            Rajesh ensures every product meets our highest standards, maintaining the quality
                            that Daniyaal Perfumery is known for.
                        </p>
                    </div>
                </div>
            </div>
            <div className="about-our-mission">
                <h3>Our Mission</h3>
                <p>
                    To preserve and celebrate the ancient art of perfumery while creating modern masterpieces
                    that touch souls, evoke memories, and inspire dreams. We believe that every person deserves
                    to wear a fragrance that tells their unique story - one that is as distinctive and precious
                    as they are.
                </p>
            </div>
        </div>
    )
}

export default AboutUs;