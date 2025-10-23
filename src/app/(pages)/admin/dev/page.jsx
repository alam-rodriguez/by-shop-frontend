"use client";

import React, { useEffect } from "react";

// Hooks
import useRequestsShops from "@/app/hooks/request/shops/useRequestsShops";

// Zustand
import { zusAdminShops } from "@/app/zustand/admin/shops/zusAdminShops";
import Link from "next/link";

const page = () => {
    const { shops, shopsStatus } = zusAdminShops();

    const { useGetShops } = useRequestsShops();

    useEffect(() => {
        useGetShops();
    }, []);

    useEffect(() => {
        console.log(shops);
    }, [shops]);

    return (
        <div className="m-4">
            <BtnGroup
                txt="Tiendas"
                options={[
                    { url: "/admin/tiendas", text: "TIENDAS" },
                    { url: "/admin/marcas", text: "MARCAS" },
                    { url: "/admin/modelos", text: "MODELOS" },
                    { url: "/admin/tiendas", text: "CONFIGURACION" },
                    { url: "/admin/tiendas", text: "GRAFICAS" },
                    { url: "/admin/categorias-opciones", text: "CATEGORIAS DE OPCIONES" },
                    { url: "/admin/opciones", text: "OPCIONES" },
                    { url: "/admin/valores-opciones", text: "VALORES OPCIONES" },
                    { url: "/admin/metodos-de-pago", text: "METODOS DE PAGO" },
                    { url: "/admin/monedas", text: "Monedas" },
                ]}
            />

            <div>
                <p className="text-center">Articulos</p>
                <div className="flex justify-between flex-wrap gap-y-4">
                    <BtnOption url="/admin/articulos" text="ARTICULOS" />
                    <BtnOption url="/admin/ofertas" text="OFERTAS" />
                    <BtnOption url="/admin/ofertas" text="OFERTAS POR ARTICULOS" />
                </div>
            </div>

            <BtnGroup
                txt="Categorias"
                options={[
                    { url: "/admin/categorias?tipo=directas", text: "CATEGORIAS DIRECTAS" },
                    { url: "/admin/categorias?tipo=indirectas", text: "CATEGORIAS INDIRECTAS" },
                    // { url: "/admin/categorias-indirectas", text: "CATEGORIAS INDIRECTAS" },
                    // { url: "/admin/categorias-generales", text: "CATEGORIAS GENERALES" },
                    { url: "/admin/categorias?tipo=generales", text: "CATEGORIAS GENERALES" },

                    { url: "/admin/grupos-categorias-generales", text: "GRUPOS DE CATEGORIAS GENERALES" },
                    { url: "/admin/departamentos", text: "DEPARTAMENTOS" },
                ]}
            />
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
            <div>
                <p className="text-center">Configuracion</p>
                <div className="flex justify-between flex-wrap gap-y-4">
                    <BtnOption url="/admin/categorias-directas" text="DATOS DE APP" />
                    <BtnOption url="/admin/categorias-directas" text="Configuracion tienda" />
                </div>
            </div>
            <BtnGroup
                txt="Mi tienda"
                options={[
                    { url: "/admin/pedidos?estado=pendiente", text: "PEDIDOS PENDIENTES" },
                    { url: "/admin/pedidos?estado=realizado", text: "PEDIDOS REALIZADOS" },
                    { url: "/admin/pedidos?estado=archivado", text: "PEDIDOS ARCHIVADOS" },
                    { url: "/admin/articulos/solicitudes-comentarios", text: "SOLICITUDES DE COMENTARIOS" },
                ]}
            />

            <BtnGroup txt="Usuarios" options={[{ url: "/admin/usuarios/usuarios", text: "ADMINISTRAR USUARIOS" }]} />
        </div>
    );
};

const BtnGroup = ({ txt, options }) => {
    return (
        <div>
            <p className="text-center">{txt}</p>
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
