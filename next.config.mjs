/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https', // Cambia 'https:' a 'https'
                hostname: "utfs.io",
                port: "",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;