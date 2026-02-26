import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-widest uppercase">About Us</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Who We <span className="text-gradient">Are</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            E-Zone Technologies (Pvt) Ltd is built on a simple vision — to deliver complete
            technology solutions under one roof. From software systems to hardware supply and
            advanced repair services, we provide end-to-end IT solutions tailored for Sri Lankan businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-card border border-glow shadow-glow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Target className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To provide reliable, affordable, and innovative technology solutions that help
              businesses grow efficiently.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-card border border-glow shadow-glow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
              <Eye className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become the leading regional IT solutions provider in Sri Lanka by delivering
              integrated digital and hardware solutions with excellence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
