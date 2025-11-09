import Footer from "../components/Footer/Footer";
import FragranceCollection from "../components/FragranceCollection/FragranceCollection";
import HeroSection from "../components/HeroSection/HeroSection";
import Navbar from "../components/Navbar/Navbar";
import OurStory from "../components/OurStory/OurStory";
import StayInLoop from "../components/StayInLoop/StayInLoop";

const Home = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FragranceCollection />
            <OurStory />
            <StayInLoop />
            <Footer />
        </>
    )
}

export default Home;