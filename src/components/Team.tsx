import { motion } from "framer-motion";

import executiveDirector from "@/assets/team/Director.png";
import managerBusinessDevelopment from "@/assets/team/Business Development Manager.png";
import traineeAccountant from "@/assets/team/Trainee Accountant.png";
import seniorDeveloper from "@/assets/team/Developer.png";
import projectManager from "@/assets/team/Project Manager.png";
import salesExec1 from "@/assets/team/Sales Executive 2.png";
import salesExec2 from "@/assets/team/Sales Executive.png";
import coordinator from "@/assets/team/Coordinator.png";
import technician1 from "@/assets/team/Technician.png";
import technician2 from "@/assets/team/Technician 2.png";
import technician3 from "@/assets/team/Technicina 3.png";


interface TeamMember {
  role: string;
  image: string;
}

interface TeamGroup {
  department: string;
  members: TeamMember[];
}

const teamGroups: TeamGroup[] = [
  {
    department: "Executive Leadership",
    members: [
      { role: "Executive Director", image: executiveDirector },
    ],
  },
  {
    department: "Management",
    members: [
      { role:  "Manager - Business Development", image: managerBusinessDevelopment },
      { role: "Trainee Accountant", image: traineeAccountant },
    ],
  },
  {
    department: "E Zone IT Solutions",
    members: [
      { role: "Senior Full Stack Developer", image: seniorDeveloper },
      { role: "Project Manager", image: projectManager },
    ],
  },
  {
    department: "E Zone Technologies",
    members: [
      { role: "Sales Executive", image: salesExec1 },
      { role: "Sales Executive", image: salesExec2 },
    ],
  },
  {
    department: "E Zone Repair Center",
    members: [
      { role: "Technical Coordinator", image: coordinator },
      { role: "Technician", image: technician1 },
      { role: "Technician", image: technician2 },
      { role: "Technician", image: technician3 },
    ],
  },
  // {
  //   department: "E Zone IT Academy",
  //   members: [
  //     { name: "Nimasha Rathnayake", role: "Lead Instructor", image: academyTeam1 },
  //   ],
  // },
];

const Team = () => {
  return (
    <section id="team" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-widest uppercase">Our Team</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Meet Our <span className="text-gradient">Team</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The talented people behind E Zone's success — passionate about technology and dedicated to excellence.
          </p>
        </motion.div>

        <div className="space-y-16 max-w-6xl mx-auto">
          {teamGroups.map((group, gi) => (
            <motion.div
              key={group.department}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-primary mb-6 text-center">{group.department}</h3>
              <div className="flex flex-wrap justify-center gap-8">
                {group.members.map((member, mi) => (
                  <motion.div
                    
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: mi * 0.1 }}
                    className="group flex flex-col items-center text-center w-48"
                  >
                    <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-glow mb-4 group-hover:border-primary transition-colors duration-300">
                      <img
                        src={member.image}
                        alt={member.role}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
