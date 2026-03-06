import { motion } from "framer-motion";
import { Phone, Mail, Globe, Clock, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-widest uppercase">Get in Touch</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Contact <span className="text-gradient">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to transform your business with technology? Reach out to us today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {[
              { icon: Phone, label: "Hotline", value: "071 871 1111" },
              { icon: Phone, label: "E Zone Technologies", value: "071 781 1111 / 071 381 1111 1" },
              { icon: Phone, label: "E Zone Repair Center", value: "071 071 7777" },
              { icon: Phone, label: "E Zone IT Solutions", value: "071 871 1100" },
              { icon: Mail, label: "Email", value: "ezonetechnologies01@gmail.com" },
              { icon: Globe, label: "Website", value: "www.ezonetechnologies.lk" },
              { icon: MapPin, label: "Location", value: "Anuradhapura, Sri Lanka" },
              { icon: Clock, label: "Hours", value: "Mon–Sat: 8:30 AM – 6:00 PM" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-glow">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-card border border-glow shadow-glow-sm space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-glow text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-glow text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-glow text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-brand text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
