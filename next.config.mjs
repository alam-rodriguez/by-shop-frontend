/** @type {import('next').NextConfig} */

import nextPWA from "next-pwa";

const withPWA = nextPWA({
    // dest: "public",
    // register: true,
    // skipWaiting: true,

    // // injectManifest: true,

    // // disable: process.env.NODE_ENV === "development",
    // // disable: false,
    // // swDest: "public/sw.js",
    // sw: "sw.js",

    // disable: process.env.NODE_ENV === "development",
    // // sw: "public/sw.js",
    // swSrc: "public/sw-custom.js",
    // // swSrc: "sw-custom.js",
    // // swSrc: "sw-custom.js",
    // // swSrc: "./sw-custom.js",

    // buildExcludes: [/app-build-manifest.json$/],
    // // swSrc: "public/sw-custom.js",
    // dest: "public",
    // disable: process.env.NODE_ENV === "development",

    // swSrc: "public/sw-custom.js", // tu template
    // sw: "sw.js", // el SW final
    // register: true,
    // skipWaiting: true,
    // dest: "public",
    // disable: process.env.NODE_ENV === "development",
    // register: true,
    // skipWaiting: true,
    // buildExcludes: [/app-build-manifest.json$/],
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,

    // 👇 ¡Esto es lo que te falta!
    importScripts: ["/sw-custom.js"],

    // para evitar que lo elimine
    // buildExcludes: [/sw-custom\.js$/],
    buildExcludes: [
        /app-build-manifest\.json$/, // <--- SOLUCIÓN DEL ERROR
        /sw-custom\.js$/, // <--- ya lo tenías para importar tu SW
    ],
});

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

// export default nextConfig;
export default withPWA(nextConfig);
