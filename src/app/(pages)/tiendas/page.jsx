"use client";
import Spacer from "@/app/components/home/Spacer";
import ImageA from "@/app/components/others/ImageA";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { getDateInSpanish, showDate } from "@/app/hooks/app/app";
import { useGetShops } from "@/app/hooks/request/shops/requestsShops";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
    const { isLoading, data } = useGetShops();

    const router = useRouter();

    useEffect(() => {
        console.log(data);
    }, [data]);

    if (isLoading) return <LoadingParagraph />;
    return (
        <div className="m-4">
            <p className="text-xl text-center font-bold">Lista de tiendas registradas</p>
            <Spacer />
            <div className="flex flex-col gap-4">
                {data?.map((shop) => (
                    <div
                        key={shop.id}
                        className="flex bg-gray-200 items-center rounded-lg p-4 h-28"
                        onClick={() => router.push(`/tiendas/${shop.id}/articulos`)}
                    >
                        <div className="w-1/4">
                            <ImageA src={shop.logo} className="w-full aspect-square rounded-lg object-cover" />
                        </div>
                        <div className="w-3/4 mx-4">
                            <p className="font-bold">{shop.name}</p>
                            <p>
                                Fecha de ingreso: <span className="font-bold">{getDateInSpanish(shop.created_at)}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default page;
