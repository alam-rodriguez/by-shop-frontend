// app/carrito/comprar/page.js
import { Suspense } from "react";
import Client from "./Client";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={<LoadingParagraph text="Buscando Pedidos..." />}>
            <Client />
        </Suspense>
    );
}
