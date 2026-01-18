export function getCdnUrl(imagePath: string | null | undefined): string {
  // 1. Fallback for missing images
  if (!imagePath) {
    return '/recipes/placeholder.jpg';
  }

  // 2. Remove leading slash if it exists to avoid double slashes in URL
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  // 3. Point to our Route Handler at /api/cdn/...
  // This ensures the request hits app/api/cdn/[...path]/route.ts
  return `/api/cdn/${cleanPath}`;
}