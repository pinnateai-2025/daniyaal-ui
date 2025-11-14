import Footer from "../components/Footer/Footer";
import FragranceCollection from "../components/FragranceCollection/FragranceCollection";
import HeroSection from "../components/HeroSection/HeroSection";
import Navbar from "../components/Navbar/Navbar";
import Story from "../components/Story/Story";
import StayInLoop from "../components/StayInLoop/StayInLoop";

const Home = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FragranceCollection />
            <Story />
            <StayInLoop />
            <Footer />
        </>
    )
}

export default Home;