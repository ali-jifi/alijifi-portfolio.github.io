'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import PageTransition from '@/components/pageTransition';

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  images: string[];
  technologies: string[];
  features: string[];
  github?: string;
  liveDemo?: string;
}

interface ProjectDisplayProps {
    project: Project;
  }
  
  export default function ProjectDisplay({ project }: ProjectDisplayProps) {
    if (!project) {
      notFound();
    }

    return (
        <PageTransition>
          <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
            <div className="max-w-6xl mx-auto px-4">
              {/* back button */}
              <Link 
                href="/" 
                className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to Projects
              </Link>
    
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* project image */}
                <div className="relative h-[400px] w-full">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
    
                {/* project content */}
                <div className="p-8">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    {project.title}
                  </h1>
                  
                  {/* technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
    
                  {/* description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    {project.fullDescription}
                  </p>
    
                  {/* features */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      Key Features
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
    
                  {/* links */}
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Github className="mr-2" size={20} />
                        View Source
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink className="mr-2" size={20} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </PageTransition>
      );
    }