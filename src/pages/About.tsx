import { motion } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Heart, Users, Award } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to making quality coding education accessible to everyone, regardless of their background.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Heart,
    title: "Student-First",
    description: "Every decision we make is guided by what's best for our students and their learning journey.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in the power of community and peer learning to accelerate growth.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from course content to student support.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
];

const team = [
  { name: "Jyoti verma", role: "Founder & CEO", emoji: "👨‍💻" },
  { name: "Nitesh Rajpoot", role: "Head of Curriculum", emoji: "👩‍🏫" },
  { name: "Vimlesh Bdoliya", role: "Lead Instructor", emoji: "👨‍🎓" },
  { name: "Rinki Kushwah", role: "Community Manager", emoji: "👩‍💼" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
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
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Empowering the Next Generation of{" "}
                <span className="gradient-text">Developers</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Code Mitra was founded with a simple mission: to make quality coding education 
                accessible to everyone. We believe that anyone can learn to code with the right 
                guidance and support.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
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
                  We started Code Mitra in 2022 with a vision to bridge the gap between 
                  traditional education and industry requirements. Our founders, themselves 
                  self-taught developers, understood the struggles of learning to code without 
                  proper guidance.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Today, we've helped over 50,000 students transform their careers and land 
                  jobs at top tech companies. Our curriculum is continuously updated to reflect 
                  the latest industry trends and technologies.
                </p>
                <Link to="/courses">
                  <Button variant="premium" size="lg" className="group">
                    Explore Courses
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
                    { value: "50K+", label: "Students" },
                    { value: "100+", label: "Courses" },
                    { value: "95%", label: "Success Rate" },
                    { value: "50+", label: "Countries" },
                  ].map((stat, index) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
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
                Our <span className="gradient-text">Values</span>
              </h2>
              <p className="text-muted-foreground">
                The principles that guide everything we do at Code Mitra.
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
                  <div className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className={`w-6 h-6 ${value.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet Our <span className="gradient-text">Team</span>
              </h2>
              <p className="text-muted-foreground">
                The passionate individuals behind Code Mitra.
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
