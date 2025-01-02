'use client';

import { useState } from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';

export const SocialLinks = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = 'alijifibahlool@gmail.com';

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="flex gap-4 items-center">
      <a
        href="https://github.com/ali-jifi"
        target="_blank"
        rel="noopener noreferrer"
        className="transform transition-transform hover:scale-110"
      >
        <Github className="text-gray-700 hover:text-gray-900" size={24} />
      </a>
      <a
        href="https://www.linkedin.com/in/ali-jifi-bahlool/"
        target="_blank"
        rel="noopener noreferrer"
        className="transform transition-transform hover:scale-110"
      >
        <Linkedin className="text-blue-600 hover:text-blue-800" size={24} />
      </a>
      <button
        onClick={copyEmail}
        className="relative transform transition-transform hover:scale-110"
      >
        <Mail className="text-gray-700 hover:text-gray-900" size={24} />
        {copiedEmail && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
};