import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Monitor, Wrench, Code, GraduationCap, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const divisions = [
  { label: "E-Zone Technologies", icon: Monitor, path: "/technologies", color: "from-primary to-accent" },
  { label: "E-Zone Repair Center", icon: Wrench, path: "/repair-center", color: "from-primary to-accent" },
  { label: "E-Zone IT Solutions", icon: Code, path: "/it-solutions", color: "from-primary to-accent" },
  { label: "E-Zone IT Academy", icon: GraduationCap, path: "/it-academy", color: "from-primary to-accent" },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-dark opacity-80" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="container mx-auto px-6 relative z-10 pt-24">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow bg-secondary/50 mb-8">
              <span className="w-2 h-2 rounded-full bg-gradient-brand animate-pulse-glow" />
              <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
                Anuradhapura, Sri Lanka
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4"
          >
            E-Zone <span className="text-gradient">Technologies</span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-medium">(Pvt) Ltd</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-foreground font-semibold mb-2"
          >
            Your Trusted Technology Partner
          </motion.p>

          {/* Redragon Authorized Dealer Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-glow shadow-glow-sm">
              <Shield size={18} className="text-accent" />
              <span className="text-sm font-semibold text-foreground">
                Redragon <span className="text-gradient">Authorized Dealer</span>
              </span>
            </div>
          </motion.div>

          {/* Division Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {divisions.map((div, i) => (
              <motion.button
                key={div.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                onClick={() => navigate(div.path)}
                className="group flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-glow hover:shadow-glow hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div.icon size={22} className="text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold text-foreground text-center leading-tight">
                  {div.label}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-brand text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
