'use client';

import { useState } from 'react';
import { Calendar, BookOpen, Briefcase } from 'lucide-react';

interface TimelineItem {
  id: number;
  title: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
  type: 'education' | 'experience';
  skills?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  const [filter, setFilter] = useState<'all' | 'education' | 'experience'>('all');

  const filteredItems = items.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* filter buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-300 dark:bg-gray-400 hover:bg-gray-500'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('education')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'education'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-300 dark:bg-gray-400 hover:bg-gray-500'
          }`}
        >
          Education
        </button>
        <button
          onClick={() => setFilter('experience')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'experience'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-300 dark:bg-gray-400 hover:bg-gray-500'
          }`}
        >
          Experience
        </button>
      </div>

      {/* timeline */}
      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200" />

        {/* timeline items */}
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className={`mb-8 flex justify-between items-center w-full ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* content */}
            <div className="w-5/12">
              <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  {item.type === 'education' ? (
                    <BookOpen className="text-blue-500" size={20} />
                  ) : (
                    <Briefcase className="text-green-500" size={20} />
                  )}
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <h4 className="text-gray-600 mb-1">{item.role}</h4>
                <p className="text-gray-500 text-sm mb-2">{item.organization}</p>
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                  <Calendar size={14} />
                  <span>{item.startDate} - {item.endDate}</span>
                </div>
                <p className="text-gray-700 mb-3">{item.description}</p>
                {item.skills && (
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* circle on the line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white" />
          </div>
        ))}
      </div>
    </div>
  );
};