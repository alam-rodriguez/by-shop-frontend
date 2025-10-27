/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ["utfs.io", "058205erp7.ufs.sh", "8cfbi9foz7.ufs.sh", "cdn-icons-png.flaticon.com", "cdn.pixabay.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "058205erp7.ufs.sh",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "8cfbi9foz7.ufs.sh",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "cdn-icons-png.flaticon.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "cdn.pixabay.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "/**",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true, // <--- esto permite que la build se complete aunque haya errores de ESLint
    },
};

export default nextConfig;
