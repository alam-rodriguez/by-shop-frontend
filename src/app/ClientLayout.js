"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";

import { Toaster } from "sonner";
import { useEffect, useLayoutEffect } from "react";
import { useRequestsUsers } from "./hooks/request/users/requestsUsers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterServiceWorker from "./components/RegisterServiceWorker";

import { pageview, GA_ID } from "./gtag";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function ClientLayout({ children }) {
    const { useGetUserInformation, useGetUserCurrencyOrMainCurrency } = useRequestsUsers();

    useLayoutEffect(() => {
        useGetUserInformation();
        useGetUserCurrencyOrMainCurrency();
    }, []);

    const pathname = usePathname();

    useEffect(() => {
        if (window.gtag) {
            pageview(pathname);
        }
    }, [pathname]);

    return (
        <>
            <RegisterServiceWorker />
            <Toaster />
            <QueryClientProvider client={queryClient}>
                <Header />
                {children}
                <Footer />
            </QueryClientProvider>
            {/* Google Analytics */}
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />

            <Script id="google-analytics" strategy="afterInteractive">
                {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_ID}');
                    `}
            </Script>
        </>
    );
}
