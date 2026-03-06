import { motion } from "framer-motion";
import { Layers, Users, MapPin, TrendingUp, DollarSign, Headphones } from "lucide-react";

const reasons = [
  { icon: Layers, title: "One-Stop Solution", desc: "Software + Hardware + Repair under one brand" },
  { icon: Users, title: "Experienced Team", desc: "Skilled technicians and developers" },
  { icon: MapPin, title: "Local Support", desc: "Based in Anuradhapura, always accessible" },
  { icon: TrendingUp, title: "Digital Transformation", desc: "Business-focused technology adoption" },
  { icon: DollarSign, title: "Transparent Pricing", desc: "No hidden costs, fair and competitive" },
  { icon: Headphones, title: "After-Sales Service", desc: "Continuous support and maintenance" },
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-widest uppercase">Why E-Zone</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Why Choose <span className="text-gradient">Us</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-card/50 border border-glow hover:bg-card transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <r.icon size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
