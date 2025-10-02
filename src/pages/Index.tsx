import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import Navigation from "@/components/Navigation";
import ServicesCarousel from "@/components/ServicesCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ServicesCarousel />
      <HorizontalScrollSection />
      {/* <Services /> */}
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
