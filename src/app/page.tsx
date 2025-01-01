'use client';

import { useState } from 'react';
import { Skill, Project } from '@/types';
import { Code, Database, Server, Layout, Terminal, Brain, Shield } from 'lucide-react';
import { TypeWriter } from '@/components/about/TypeWriter';
import { ProfileImage } from '@/components/about/ProfileImage';
import { ReadMore } from '@/components/about/ReadMore';
import { Timeline } from '@/components/about/Timeline';
import { SkillCard } from '@/components/skills/SkillCard';
import { SkillFilter } from '@/components/skills/SkillFilter';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilter } from '@/components/projects/ProjectFilter';
import { ContactForm } from '@/components/contact/ContactForm';
import { SocialLinks } from '@/components/contact/SocialLinks';
import { Projects } from '@/app/projects/Projects';

const Skills: Skill[] = [
  {
    name: "Next.js Frontend Development",
    category: "Frontend",
    icon: <Layout className="text-blue-500" />,
    description: "Building responsive web applications with modern frameworks",
    experience: "1 year"
  },
  {
    name: "JavaScript Backend Development",
    category: "Backend",
    icon: <Server className="text-green-500" />,
    description: "Creating robust server-side applications",
    experience: "1 year"
  },
  {
    name: "Supabase Database Management",
    category: "Database",
    icon: <Database className="text-teal-500" />,
    description: "Working with and maintaining a Supabase database for consumer applications",
    experience: "1 year"
  },
  {
    name: "MySQL Database Management",
    category: "Database",
    icon: <Database className="text-teal-500" />,
    description: "Working with and maintaining MySQL databases for personal projects",
    experience: "1 year"
  },
  {
    name: "AI/ML Software Engineering",
    category: "AI/ML",
    icon: <Brain className="text-purple-500" />,
    description: "Creating and integrating artificial intelligence tools into business models",
    experience: "1 year"
  },
  {
    name: "DevOps",
    category: "DevOps",
    icon: <Terminal className="text-orange-500" />,
    description: "WIP",
    experience: ">1 year"
  },
  {
    name: "Cybersecurity",
    category: "Cybersecurity",
    icon: <Shield className="text-red-500" />,
    description: "WIP",
    experience: ">1 year"
  },
  {
    name: "GitHub",
    category: "Tools",
    icon: <Code className="text-yellow-500" />,
    description: "WIP",
    experience: "1 year"
  },
];

const TimelineItems = [
  {
    id: 1,
    title: "Computer Science",
    role: "Bachelor of Science in Computer Science",
    organization: "University of Texas at Arlington",
    startDate: "2021",
    endDate: "2026",
    description: "Studying computer science with focus on artifical intellgence and a certification in cybersecurity.",
    type: "education" as const,
    skills: ["Data Structures", "Algorithms", "Computer Organization and Assembly", "Databases", "Software Project Management",
       "Cybersecurity", "Web Development", "C/C++ Progamming Language", "Java Progamming Language", "Python Progamming Language"]
  },
  {
    id: 2,
    title: "AI Engineer Intern",
    role: "AI & Fullstack Developer",
    organization: "Tabflow",
    startDate: "2024",
    endDate: "Present",
    description: "Building and integrating practical and responsive artificial intelligence tools into business models.",
    type: "experience" as const,
    skills: ["Artificial Intelligence", "React", "Next.js", "TypeScript", "Supabase"]
  },
];

export default function Home() {
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(Skills);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(Projects);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* navigation */}  
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex flex-col">
              <span className="text-xl font-bold gradient-text">Ali Jifi-Bahlool</span>
              <span className="text-xs text-gray-600 dark:text-gray-300">Full Stack Developer & AI Engineer</span>
            </div>
            <div className="flex-1 flex max-w-xl justify-center px-4 items-center text-center">
              <span className="text-xs text-gray-600 dark:text-gray-300">Please execuse my dust! 
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  As I improve and add to this website, there will be some missing or work in progress elements!
                </div>
              </span>
            </div>
            <div className="hidden md:flex gap-6 text-gray-700">
              <a href="#About" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
              <a href="#Skills" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</a>
              <a href="#Projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a>
              <a href="#Contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* about section */}
      <section id="About" className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ProfileImage />
            <div className="flex-1 text-gray-700 dark:text-gray-300">
              <TypeWriter text="Howdy! I'm a Computer Science student passionate about AI/ML responsibility and safety, data science, and cybersecurity.
              I enjoy building projects and applications that benefit others!" />
              <ReadMore 
                shortText="I specialize in fullstack development, AI/ML applications, and data science with a strong foundation in Next.js, Python, and MySQL."
                fullText="I specialize in fullstack development, AI/ML applications, and data science with a strong foundation in Next.js, Python, and MySQL. 
                Currently pursuing my degree, I'm actively working on projects that challenge me to grow as a developer. 
                Beyond coding, I'm passionate about open source contributions and staying up-to-date with the latest tech trends. 
                Other than tech, I enjoy hiking, sports, as well as aviation and astronomy!"
              />
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-700 dark:text-gray-300">Education & Experience</h2>
            <Timeline items={TimelineItems} />
          </div>
        </div>
      </section>

      {/* skills section */}
      <section id="Skills" className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-700 dark:text-gray-300">Skills</h2>
          <SkillFilter Skills={Skills} onFilterChange={setFilteredSkills} />
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {filteredSkills.map((Skill, Index) => (
                <SkillCard key={Index} skill={Skill} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* projects section */}
      <section id="Projects" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-700 dark:text-gray-300">Projects</h2>
          <ProjectFilter projects={Projects} onFilterChange={setFilteredProjects} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
              />
            ))}
          </div>
        </div>
      </section>

      {/* contact section */}
      <section id="Contact" className="py-16 bg-white dark:bg-gray-800 dark:text-gray-300 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-700 dark:text-gray-300">Get in Touch</h2>
          <ContactForm />
          <div className="mt-12 flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </section>
    </main>
  );
}