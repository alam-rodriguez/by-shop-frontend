/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["utfs.io", "058205erp7.ufs.sh", "8cfbi9foz7.ufs.sh", "cdn-icons-png.flaticon.com", "cdn.pixabay.com"],
    },
    eslint: {
        ignoreDuringBuilds: true, // <--- esto permite que la build se complete aunque haya errores de ESLint
    },
};

export default nextConfig;
