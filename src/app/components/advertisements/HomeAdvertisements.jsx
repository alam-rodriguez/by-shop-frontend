"use client";

import React, { useEffect, useState } from "react";
import ImageA from "../others/ImageA";
import { Icon } from "@iconify/react";
import { useGetAdvertisementsForApp } from "@/app/hooks/request/advertisements/RequestsAdvertisements";
import { useRouter } from "next/navigation";

const HomeAdvertisements = () => {
    const router = useRouter();

    const { data: advertisements = [], isLoading: isLoadingAdvertisements } = useGetAdvertisementsForApp();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (isLoadingAdvertisements || advertisements.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1 >= advertisements.length ? 0 : prevIndex + 1));
        }, 5000); // 5 minutos

        return () => clearInterval(interval);
    }, [advertisements, isLoadingAdvertisements]);

    if (isLoadingAdvertisements || advertisements.length === 0) return null;

    const currentAd = advertisements[currentIndex];

    const handleClick = () => router.push(currentAd.link);

    return (
        <div className="w-full h-44 rounded-2xl overflow-hidden relative" onClick={handleClick}>
            <ImageA className="w-full h-full object-cover absolute z-10" src={currentAd.article_image || ""} />
            <div className="z-20 relative bg-gradient-to-r from-[rgba(0,0,0,0.7)] to-transparent text-white h-full w-full flex flex-col justify-between p-4">
                <p className="font-semibold text-xl">{currentAd.name}</p>
                <p className="text-sm w-3/5 font-thin">{currentAd.description}</p>
                <div className="bg-white flex justify-center gap-2 w-fit text-black rounded-full py-1 px-3">
                    <p>Comprar</p>
                    <Icon icon="ep:right" className="size-6" />
                </div>
            </div>
        </div>
    );
};

export default HomeAdvertisements;

// import React, { useEffect, useState } from "react";
// import ImageA from "../others/ImageA";
// import { Icon } from "@iconify/react";
// import { useGetAdvertisementsForApp } from "@/app/hooks/request/advertisements/RequestsAdvertisements";

// const HomeAdvertisements = () => {
//     const [advertisement, setAdvertisements] = useState(null);

//     const { data: advertisements, isLoading: isLoadingAdvertisements } = useGetAdvertisementsForApp();

//     useEffect(() => {
//         console.error(advertisements);
//     }, [advertisements]);

//     useEffect(() => {
//         if (isLoadingAdvertisements) return;
//         // Inicia el intervalo
//         const interval = setInterval(() => {
//             // setCount((prev) => prev + 1);
//         }, 5000); // cada 1 segundo

//         // Limpia el intervalo al desmontar el componente
//         return () => clearInterval(interval);
//     }, [isLoadingAdvertisements]);

//     return (
//         <>
//             {advertisements.map((advertisement) => (
//                 <div key={advertisement.id} className="w-full h-44 rounded-2xl overflow-hidden relative">
//                     <ImageA
//                         className="w-full h-full object-cover absolute z-10"
//                         src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
//                     />
//                     <div className="z-20 relative bg-gradient-to-r from-[rgba(0,0,0,0.7)] to-transparent text-white h-full w-full flex flex-col justify-between p-4">
//                         <p className="font-semibold text-xl">{advertisement.name}</p>
//                         <p className="text-sm w-3/5 font-thin">{advertisement.description}</p>
//                         <div className="bg-white flex justify-center gap-2 w-fit text-black rounded-full py-1 px-3">
//                             <p className="">Show New</p>
//                             <Icon icon="ep:right" className="size-6" />
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// };

// export default HomeAdvertisements;
