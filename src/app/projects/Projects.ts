import { Project } from '@/types';
import { getAssetPath } from '@/utils/paths';

export const Projects: Project[] = [
    {
      id: "1",
      title: "Portfolio Website",
      description: "Personal portfolio built with Next.js and TailwindCSS",
      category: ["Frontend"],
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"],
      images: [getAssetPath('project1.jpg')],
      github: "https://github.com/username/portfolio",
      featured: true,
      fullDescription: "A feature rich portfolio website showcasing my projects and skills.",
      features: [
        "Responsive design",
        "Dark mode support",
        "Interactive components",
        "Optimized performance"
      ],
      challenges: [
        "Implementing smooth animations",
        "Optimizing for different screen sizes"
      ]
    },
    {
      id: "2",
      title: "ChessMaster",
      description: "Personal project built with Java",
      category: ["Academic"],
      technologies: ["Java"],
      images: [getAssetPath('project2.jpg')],
      github: "https://github.com/username/portfolio",
      featured: false,
      fullDescription: "Chess built completely in Java, taking advantage of classes and objects, to create a highly optimized game. Complete with AI opponents",
      features: [
        "User interface",
        "Complete Chess ruleset and game logic",
        "AI opponents",
        "Optimized performance"
      ],
      challenges: [
        "Implementing UI/UX and AI opponents",
        "Optimizing game performance"
      ]
    },
  ];