"use client";
import React, { useEffect } from "react";

// Hooks
import useRequestsShops from "@/app/hooks/request/shops/useRequestsShops";

// Zustand
import { zusAdminShops } from "@/app/zustand/admin/shops/zusAdminShops";
import { useRouter } from "next/navigation";
import ItemDiv from "@/app/components/others/ItemDiv";

const page = () => {
    const router = useRouter();

    const { shops, shopsStatus, setShopSelected } = zusAdminShops();

    const { useGetShops } = useRequestsShops();

    useEffect(() => {
        useGetShops();
    }, []);

    useEffect(() => {
        console.log(shops);
    }, [shops]);

    const handleClickShop = (idShop = 0) => {
        router.push(`/admin/tiendas/${idShop}`);
    };

    return (
        <div className="m-4">
            <p className="text-center font-semibold text-xl">Lista de las tiendas</p>

            <div className="flex flex-col gap-4">
                {shops.map((shop) => (
                    <ItemDiv
                        key={shop.id}
                        title={`Tienda ${shop.id}`}
                        data={[
                            { key: "Nombre", value: shop.name },
                            { key: "Descripcion", value: shop.description },
                            { key: "Tipo", value: shop.type == 2 ? "Especial" : "Normal" },
                            { key: "Fecha de creacion", value: shop.created_at.split("T")[0].split("-").reverse().join("/") },
                            { key: "Estado", value: shop.status == 1 ? "Activa" : "Inactiva" },
                        ]}
                        img={shop.logo}
                        onClick={() => handleClickShop(shop.id)}
                    />
                ))}
            </div>
            {/* ItemDiv = ({(title, (data = []), img, (onClick = () => {}))}) */}
            {/* <div className="flex flex-col gap-4">
                {shops.map((shop) => (
                    <div key={shop.id} className={`${shop.status == 1 && "bg-green-200/50"}`} onClick={() => handleClickShop(shop)}>
                        <img src={shop.logo} className="p-2 w-full h-36 object-contain" />
                        <div className="flex justify-between">
                            <p>Id:</p>
                            <p>{shop.id}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Nombre:</p>
                            <p>{shop.name}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Fecha de creacion:</p>
                            <p>{shop.create_date}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Tipo:</p>
                            <p>{shop.type}</p>
                        </div>
                    </div>
                ))}
            </div> */}
            <br />
            <button className="bg-green-700 text-white w-full rounded-3xl py-3" onClick={() => handleClickShop()}>
                Crear Nueva Tienda
            </button>
        </div>
    );
};

export default page;
