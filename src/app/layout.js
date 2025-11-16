import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import Script from "next/script";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "ByShop",
    description: "Tienda de artículos tecnológicos y más",
    manifest: "/manifest.json",
    // themeColor: "#0f172a",
    icons: {
        apple: "/icons/icon-192x192.png",
    },
    // viewport: {
    //     width: "device-width",
    //     initialScale: 0.8,
    // },
};

export const themeColor = "#0f172a";

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased width mb-24 bg-gray-100`}>
                <ClientLayout>{children}</ClientLayout>

                {/* Google Analytics */}
                <Script src={`https://www.googletagmanager.com/gtag/js?id=G-PS1FL2THQF`} strategy="afterInteractive" />

                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-PS1FL2THQF');
                    `}
                </Script>
            </body>
        </html>
    );
}
