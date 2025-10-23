// app/carrito/comprar/page.js
import { Suspense } from "react";
import CarritoClient from "./CarritoClient";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <CarritoClient />
        </Suspense>
    );
}
