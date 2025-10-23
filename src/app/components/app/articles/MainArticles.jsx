import React from "react";

// Next
import { useRouter } from "next/navigation";
import Image from "next/image";

// hooks
import useApp from "@/app/hooks/app/useApp";

const MainArticles = ({ id, text, img, link }) => {
    const router = useRouter();

    const { showText } = useApp();

    return (
        <div className="h-40 w-32 min-w-32 bg-white rounded" onClick={() => router.push(link)}>
            <div className="h-1/4 py-1 px-1 tracking-tight">
                <p className="text-xs ">{showText(text, 43)}</p>
            </div>
            <div className="relative w-full h-3/4">
                <Image className="object-contain" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={img} alt="" />
            </div>
        </div>
    );
};

export default MainArticles;
