import AccordionSection from "../components/AccordionSection";
import Banner from "../components/Banner";
import FeaturedFoods from "../components/FeaturedFoods";
import WhyChooseUs from "../components/WhyChooseUs";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedFoods></FeaturedFoods>
            <WhyChooseUs></WhyChooseUs>
            <AccordionSection></AccordionSection>
        </div>
    );
};

export default Home;