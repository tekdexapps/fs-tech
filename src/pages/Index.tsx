import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServicesCarousel from "@/components/ServicesCarousel";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ServicesCarousel />
      <HorizontalScrollSection />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
