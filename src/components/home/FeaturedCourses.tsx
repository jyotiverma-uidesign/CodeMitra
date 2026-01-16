import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, Clock, Users, Star, BookOpen } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Python Fundamentals",
    description: "Master Python from basics to advanced concepts with hands-on projects and real-world applications.",
    image: "🐍",
    level: "Beginner",
    duration: "8 weeks",
    students: "12.5K",
    rating: 4.9,
    color: "from-emerald-500 to-teal-600",
    tag: "Most Popular",
  },
  {
    id: 2,
    title: "JavaScript Developer",
    description: "Become a JavaScript expert with modern ES6+, DOM manipulation, and async programming.",
    image: "⚡",
    level: "Intermediate",
    duration: "10 weeks",
    students: "9.8K",
    rating: 4.8,
    color: "from-yellow-500 to-orange-600",
    tag: "Trending",
  },
  {
    id: 3,
    title: "Full-Stack Web Development",
    description: "Build complete web applications with React, Node.js, MongoDB, and modern deployment practices.",
    image: "🚀",
    level: "Advanced",
    duration: "16 weeks",
    students: "7.2K",
    rating: 4.9,
    color: "from-primary to-neon-cyan",
    tag: "Premium",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const FeaturedCourses = () => {
  return (
    <section className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-panel text-sm font-medium text-primary mb-4">
            Featured Courses
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Industry-Ready{" "}
            <span className="gradient-text">Learning Paths</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Structured courses designed by industry experts to transform beginners into job-ready developers.
          </p>
        </motion.div>

        {/* Course Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="glass-panel-strong p-6 h-full flex flex-col card-hover">
                {/* Tag */}
                <div className="absolute -top-3 right-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-linear-to-r ${course.color} text-white shadow-lg`}>
                    {course.tag}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${course.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {course.image}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 grow">
                  {course.description}
                </p>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-neon-cyan" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link to={`/courses/${course.id}`}>
                  <Button variant="outline" className="w-full group/btn">
                    View Course
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/courses">
            <Button variant="premium" size="lg" className="group">
              Explore All Courses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
