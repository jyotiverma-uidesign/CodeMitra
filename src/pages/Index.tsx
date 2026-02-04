import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import Hero3D from "../components/Hero3D";
import { FeaturedCourses } from "../components/home/FeaturedCourses";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { CTASection } from "../components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero3D />
        <FeaturedCourses />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
