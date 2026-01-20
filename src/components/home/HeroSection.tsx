import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      aria-label="Code Mitra Frontend Development Learning Platform"
      className="relative min-h-screen text-white flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" aria-hidden="true" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl floating" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-cyan/15 rounded-full blur-3xl floating" style={{ animationDelay: "-3s" }} aria-hidden="true" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-neon-pink/10 rounded-full blur-3xl floating" style={{ animationDelay: "-1.5s" }} aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <header className="max-w-5xl mx-auto text-center">
          
          {/* TRUST BADGE (SEO SAFE) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-muted-foreground">
              Learn modern coding with industry-focused guidance
            </span>
          </motion.div>

          {/* ✅ PRIMARY SEO H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Frontend Development & Coding Courses by{" "}
            <span className="gradient-text">Code Mitra</span>
          </motion.h1>

          {/* ✅ SEO-OPTIMIZED DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Code Mitra is a modern coding and frontend development learning platform.
            Master HTML, CSS, JavaScript, React JS, and full-stack fundamentals through
            hands-on projects, real-world examples, and practical frontend workflows
            designed for beginners and aspiring developers.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/courses" aria-label="Explore frontend development courses">
              <Button variant="premium" size="xl" className="group">
                Start Learning Frontend
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link to="/about" aria-label="Learn more about Code Mitra platform">
              <Button variant="glass" size="xl" className="group">
                <Play className="w-5 h-5" aria-hidden="true" />
                Platform Overview
              </Button>
            </Link>
          </motion.div>

          {/* TRUST STATS (SEO NEUTRAL) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { value: "Beginner Friendly", label: "Structured Learning Path" },
              { value: "Modern Stack", label: "HTML • CSS • JS • React" },
              { value: "Hands-On", label: "Project-Based Practice" },
              { value: "Career Ready", label: "Frontend Skills Focused" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass-panel p-4 md:p-6"
              >
                <div className="text-base md:text-lg font-semibold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </header>
      </div>

      {/* Bottom Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent"
        aria-hidden="true"
      />
    </section>
  );
};
