import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Divisions from "@/components/Divisions";
import WhyChooseUs from "@/components/WhyChooseUs";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Divisions />
      <WhyChooseUs />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
