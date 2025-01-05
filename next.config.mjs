/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            // Route pour `/api/products`
            {
                source: '/api/products',
                destination: 'https://la-juriste-proxy-ec8f63ca9ca5.herokuapp.com/api/products',
            },
            // Route pour toutes les sous-routes `/api/products/:path*`
            {
                source: '/api/products/:path*',
                destination: 'https://la-juriste-proxy-ec8f63ca9ca5.herokuapp.com/api/products/:path*',
            },
        ];
    },
};

export default nextConfig;
