'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath } from '@/utils/paths';

interface ProjectCardProps {
    project: {
        id: string;
        title: string;
        description: string;
        images: string[];
        technologies: string[];
        github: string;
        fullDescription: string; 
        features: string[];
    };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentImage, setCurrentImage] = useState(0);
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    /* handle case where project or images are undefined */
    if (!project?.images?.length || imageError) {
        return (
            <Link href={getAssetPath(`/projects/${project.id}`)}>
                <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <p className="text-gray-800 dark:text-gray-300">Image not available</p>
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-xl mb-2">{project?.title || 'Untitled Project'}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{project?.description || 'No description available'}</p>
                        {project?.technologies && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.technologies.map((tech, index) => (
                                    <span 
                                        key={index}
                                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={getAssetPath(`/projects/${project.id}`)}>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                <div className="relative h-48">
                    <Image
                        src={getAssetPath(project.images[currentImage])}
                        alt={project.title}
                        fill
                        className="object-cover"
                        onError={handleImageError}
                        priority={currentImage === 0}
                    />
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-200">{project.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.map((tech, index) => (
                            <span 
                                key={index}
                                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};
