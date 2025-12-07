// app/carrito/comprar/page.js
import { Suspense } from "react";
import IdPedidoClient from "./IdPedidoClient";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <IdPedidoClient />
        </Suspense>
    );
}
