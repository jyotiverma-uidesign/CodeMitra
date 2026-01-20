import { motion } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Heart, Users, Award } from "lucide-react";
import { Helmet } from "react-helmet-async";

const values = [
  {
    icon: Target,
    title: "Mission-Driven Learning",
    description:
      "Our mission is to make frontend development and coding education practical, structured, and accessible for beginners.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Heart,
    title: "Student-Centered Approach",
    description:
      "We focus on real learning outcomes by prioritizing clarity, practice, and long-term skill development.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Users,
    title: "Developer Community",
    description:
      "Code Mitra encourages collaborative learning through peer support and community-driven growth.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Award,
    title: "Quality & Excellence",
    description:
      "Every course is designed with modern frontend standards, best practices, and industry relevance.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
];

const team = [
  { name: "Jyoti Verma", role: "Founder & Frontend Developer", emoji: "👩‍💻" },
  { name: "Nitesh Rajpoot", role: "Curriculum Strategist", emoji: "👨‍🏫" },
  { name: "Vimlesh Bdoliya", role: "Lead Frontend Instructor", emoji: "👨‍🎓" },
  { name: "Rinki Kushwah", role: "Community Manager", emoji: "👩‍💼" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Code Mitra | Learn Frontend & Coding Skills</title>
        <meta
          name="description"
          content="Code Mitra is a modern coding education platform focused on frontend development, web fundamentals, and practical learning. Learn HTML, CSS, JavaScript, React, and modern frontend workflows with hands-on projects."
        />
        <meta
          name="keywords"
          content="Code Mitra, About, frontend development, learn coding, JavaScript, React, HTML, CSS, web development courses"
        />
        <link rel="canonical" href="https://codemitra.in/about" />

        {/* JSON-LD Structured Data for Google Rich Results */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Code Mitra",
            "url": "https://codemitra.in",
            "logo": "https://codemitra.in/logo.png",
            "sameAs": [
              "https://www.linkedin.com/company/codemitra",
              "https://github.com/codemitra"
            ],
            "description": "Code Mitra provides industry-ready coding education and frontend development courses for beginners and aspiring developers."
          }
          `}
        </script>

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="About Code Mitra | Learn Frontend & Coding Skills" />
        <meta property="og:description" content="Code Mitra helps beginners and aspiring developers learn HTML, CSS, JavaScript, React, and modern frontend workflows with hands-on projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codemitra.in/about" />
        <meta property="og:image" content="https://codemitra.in/hero-banner.png" />
        <meta property="og:site_name" content="Code Mitra" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Code Mitra | Learn Frontend & Coding Skills" />
        <meta name="twitter:description" content="Code Mitra helps beginners and aspiring developers learn HTML, CSS, JavaScript, React, and modern frontend workflows with hands-on projects." />
        <meta name="twitter:image" content="https://codemitra.in/hero-banner.png" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-16">
        {/* HERO */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />

          <div className="container mx-auto px-4 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full glass-panel text-sm font-medium text-primary mb-6">
                About Code Mitra
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Building Practical Skills for{" "}
                <span className="gradient-text">Frontend Developers</span>
              </h1>

              <p className="text-lg text-muted-foreground">
                Code Mitra is a modern coding education platform focused on
                frontend development, web fundamentals, and practical learning.
                We help beginners and aspiring developers learn HTML, CSS,
                JavaScript, React, and modern frontend workflows with clarity
                and confidence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MISSION */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our <span className="gradient-text">Mission</span>
                </h2>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Code Mitra was created to bridge the gap between theoretical
                  learning and real-world frontend development skills. We focus
                  on teaching concepts that developers actually use in modern
                  web projects.
                </p>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Our learning approach emphasizes hands-on practice, clean
                  coding standards, responsive design, and performance-focused
                  frontend development aligned with current industry needs.
                </p>

                <Link to="/courses">
                  <Button variant="premium" size="lg" className="group">
                    Explore Frontend Courses
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-panel-strong p-8"
              >
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "Beginner Friendly", label: "Learning Approach" },
                    { value: "Modern Stack", label: "Frontend Technologies" },
                    { value: "Hands-On", label: "Project-Based Learning" },
                    { value: "Career Ready", label: "Skill-Oriented Courses" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-lg md:text-xl font-semibold gradient-text mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-radial opacity-30" />

          <div className="container mx-auto px-4 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Core <span className="gradient-text">Values</span>
              </h2>
              <p className="text-muted-foreground">
                Principles that shape how we teach coding and frontend
                development.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel p-6 text-center card-hover"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mx-auto mb-4`}
                  >
                    <value.icon className={`w-6 h-6 ${value.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="gradient-text">Team</span>
              </h2>
              <p className="text-muted-foreground">
                Developers and mentors dedicated to teaching modern frontend
                skills.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel-strong p-6 text-center card-hover"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl mx-auto mb-4">
                    {member.emoji}
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
