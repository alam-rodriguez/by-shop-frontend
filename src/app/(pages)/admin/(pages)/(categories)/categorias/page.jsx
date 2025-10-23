// app/carrito/comprar/page.js
import { Suspense } from "react";
import CategoriasClient from "./CategoriasClient";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <CategoriasClient />
        </Suspense>
    );
}
