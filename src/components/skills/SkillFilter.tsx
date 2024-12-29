'use client';

import { useState } from 'react';
import { Code, Database, Server, Layout, Terminal, Blocks, Brain, Shield } from 'lucide-react';

interface Skill {
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  experience: string;
}

interface SkillFilterProps {
  Skills: Skill[];
  onFilterChange: (filteredSkills: Skill[]) => void;
}

type SkillCategory = 'All' | 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'AI/ML' | 'Cybersecurity';

export const SkillFilter = ({ Skills, onFilterChange }: SkillFilterProps) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('All');

  // define categories with their icons and colors
  const categories: { name: SkillCategory; icon: React.ReactNode; color: string }[] = [
    { name: 'All', icon: <Blocks />, color: 'text-gray-600' },
    { name: 'Frontend', icon: <Layout />, color: 'text-blue-500' },
    { name: 'Backend', icon: <Server />, color: 'text-green-500' },
    { name: 'Database', icon: <Database />, color: 'text-teal-500' },
    { name: 'AI/ML', icon: <Brain />, color: 'text-purple-500' },
    { name: 'DevOps', icon: <Terminal />, color: 'text-orange-500' },
    { name: 'Cybersecurity', icon: <Shield />, color: 'text-red-500' },
    { name: 'Tools', icon: <Code />, color: 'text-yellow-500' }
  ];

  const handleCategoryClick = (category: SkillCategory) => {
    setActiveCategory(category);
    const filteredSkills = category === 'All' 
      ? Skills 
      : Skills.filter(Skill => Skill.category === category);
    onFilterChange(filteredSkills);
  };

  return (
    <div className="mb-8">
      {/* category filter buttons */}
      <div className="hidden md:flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all 
              ${activeCategory === category.name 
                ? 'bg-blue-600 text-white shadow-lg scale-105' 
                : 'bg-white hover:bg-gray-50 text-gray-700 shadow'}
            `}
          >
            <span className={activeCategory === category.name ? 'text-white' : category.color}>
              {category.icon}
            </span>
            <span>{category.name}</span>
            <span className={`ml-2 text-sm ${
              activeCategory === category.name 
                ? 'bg-white bg-opacity-20' 
                : 'bg-gray-100'
              } px-2 py-0.5 rounded-full`}
            >
              {category.name === 'All' 
                ? Skills.length 
                : Skills.filter(Skill => Skill.category === category.name).length}
            </span>
          </button>
        ))}
      </div>

      {/* mobile dropdown */}
      <div className="md:hidden">
        <select
          value={activeCategory}
          onChange={(e) => handleCategoryClick(e.target.value as SkillCategory)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name} ({
                category.name === 'All' 
                  ? Skills.length 
                  : Skills.filter(Skill => Skill.category === category.name).length
              })
            </option>
          ))}
        </select>
      </div>

      {/* skills count */}
      <div className="text-center text-gray-600 mt-4">
        Showing {
          activeCategory === 'All' 
            ? Skills.length 
            : Skills.filter(Skill => Skill.category === activeCategory).length
        } {activeCategory === 'All' ? 'total' : activeCategory} Skills
      </div>
    </div>
  );
};