import Image from "next/image";
import { Users, Code, GraduationCap, Cpu } from "lucide-react";

const teamMembers = [
  {
    name: "Shubham Kumar",
    role: "Team Manager",
    designation: "CSE 4th Year Student",
    email: "shubham@busyloss.com",
    image: "/Shubham.jpeg",
    skills: ["Full-Stack", "Architecture", "Product"]
  },
  {
    name: "Gaurav Kumar",
    role: "Core Developer",
    designation: "CSE 4th Year Student",
    email: "gaurav@busyloss.com",
    image: "/gaurav.jpeg",
    skills: ["React", "Next.js", "UI/UX"]
  },
  {
    name: "Rishabh Kumar",
    role: "System Engineer",
    designation: "CSE 4th Year Student",
    email: "rishabh@busyloss.com",
    image: "/rishabh.jpeg",
    skills: ["Database", "Backend", "Performance"]
  },
  {
    name: "Mayur Girase",
    role: "Frontend Specialist",
    designation: "CSE 4th Year Student",
    email: "mayur@busyloss.com",
    image: "/mayur.jpeg",
    skills: ["CSS", "Animations", "Design"]
  }
];

export function TeamSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-slate-50 dark:bg-slate-900/50 -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-x-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-full mb-4">
            <Cpu className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Innovation Powered</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-indigo-500">TechSpark</span> Team
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
            A dedicated group of CSE 4th year students building the next generation of software registries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group relative bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-[1.5rem] overflow-hidden border-4 border-slate-50 dark:border-slate-800 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{member.name}</h3>
                <p className="text-xs font-black text-[#2563EB] uppercase tracking-[0.2em]">{member.role}</p>
                <p className="text-[10px] text-slate-400 font-bold lowercase tracking-tight pt-1">{member.email}</p>
                
                <div className="flex items-center justify-center gap-x-1 pt-2">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">{member.designation}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {member.skills.map(skill => (
                  <span key={skill} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[8px] font-black uppercase tracking-widest rounded-lg border border-slate-100 dark:border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
