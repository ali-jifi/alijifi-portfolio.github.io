'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { Laptop, Server, Code, Database, Book, Brain, Wrench } from 'lucide-react';

interface ProjectFilterProps {
  projects: Project[];
  onFilterChange: Dispatch<SetStateAction<Project[]>>;
}

export const ProjectFilter = ({ projects, onFilterChange }: ProjectFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'all' | 'featured'>('all');

  // extract unique categories and technologies from projects
  const categories = ['All', ...new Set(projects.flatMap(project => project.category))];
  const technologies = ['All', ...new Set(projects.flatMap(project => project.technologies))];

  useEffect(() => {
    const filterProjects = () => {
      let filtered = [...projects];
  
      // filter by view mode (all vs featured)
      if (viewMode === 'featured') {
        filtered = filtered.filter(project => project.featured);
      }
  
      // filter by category
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(project => 
          project.category.includes(selectedCategory)
        );
      }
  
      // filter by technology
      if (selectedTech !== 'All') {
        filtered = filtered.filter(project => 
          project.technologies.includes(selectedTech)
        );
      }
  
      onFilterChange(filtered);
    };
    filterProjects();
  }, [selectedCategory, selectedTech, viewMode, projects, onFilterChange]);

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Frontend': <Laptop className="w-5 h-5" />,
      'Backend': <Server className="w-5 h-5" />,
      'Full Stack': <Code className="w-5 h-5" />,
      'Database': <Database className="w-5 h-5" />,
      'Academic': <Book className="w-5 h-5" />,
      'AI/ML': <Brain className="w-5 h-5" />,
      'Tools': <Wrench className="w-5 h-5" />,
    };
    return icons[category] || <Code className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* view mode toggle */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setViewMode('all')}
          className={`px-4 py-2 rounded-lg transition-all ${
            viewMode === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-300 dark:bg-gray-400 hover:bg-gray-500'
          }`}
        >
          All Projects
        </button>
        <button
          onClick={() => setViewMode('featured')}
          className={`px-4 py-2 rounded-lg transition-all ${
            viewMode === 'featured'
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 shadow hover:bg-gray-500'
          }`}
        >
          Featured Projects
        </button>
      </div>

      {/* category filters */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-center">Categories</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 shadow hover:bg-gray-500'}
              `}
            >
              {category !== 'All' && (
                <span className={selectedCategory === category ? 'text-white' : 'text-blue-600'}>
                  {getCategoryIcon(category)}
                </span>
              )}
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* technology filters */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-center">Technologies</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`
                px-3 py-1 rounded-full text-sm transition-all
                ${selectedTech === tech
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100'}
              `}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile filter dropdown */}
      <div className="md:hidden space-y-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {technologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};