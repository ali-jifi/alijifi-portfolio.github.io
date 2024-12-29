'use client';

import { useEffect } from "react";
import Link from 'next/link';

export default function ProjectError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Something went wrong!
                </h2>
                <div className="space-x-4">
                    <button
                        onClick={() => reset()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 inline-block"
                    >
                        Return to home
                    </Link>
                </div>
            </div>
        </div>
    );
}