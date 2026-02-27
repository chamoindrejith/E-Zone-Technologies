import { motion } from "framer-motion";
import { ArrowLeft, Wrench, ExternalLink, CheckCircle, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  "Laptop Repair (Chip-level)",
  "Desktop & Motherboard Repair",
  "Printer Repair & Servicing",
  "CCTV System Maintenance",
  "Power Supply Diagnostics",
  "Hardware Upgrades (RAM, SSD, GPU)",
  "Data Recovery Services",
  "Network Troubleshooting",
];

const RepairCenter = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-24 px-6">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              E-Zone <span className="text-gradient">Repair Center</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Professional hardware and electronic repair services with expert technicians and industry-standard tools.
            </p>
          </motion.div>

          {/* Check Repair Status CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <a
              href="https://ezonepos.com/repair-status"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-brand text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow text-lg"
            >
              <Clock size={22} />
              Check Your Repair Status
              <ExternalLink size={18} />
            </a>
          </motion.div>

          {/* Services */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-card border border-glow hover:shadow-glow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Wrench size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{service}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: Shield, title: "Expert Technicians", desc: "Certified professionals with years of experience in chip-level repairs." },
              { icon: CheckCircle, title: "Quality Guarantee", desc: "All repairs come with warranty and quality assurance." },
              { icon: Clock, title: "Fast Turnaround", desc: "Quick diagnostics and efficient repair timelines." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-card border border-glow text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-brand flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RepairCenter;
