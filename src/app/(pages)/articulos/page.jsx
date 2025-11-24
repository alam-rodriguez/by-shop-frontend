// React
import { Suspense } from "react";

// Components
import Client from "./Client";
import Articles from "@/app/components/skeleton/Articles";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={<Articles />}>
            <Client />
        </Suspense>
    );
}
