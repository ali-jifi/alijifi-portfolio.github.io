'use client';

import { useState } from 'react';

interface SkillCardProps {
    skill: {
        name: string;
        category: string;
        icon: React.ReactNode;
        description: string;
        experience: string;
    };
}

export const SkillCard = ({ skill }: SkillCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div 
            className = 'relative w-64 h-48 group'
            onMouseEnter = {() => setIsFlipped(true)}
            onMouseLeave = {() => setIsFlipped(false)}
        >
        <div className={`w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
        isFlipped ? '[transform:rotateY(180deg)]' : ''
      }`}>
        <div className="absolute w-full h-full bg-white rounded-lg shadow-lg p-4 [backface-visibility:hidden]">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl mb-4">{skill.icon}</div>
            <h3 className="text-xl font-semibold text-center text-gray-600">{skill.name}</h3>
          </div>
        </div>
        
        <div className="absolute w-full h-full bg-blue-50 rounded-lg shadow-lg p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex flex-col justify-center h-full">
            <h4 className="font-semibold mb-2 text-gray-700">Experience:</h4>
            <p className="text-sm text-gray-700">{skill.description}</p>
            <div className="mt-2">
              <span className="text-sm text-blue-600">{skill.experience}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};