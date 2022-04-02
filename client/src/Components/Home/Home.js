import { Box } from "@material-ui/core";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import TeamMembers from "./TeamMembers";
import FAQSection from "./FAQSection";
import ContactUs from "./ContactUs";
import Testimonials from "./Testimonials";
import { useEffect } from "react";
import ProductSection from "./ProductSection";

const Home = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    return (
        <Box>
            {/* All the section inside the home page */}
            <HeroSection />
            <AboutSection />
            <TeamMembers />
            <Testimonials />
            <ProductSection />
            <FAQSection />
            <ContactUs />
        </Box>
    );
};

export default Home;
