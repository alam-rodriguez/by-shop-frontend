"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";

import { Toaster } from "sonner";
import { useLayoutEffect } from "react";
import { useRequestsUsers } from "./hooks/request/users/requestsUsers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterServiceWorker from "./components/RegisterServiceWorker";

export default function ClientLayout({ children }) {
    const { useGetUserInformation, useGetUserCurrencyOrMainCurrency } = useRequestsUsers();

    useLayoutEffect(() => {
        useGetUserInformation();
        useGetUserCurrencyOrMainCurrency();
    }, []);

    return (
        <>
            <RegisterServiceWorker />
            <Toaster />
            <QueryClientProvider client={queryClient}>
                <Header />
                {children}
                <Footer />
            </QueryClientProvider>
        </>
    );
}
