'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface readMoreProps {
  shortText: string;
  fullText: string;
}

export const ReadMore = ({ shortText, fullText }: readMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4">
      <div className={`transition-all duration-300 overflow-hidden ${
        isExpanded ? 'max-h-96' : 'max-h-20'
      }`}>
        <p className="text-gray-700 dark:text-gray-300">
          {isExpanded ? fullText : shortText}
        </p>
      </div>
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
      >
        {isExpanded ? 'Read less' : 'Read more'}
        <ChevronDown className={`ml-1 transform transition-transform ${
          isExpanded ? 'rotate-180' : ''
        }`} />
      </button>
    </div>
  );
};