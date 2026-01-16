import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/home/HeroSection";
import { FeaturedCourses } from "../components/home/FeaturedCourses";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { CTASection } from "../components/home/CTASection";
const Index = () => {
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsxs("main", { children: [_jsx(HeroSection, {}), _jsx(FeaturedCourses, {}), _jsx(FeaturesSection, {}), _jsx(TestimonialsSection, {}), _jsx(CTASection, {})] }), _jsx(Footer, {})] }));
};
export default Index;
