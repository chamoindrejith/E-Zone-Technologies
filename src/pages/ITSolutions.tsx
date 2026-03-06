import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code, Globe, Database, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";

const services = [
  { icon: Code, title: "Custom Software Development", desc: "Tailored software solutions to streamline your business operations." },
  { icon: Globe, title: "Web Application Development", desc: "Modern, responsive web apps built with cutting-edge technologies." },
  { icon: Database, title: "POS & Management Systems", desc: "Point-of-sale, HR, payroll, and institute management systems." },
  { icon: Smartphone, title: "API Development & Integration", desc: "Seamless API integrations to connect your systems and services." },
];

const ITSolutions = () => {
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
            className="mb-8"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              E-Zone <span className="text-gradient">IT Solutions</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-6">
              Smart software for smart businesses. We build secure, scalable, and user-friendly solutions.
            </p>
            <a
              href="https://ezoneitsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-brand text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow"
            >
              Visit Our Website
              <ExternalLink size={18} />
            </a>
          </motion.div>

          {/* Services */}
          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-xl bg-card border border-glow hover:shadow-glow transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-brand flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <service.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </motion.div>

              

            ))}
          </div>
          <Projects/>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ITSolutions;
