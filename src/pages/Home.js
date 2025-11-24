import Footer from "../components/Footer/Footer";
import FragranceCollection from "../components/FragranceCollection/FragranceCollection";
import HeroSection from "../components/HeroSection/HeroSection";
import Navbar from "../components/Navbar/Navbar";
import Story from "../components/Story/Story";

const Home = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FragranceCollection />
            <Story />
            <Footer />
        </>
    )
}

export default Home;