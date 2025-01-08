/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/product/:id/pdf',
                destination: 'https://la-juriste-proxy-ec8f63ca9ca5.herokuapp.com/api/products/:path*',
            },
        ];
    },
};

export default nextConfig;
