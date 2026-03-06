import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap, BookOpen, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const courses = [
  "Computer Hardware & Networking",
  "Software Development Fundamentals",
  "Web Development",
  "Graphic Design & Multimedia",
  "Microsoft Office Suite",
  "Arduino & IoT Projects",
];

const ITAcademy = () => {
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
              E Zone <span className="text-gradient">IT Academy</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Empowering the next generation of IT professionals with hands-on training and industry-relevant courses.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { icon: GraduationCap, label: "Students Trained", value: "100+" },
              { icon: BookOpen, label: "Courses Offered", value: "6+" },
              { icon: Users, label: "Expert Instructors", value: "4+" }
            ].map((stat) => (
              <div key={stat.label} className="p-5 rounded-xl bg-card border border-glow text-center">
                <stat.icon size={24} className="text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Courses */}
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Available <span className="text-gradient">Courses</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={course}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-card border border-glow hover:shadow-glow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{course}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Enroll now for hands-on training</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ITAcademy;
