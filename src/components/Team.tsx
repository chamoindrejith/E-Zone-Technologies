import { motion } from "framer-motion";

import executiveDirector from "@/assets/team/executive director.png";
import managerBusinessDevelopment from "@/assets/team/Manager - Buisness Development.jpeg";
import traineeAccountant from "@/assets/team/Trainee Accountant.jpeg";
import seniorDeveloper from "@/assets/team/Senior Full Stack Developer IT Solutions.png";
import projectManager from "@/assets/team/Project Manager - IT Solutions.jpeg";
import salesExec1 from "@/assets/team/Sales Executive.jpeg";
import salesExec2 from "@/assets/team/Sales Executive 2.jpeg";
import coordinator from "@/assets/team/Coordinator Repair Center.jpg";
import technician1 from "@/assets/team/Technician Repair Center.jpeg";
import technician2 from "@/assets/team/Technician Repair Center 2.jpeg";
import technician3 from "@/assets/team/Technician Repair Center.jpg";


interface TeamMember {
  name: string;
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
      { name: "Milinda Rathnayake", role: "Executive Director", image: executiveDirector },
    ],
  },
  {
    department: "Management",
    members: [
      { name: "Dulaj Nawarathne", role:  "Manager - Business Development", image: managerBusinessDevelopment },
      { name: "Mewni Upuldeniya", role: "Trainee Accountant", image: traineeAccountant },
    ],
  },
  {
    department: "E-Zone IT Solutions",
    members: [
      { name: "Maleesha Aththanayake", role: "Senior Full Stack Developer", image: seniorDeveloper },
      { name: "Chamodi Indrejith", role: "Project Manager", image: projectManager },
    ],
  },
  {
    department: "E-Zone Technologies",
    members: [
      { name: "Ishara Malinda", role: "Sales Executive", image: salesExec1 },
      { name: "Prabhash Dananjaya", role: "Sales Executive", image: salesExec2 },
    ],
  },
  {
    department: "E-Zone Repair Center",
    members: [
      { name: "Nuwan Sajith", role: "Technical Coordinator", image: coordinator },
      { name: "Pattrishiya Thamari", role: "Technician", image: technician1 },
      { name: "Hasitha Viduranga", role: "Technician", image: technician2 },
      { name: "Heshan Chamidu", role: "Technician", image: technician3 },
    ],
  },
  // {
  //   department: "E-Zone IT Academy",
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
            The talented people behind E-Zone's success — passionate about technology and dedicated to excellence.
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
                    key={member.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: mi * 0.1 }}
                    className="group flex flex-col items-center text-center w-48"
                  >
                    <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-glow mb-4 group-hover:border-primary transition-colors duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <h4 className="font-semibold text-foreground">{member.name}</h4>
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
