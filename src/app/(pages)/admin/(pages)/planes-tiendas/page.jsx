"use client";
import React, { useEffect } from "react";

// Hooks
import useRequestsShops from "@/app/hooks/request/shops/useRequestsShops";

// Zustand
import { zusAdminShops } from "@/app/zustand/admin/shops/zusAdminShops";
import { useRouter } from "next/navigation";
import ItemDiv from "@/app/components/others/ItemDiv";
import { useGetShopsPlans } from "@/app/hooks/request/shops/requestsShopsPlans";

const page = () => {
    const router = useRouter();

    const { data } = useGetShopsPlans();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleClick = (id = 0) => router.push(`/admin/planes-tiendas/${id}`);

    //     CREATE TABLE shops_plans (
    //         id CHAR(36) NOT NULL PRIMARY KEY,
    //         name VARCHAR(100) NOT NULL,
    //         description VARCHAR(255) NULL,
    //         -- sort_order INT NOT NULL,
    //         price DECIMAL(10,2) NOT NULL,
    //         duration_days INT NOT NULL,
    //         commission_rate DECIMAL(5,2) NOT NULL,
    //         status TINYINT DEFAULT 1,
    //         `rank` INT NOT NULL,
    //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    //     );

    return (
        <div className="m-4">
            <p className="text-center font-semibold text-xl">Lista de los planes</p>

            <div className="flex flex-col gap-4">
                {data?.map((plan) => (
                    <ItemDiv
                        key={plan.id}
                        title={plan.name}
                        data={[
                            plan.description.length > 0 && { key: "Descripcion", value: plan.description },
                            { key: "Precio", value: `$${plan.price}` },
                            { key: "Duración (días)", value: plan.duration_days },
                            { key: "Comisión (%)", value: `${plan.commission_rate}%` },
                            { key: "Rango", value: plan.rank },
                            { key: "Fecha de creacion", value: plan.created_at.split("T")[0].split("-").reverse().join("/") },
                            { key: "Estado", value: plan.status == 1 ? "Activa" : "Inactiva" },
                        ].filter(Boolean)}
                        onClick={() => handleClick(plan.id)}
                    />
                ))}
            </div>

            <br />
            <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => handleClick()}>
                Crear Nuevo Plan
            </button>
        </div>
    );
};

export default page;
