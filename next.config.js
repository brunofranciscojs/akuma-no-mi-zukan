/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ['192.168.7.13', '192.168.7.14'],
    async redirects() {
        return [
            {
                source: '/fruta/:path*',
                destination: '/fruit/:path*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;