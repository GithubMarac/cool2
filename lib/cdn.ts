export const getCdnUrl = (path: string) => {
  const baseUrl = process.env.CDN_BASE_URL || 'https://cdn.localhost.com';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}/${cleanPath}`;
};