// app/carrito/comprar/page.js
import { Suspense } from "react";
import Client from "./Client";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <Client />
        </Suspense>
    );
}
