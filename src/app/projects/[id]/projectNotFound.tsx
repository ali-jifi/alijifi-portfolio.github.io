import Link from 'next/link';

export default function projectNotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Project Not Found</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">The project you&apos;re looking for doesn&apos;t exist.</p>
                <Link
                    href="/"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}