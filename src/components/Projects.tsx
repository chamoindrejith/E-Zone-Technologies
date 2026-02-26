import { motion } from "framer-motion";
import { ExternalLink, Monitor, ShieldCheck, Store, GraduationCap } from "lucide-react";

const projects = [
  {
    icon: Store,
    title: "RetailPro POS System",
    category: "Point of Sale",
    description: "A comprehensive point-of-sale system built for a chain of retail stores in Anuradhapura, featuring real-time inventory tracking, multi-branch support, and automated reporting.",
    tech: ["React", "Node.js", "PostgreSQL"],
  },
  {
    icon: GraduationCap,
    title: "EduManage LMS",
    category: "Education",
    description: "Institute management system for a leading tuition center, managing student enrollment, attendance, grading, and payment processing with parent portal access.",
    tech: ["TypeScript", "REST API", "MySQL"],
  },
  {
    icon: ShieldCheck,
    title: "SecureView CCTV Network",
    category: "Security",
    description: "Enterprise CCTV installation and network configuration for a government institution, including 50+ camera setup with remote monitoring capability.",
    tech: ["Networking", "IP Cameras", "NVR"],
  },
  {
    icon: Monitor,
    title: "PayFlow HR Suite",
    category: "HR & Payroll",
    description: "Full HR and payroll management system for an SME with 200+ employees, automating salary calculations, leave management, and compliance reporting.",
    tech: ["Web App", "Cloud", "API"],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-widest uppercase">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A selection of solutions we've delivered for businesses across Sri Lanka.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-glow hover:shadow-glow transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-glow flex items-center justify-center">
                  <project.icon size={20} className="text-primary" />
                </div>
                <ExternalLink size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xs font-mono text-accent tracking-wider uppercase">{project.category}</span>
              <h3 className="text-lg font-bold text-foreground mt-1 mb-3">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                    {t}
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

export default Projects;
