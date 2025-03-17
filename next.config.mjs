/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'standalone', // Añadir esta línea para compatibilidad con Docker
  typescript: {
    ignoreBuildErrors: true, // Ignora errores de TypeScript durante la compilación
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora errores de ESLint durante la compilación
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "utfs.io",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig; // Ensure this is the only default export in the file