// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
    // const { pathname } = request.nextUrl;

    // // Redirigir si no está autenticado y trata de acceder a /dashboard
    // const isLoggedIn = false; // Aquí pondrías tu lógica real

    // if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    //     return NextResponse.redirect(new URL("/login", request.url));
    // }

    console.log("first");

    return NextResponse.next();
}
