import { motion } from "framer-motion";
import { Code, Wrench, ShoppingCart, GraduationCap, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const divisions = [
  {
    icon: ShoppingCart,
    title: "E Zone Technologies",
    subtitle: "Complete IT Hardware & Technology Supply",
    path: "/technologies",
    services: [
      "Laptops & Desktops",
      "Printers & Scanners",
      "CCTV & Security Systems",
      "Networking Equipment",
      "Computer Accessories",
      "UPS & Power Backup Solutions",
    ],
    highlights: ["Genuine Products", "Warranty Support", "Competitive Pricing"],
  },
  {
    icon: Wrench,
    title: "E Zone Repair Center",
    subtitle: "Professional Hardware & Electronic Repair",
    path: "/repair-center",
    services: [
      "Laptop Repair (Chip-level)",
      "Desktop & Motherboard Repair",
      "Printer Repair",
      "CCTV System Maintenance",
      "Power Supply Diagnostics",
      "Hardware Upgrades (RAM, SSD, GPU)",
    ],
    highlights: ["Professional Tools", "Industry-Standard", "Expert Technicians"],
  },
  {
    icon: Code,
    title: "E Zone IT Solutions",
    subtitle: "Smart Software for Smart Businesses",
    path: "/it-solutions",
    services: [
      "Custom Software Development",
      "POS Systems",
      "Institute Management Systems",
      "HR & Payroll Systems",
      "Web Application Development",
      "API Development & Integration",
    ],
    highlights: ["Secure", "Scalable", "User-Friendly", "Business-Oriented"],
  },
  {
    icon: GraduationCap,
    title: "E Zone IT Academy",
    subtitle: "Building Tomorrow's Tech Leaders",
    path: "/it-academy",
    services: [
      "Full-Stack Web Development",
      "Hardware & Networking",
      "Graphic Design & UI/UX",
      "Microsoft Office Suite",
      "Cybersecurity Fundamentals",
      "Industry Certification Prep",
    ],
    highlights: ["Hands-on Training", "Expert Instructors", "Job-Ready Skills"],
  },
];

const Divisions = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-widest uppercase">Our Divisions</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Four Pillars of <span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Software, hardware, repair, and education — everything your business needs, under one brand.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {divisions.map((div, i) => (
            <motion.div
              key={div.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-glow hover:shadow-glow transition-all duration-500 cursor-pointer"
              onClick={() => navigate(div.path)}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-brand flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{div.title}</h3>
              <p className="text-sm text-primary mb-6">{div.subtitle}</p>

              <ul className="space-y-2 mb-6">
                {div.services.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-glow">
                {div.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    <Check size={12} /> {h}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Divisions;
