'use client';

import { useState, useEffect } from 'react';

interface TypeWriterProps {
    text: string;
    delay?: number;
}

export const TypeWriter = ({ text, delay = 20 }: TypeWriterProps) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);
    return <div className = "font-mono text-gray-700 dark:text-gray-300">{displayText}</div>
};