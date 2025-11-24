// React
import { Suspense } from "react";

// Components
import CarritoClient from "./CarritoClient";
import BuyCart from "@/app/components/skeleton/BuyCart";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={<BuyCart />}>
            <CarritoClient />
        </Suspense>
    );
}
