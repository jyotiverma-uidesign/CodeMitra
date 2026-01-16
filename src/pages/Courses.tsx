import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Users,
  Star,
  BookOpen,
  Search,
  Filter,
} from "lucide-react";
import { courses, Course } from "../data/Courses";

// ================= ANIMATION =================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ================= COMPONENT =================
const Courses = () => {
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setAppliedSearch(searchInput.trim());
    }
  };

  // ================= FILTER + SORT =================
  const filteredCourses = courses.filter((course) => {
    if (!appliedSearch) return true;

    const term = appliedSearch.toLowerCase();
    return (
      course.title.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term) ||
      course.category.toLowerCase().includes(term) ||
      course.pricing.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* ================= HEADER ================= */}
        <section className="relative py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Explore Our <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Learn from beginner to advanced with free and premium courses.
            </p>

            <div className="flex gap-4 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  placeholder="Search courses (free, paid, python...)"
                  className="w-full h-12 pl-12 pr-4 rounded-xl glass-panel text-black"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <Button variant="glass">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* ================= COURSES GRID ================= */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCourses.map((course: Course) => (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  className="glass-panel-strong p-6 flex flex-col"
                >
                  {/* Free / Paid Badge */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full mb-3 w-fit
                      ${
                        course.pricing === "Free"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                  >
                    {course.pricing} Course
                  </span>

                  {/* Category */}
                  <span className="text-xs text-muted-foreground mb-3">
                    {course.category}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-3xl mb-4`}
                  >
                    {course.image}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {course.description}
                  </p>

                  {/* Meta Info */}
                  <div className="grid grid-cols-2 gap-3 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {course.level}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      {course.rating}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to={`/courses/${course.id}`} state={{ course }}>
                    <Button
                      variant={course.pricing === "Free" ? "secondary" : "outline"}
                      className="w-full"
                    >
                      {course.pricing === "Free" ? "Start Free" : "View Course"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
