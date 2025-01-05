/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/products/**',
                destination: 'https://la-juriste-proxy-ec8f63ca9ca5.herokuapp.com/api/products',
            },
        ];
    },
};

export default nextConfig;
