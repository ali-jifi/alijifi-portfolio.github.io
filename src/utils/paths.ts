/**
 * Correct asset path based on environment
 * @param path - The relative path to the asset
 * @returns The complete path including base path if in production
 */
export const getAssetPath = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return process.env.NODE_ENV === 'production' 
    ? `${basePath}/${cleanPath}` 
    : `/${cleanPath}`;
};

/**
 * Gets the correct route path based on environment
 * @param path - The relative route path
 * @returns The complete route path including base path if in production
 */
export const getRoutePath = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''; // Use environment variable for base path
  return `${basePath}/${cleanPath}`;
};