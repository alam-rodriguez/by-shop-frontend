"use client";
import React, { useEffect } from "react";

// Hooks
import useRequestsShops from "@/app/hooks/request/shops/useRequestsShops";

// Zustand
import { zusAdminShops } from "@/app/zustand/admin/shops/zusAdminShops";
import { useRouter } from "next/navigation";
import ItemDiv from "@/app/components/others/ItemDiv";
import { useGetShopsPlans } from "@/app/hooks/request/shops/requestsShopsPlans";
import { useGetShopsCodes } from "@/app/hooks/request/shops/requestsShopsCodes";

const page = () => {
    const router = useRouter();

    const { data } = useGetShopsCodes();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleClick = (id = 0) => router.push(`/admin/tiendas/codigos/${id}`);

    // CREATE TABLE shops_codes (
    //                 id CHAR(36) NOT NULL PRIMARY KEY,
    //                 shops_plans_id CHAR(36) NOT NULL,
    //                 status TINYINT DEFAULT 1,
    //                 code VARCHAR(100) NOT NULL UNIQUE,
    //                 used_at TIMESTAMP NULL DEFAULT NULL,
    //                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //                 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    //             );

    return (
        <div className="m-4">
            <p className="text-center font-semibold text-xl">Codigos para registrar tiendas</p>

            <div className="flex flex-col gap-4">
                {data?.map((code) => (
                    <ItemDiv
                        key={code.id}
                        data={[
                            { key: "Codigo", value: code.code },
                            code.used_at && { key: "Usado en", value: code.used_at },
                            { key: "Fecha de creacion", value: code.created_at.split("T")[0].split("-").reverse().join("/") },
                            { key: "Estado", value: code.status == 1 ? "Activa" : "Inactiva" },
                        ].filter(Boolean)}
                        onClick={() => handleClick(code.id)}
                    />
                ))}
            </div>

            <br />
            <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => handleClick()}>
                Crear Nuevo Codigo de acceso
            </button>
        </div>
    );
};

export default page;
