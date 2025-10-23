"use client";

// Components
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import ItemDiv from "@/app/components/others/ItemDiv";
import useRequestsBrands from "@/app/hooks/request/brands/useRequestsBrands";
import { zusAdminBrands } from "@/app/zustand/admin/brands/zusAdminbrands";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
    const router = useRouter();

    const { useGetBrands } = useRequestsBrands();

    const { brands, setBrandSelected } = zusAdminBrands();

    useEffect(() => {
        useGetBrands();
    }, []);

    useEffect(() => {
        console.log(brands);
    }, [brands]);

    const handleClickBrand = (idBrand = 0) => {
        router.push(`/admin/marcas/${idBrand}`);
    };

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Lista de Marcas</p>

            <div className="flex flex-col gap-4">
                {brands.map((brand) => (
                    <ItemDiv
                        key={brand.id}
                        title={brand.name}
                        data={[
                            { key: "Marcar", value: brand.name },
                            { key: "Descripcion", value: brand.description },
                            { key: "Fecha de creacion", value: brand.created_date.split("T")[0].split("-").reverse().join("/") },
                            { key: "Estado", value: brand.status == 1 ? "Activa" : "Inactiva" },
                        ]}
                        img={brand.imagen}
                        onClick={() => handleClickBrand(brand.id)}
                    />
                ))}
            </div>

            {/* {brands.map((brand) => (
                <div key={brand.id} onClick={() => handleClickBrand(brand)}>
                    <img src={brand.image} alt="" />
                    <p>marca: {brand.name}</p>
                    <p>Descripcion: {brand.description}</p>
                    <p>Fecha creacion: {brand.created_date}</p>
                </div>
            ))} */}
            <ButtonGrayDown fn={() => handleClickBrand(0)}>Crear nueva marca</ButtonGrayDown>
        </div>
    );
};

export default page;
