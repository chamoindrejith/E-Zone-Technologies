import { motion } from "framer-motion";
import { ArrowRight, Cpu, Shield, Wrench } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
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
        <div className="max-w-4xl">
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
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Empowering Businesses{" "}
            <br />
            <span className="text-gradient">Through Technology</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Complete technology solutions under one roof — from custom software
            and hardware supply to expert repair services.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-brand text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow"
            >
              Explore Services <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-glow text-foreground font-semibold hover:bg-secondary transition-colors"
            >
              Contact Us
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-glow"
          >
            {[
              { icon: Cpu, label: "IT Solutions", desc: "Custom Software" },
              { icon: Wrench, label: "Repair Center", desc: "Chip-Level Repair" },
              { icon: Shield, label: "Hardware Supply", desc: "Genuine Products" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-glow flex items-center justify-center">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
