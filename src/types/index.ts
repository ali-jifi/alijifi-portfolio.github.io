import { ReactNode } from 'react';

export interface Skill {
  name: string;
  category: string;
  icon: ReactNode;
  description: string;
  experience: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string[];
  technologies: string[];
  images: string[];
  github: string;
  liveDemo?: string;
  featured: boolean;
  fullDescription: string;
  features: string[];
  challenges: string[];
}