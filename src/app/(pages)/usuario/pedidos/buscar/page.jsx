// app/carrito/comprar/page.js
import { Suspense } from "react";
import BuscarClient from "./BuscarClient";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <BuscarClient />
        </Suspense>
    );
}
