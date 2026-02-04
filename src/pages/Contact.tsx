import { motion } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Mail, MapPin, Phone, Send, MessageCircle, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "jyotiverma85190@gmail.com",
    description: "We'll respond within 24 hours",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 7440493953",
    description: "Mon-Fri, 9AM-6PM IST",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Bhopal, India",
    description: "Tech Park, Whitefield",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

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
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                We'd Love to{" "}
                <span className="gradient-text">Hear From You</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Have a question about our courses? Need help with your learning journey? 
                We're here to help you succeed.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative glass-panel-strong p-6 text-center cursor-pointer group overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_200%] animate-gradient-x"></div>
                    <div className="absolute inset-[1px] rounded-lg bg-background"></div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl"></div>

                  <div className="relative z-10">
                    <motion.div
                      className={`w-14 h-14 rounded-xl ${info.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <info.icon className={`w-6 h-6 ${info.color} group-hover:scale-110 transition-transform duration-300`} />
                    </motion.div>
                    <motion.h3
                      className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {info.title}
                    </motion.h3>
                    <motion.p
                      className="text-foreground font-medium mb-1 group-hover:text-foreground transition-colors duration-300"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {info.value}
                    </motion.p>
                    <motion.p
                      className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      {info.description}
                    </motion.p>
                  </div>

                  {/* Cursor Effect - Custom Cursor */}
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      className="absolute w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-panel-strong p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Send us a message</h2>
                    <p className="text-sm text-muted-foreground">We'll get back to you soon</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-12 px-4 rounded-lg glass-panel border-border/50 bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-12 px-4 rounded-lg glass-panel border-border/50 bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-12 px-4 rounded-lg glass-panel border-border/50 bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg glass-panel border-border/50 bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>
                  <Button type="submit" variant="premium" size="lg" className="w-full group">
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </motion.div>

              {/* Info Side */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="glass-panel p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Response Time</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    We typically respond to all inquiries within 24 hours during business days. 
                    For urgent matters, please call us directly.
                  </p>
                </div>

                <div className="glass-panel p-6">
                  <h3 className="font-semibold mb-4">Frequently Asked</h3>
                  <div className="space-y-4">
                    {[
                      "How do I access my enrolled courses?",
                      "Can I get a refund if I'm not satisfied?",
                      "Do you offer certificates upon completion?",
                      "Are there any prerequisites for courses?",
                    ].map((faq, index) => (
                      <p key={index} className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                        → {faq}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
