
// app/carrito/comprar/page.js
import { Suspense } from "react";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import Client from "./Client";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={<LoadingParagraph />}>
            <Client />
        </Suspense>
    );
}



