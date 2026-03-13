import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Globe, Clock, MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const intent = queryParams.get("intent");

    if (intent !== "purchase") {
      return;
    }

    const productName = queryParams.get("productName") || "N/A";
    const sku = queryParams.get("sku") || "N/A";
    const brand = queryParams.get("brand") || "N/A";
    const status = queryParams.get("status") || "N/A";
    const price = queryParams.get("price") || "N/A";

    const purchaseMessage = [
      "Hi E Zone Team,",
      "",
      "I am interested in purchasing this product:",
      `Product Name: ${productName}`,
      `SKU: ${sku}`,
      `Brand: ${brand}`,
      `Status: ${status}`,
      `Price: ${price}`,
      "",
      "Please contact me with the next steps.",
    ].join("\n");

    setFormData((prev) => ({
      ...prev,
      message: purchaseMessage,
    }));
    setResult("");
  }, [location.search]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target.name === "phone"
        ? e.target.value.replace(/\D/g, "").slice(0, 10)
        : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.phone)) {
      setResult("Phone number must be exactly 10 digits.");
      return;
    }

    setIsSubmitting(true);
    setResult("Sending...");

    const formDataToSend = new FormData();

    // Web3Forms required access key
    formDataToSend.append("access_key", "48da1015-a157-43bd-ac49-d99a90f4eb98");

    // Optional subject line
    formDataToSend.append("subject", "New Contact Message from E Zone Website");

    // Optional: sender name in the email title/body
    formDataToSend.append("from_name", "E Zone Website Contact Form");

    // Your form fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("message", formData.message);

    // Honeypot anti-spam field
    formDataToSend.append("botcheck", "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setResult(data.message || "Something went wrong.");
      }
    } catch (error) {
      setResult("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <span className="text-xs font-mono text-primary tracking-widest uppercase">
            Get in Touch
          </span>
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
              { icon: Phone, label: "E Zone Technologies", value: "071 781 1111 / 071 381 1111" },
              { icon: Phone, label: "E Zone Repair Center", value: "071 071 7777" },
              { icon: Phone, label: "E Zone IT Solutions", value: "071 871 1100" },
              { icon: Mail, label: "Email", value: "ezonetechnologies01@gmail.com" },
              { icon: Globe, label: "Website", value: "www.ezonetechnologies.lk" },
              { icon: MapPin, label: "Location", value: "Anuradhapura, Sri Lanka" },
              { icon: Clock, label: "Hours", value: "Mon–Sat: 8:30 AM – 6:00 PM" },
            ].map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-glow"
              >
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
            onSubmit={onSubmit}
          >
            {/* Hidden botcheck field */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-glow text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="yourname@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-glow text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="0712345678"
                required
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-glow text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Message
              </label>
              <textarea
                rows={4}
                name="message"
                required
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-glow text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-gradient-brand text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {result && (
              <p className="text-sm text-center text-muted-foreground">
                {result}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;