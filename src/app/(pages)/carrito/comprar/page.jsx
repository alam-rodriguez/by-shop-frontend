// app/carrito/comprar/page.js
import { Suspense } from "react";
import CarritoClient from "./CarritoClient";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={<LoadingParagraph />}>
            <CarritoClient />
        </Suspense>
    );
}
