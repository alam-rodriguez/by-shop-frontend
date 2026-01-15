"use client";

import React, { useEffect } from "react";

// Hooks
import useRequestsShops from "@/app/hooks/request/shops/useRequestsShops";

// Zustand
import { zusAdminShops } from "@/app/zustand/admin/shops/zusAdminShops";
import Link from "next/link";
import { zusUser } from "@/app/zustand/user/zusUser";

const page = () => {
    const { id_shop, name_shop, shop_id: shopId } = zusUser();

    const { shops, shopsStatus } = zusAdminShops();

    const { useGetShops } = useRequestsShops();

    useEffect(() => {
        useGetShops();
    }, []);

    useEffect(() => {
        console.log(name_shop);
    }, [name_shop]);

    // useEffect(() => {
    //     console.log(shops);
    // }, [shops]);

    return (
        <div className="m-4">
            <BtnGroup txt="Mi Tienda" options={[{ url: `/admin/tiendas/${shopId}`, text: "Configuracion tienda" }]} />
            <BtnGroup
                txt="Articulos"
                options={[
                    { url: "/admin/articulos", text: "Articulos" },
                    { url: "/admin/ofertas", text: "Ofertas" },
                    { url: "/admin/articulos/solicitudes-comentarios", text: "Solicitudes de comentarios" },
                    { url: "/admin/articulos/solicitudes-comentarios", text: "Comentarios" },
                ]}
            />

            {/* <div>
                <p className="text-center">Articulos</p>
                <div className="flex justify-between flex-wrap gap-y-4">
                    <BtnOption url="/admin/articulos" text="ARTICULOS" />
                    <BtnOption url="/admin/ofertas" text="OFERTAS" />
                    <BtnOption url="/admin/ofertas" text="OFERTAS" />
                    <BtnOption url="/admin/ofertas" text="OFERTAS POR ARTICULOS" />
                    <BtnOption url="/admin/articulos/solicitudes-comentarios" text="SOLICITUDES DE COMENTARIOS" />
                </div>
            </div> */}
            {/* <div>
                <p className="text-center">Categorias</p>
                <div className="flex justify-between flex-wrap gap-y-4">
                    <BtnOption url="/admin/categorias-directas" text="CATEGORIAS DIRECTAS" />
                    <BtnOption url="/admin/categorias-indirectas" text="CATEGORIAS INDIRECTAS" />
                    <BtnOption url="/admin/categorias-generales" text="CATEGORIAS GENERALES" />
                    <BtnOption url="/admin/grupos-categorias-generales" text="GRUPOS DE CATEGORIAS GENERALES" />
                    <BtnOption url="/admin/departamentos" text="DEPARTAMENTOS" />
                </div>
            </div> */}
            {/* <div>
                <p className="text-center">Configuracion</p>
                <div className="flex justify-between flex-wrap gap-y-4">
                   
                    <BtnOption url={`/admin/tiendas/${id_shop}`} text="Configuracion tienda" />
                </div>
            </div> */}
            <BtnGroup
                txt="Mi tienda"
                options={[
                    { url: "/admin/pedidos?estado=pendiente", text: "PEDIDOS PENDIENTES" },
                    { url: "/admin/pedidos?estado=realizado", text: "PEDIDOS REALIZADOS" },
                    { url: "/admin/pedidos?estado=archivado", text: "PEDIDOS ARCHIVADOS" },
                    { url: "/admin/pedidos?estado=pendiente&responsabilidad=true", text: "PEDIDOS BAJO RESPONSABILIDAD" },
                    // { url: "/admin/articulos/solicitudes-comentarios", text: "SOLICITUDES DE COMENTARIOS" },
                ]}
            />

            <BtnGroup
                txt="Pagos"
                options={[
                    { url: "/admin/pagos/activo", text: "Periodo de pago activo" },
                    { url: "/admin/pagos", text: "Historias periodo de pagos" },
                ]}
            />

            <BtnGroup
                txt="Usuarios"
                options={[
                    { url: `/admin/usuarios`, text: "Usuarios" },
                    // { url: "/admin/pagos", text: "Historias periodo de pagos" },
                ]}
            />

            {/* <BtnGroup txt="Usuarios" options={[{ url: "/admin/usuarios/usuarios", text: "ADMINISTRAR USUARIOS" }]} /> */}
        </div>
    );
};

const BtnGroup = ({ txt, options }) => {
    return (
        <div>
            <p className="text-center font-bold text-lg">{txt}</p>
            <div className="flex justify-between flex-wrap gap-y-4">
                {options.map((option, index) => (
                    <BtnOption key={index} url={option.url} text={option.text} />
                ))}
            </div>
        </div>
    );
};

const BtnOption = ({ url, text }) => {
    return (
        <button className="bg-green-700 text-white rounded-md py-3" style={{ width: "calc(50% - 5px)" }}>
            <Link href={url}>{text}</Link>
        </button>
    );
};

export default page;
