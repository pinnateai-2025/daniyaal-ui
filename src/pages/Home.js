import FragranceCollection from "../components/FragranceCollection/FragranceCollection";
import HeroSection from "../components/HeroSection/HeroSection";
import Navbar from "../components/Navbar/Navbar";
import OurStory from "../components/OurStory/OurStory";

const Home = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FragranceCollection />
            <OurStory />
            {/* <StayInLoop /> */}
            {/* <Footer /> */}
        </>
    )
}

export default Home;