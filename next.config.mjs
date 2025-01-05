/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/products/:path*',
                destination: 'https://your-proxy.herokuapp.com/api/products/:path*', // Remplacez par l'URL de votre proxy
            },
        ];
    },
};

export default nextConfig;
