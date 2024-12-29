'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAssetPath } from '@/utils/paths';

interface Project {
  title: string;
  description: string;
  fullDescription: string;
  images: string[];
  technologies: string[];
  features: string[];
  challenges: string[];
  liveDemo?: string;
  github?: string;
  role?: string;
  timeline?: string;
}

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div 
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X size={20} />
        </button>

        {/* image carousel */}
        <div className="relative h-[40vh] bg-gray-900">
          {project.images.length > 0 && (
            <>
              <Image
                src={getAssetPath(project.images[currentImageIndex])}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                quality={95}
              />
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? 'bg-white'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* content */}
        <div className="p-6">
          {/* header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
            {project.role && (
              <p className="text-gray-600 mb-1">Role: {project.role}</p>
            )}
            {project.timeline && (
              <p className="text-gray-600 mb-2">Timeline: {project.timeline}</p>
            )}
            <p className="text-gray-700">{project.description}</p>
          </div>

          {/* technologies */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* detailed description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Project Details</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {project.fullDescription}
            </p>
          </div>

          {/* key features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside space-y-1">
              {project.features.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* challenges & solutions */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Challenges & Solutions
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="text-gray-700">
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* links */}
          <div className="flex gap-4 mt-8">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Github size={20} />
                View Source
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink size={20} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};