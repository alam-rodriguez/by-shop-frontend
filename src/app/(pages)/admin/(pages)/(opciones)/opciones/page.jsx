"use client";

// React
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Components
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import ItemDiv from "@/app/components/others/ItemDiv";

// Hooks
import useRequestsBrands from "@/app/hooks/request/brands/useRequestsBrands";
import useRequestsModels from "@/app/hooks/request/models/useRequetsModels";
import useRequestsOptions from "@/app/hooks/request/options/useRequestsOptions";
import { zusAdminBrands } from "@/app/zustand/admin/brands/zusAdminbrands";

// Zustand
import { zusAdminModels } from "@/app/zustand/admin/models/zusAdminModels";
import { zusAdminOptions } from "@/app/zustand/admin/options/zusAdminOptions";

const page = () => {
    const router = useRouter();

    // const { useGetBrands } = useRequestsBrands();
    const { useGetModels, useCreateModel, useUpdateModel } = useRequestsModels();
    const { useGetOptions, useCreateOption, useUpdateOption } = useRequestsOptions();

    // const { brands, setBrandSelected } = zusAdminBrands();
    const { models, setModelSelected } = zusAdminModels();
    const { options, setOptionSelected } = zusAdminOptions();

    useEffect(() => {
        // useGetBrands();
        useGetOptions();
    }, []);

    useEffect(() => {
        console.log(options);
    }, [options]);

    const handleClickOption = (option = 0) => router.push(`/admin/opciones/${option}`);

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Opciones</p>

            <div className="flex flex-col gap-4">
                {options.map((option) => (
                    <ItemDiv
                        key={option.id}
                        title={option.name}
                        data={[
                            { key: "Opcion", value: option.name },
                            { key: "Cetegoria de opcion", value: option.category },
                            { key: "Tipo", value: option.type == 1 ? "Normal" : option.type == 1 ? "Especial" : "Unica" },
                            { key: "Estado", value: option.status == 1 ? "Activa" : "Inactiva" },
                        ]}
                        onClick={() => handleClickOption(option.id)}
                    />
                ))}
            </div>
            <ButtonGrayDown fn={() => handleClickOption("crear")}>Crear Nuevo Modelo</ButtonGrayDown>
        </div>
    );
};

export default page;
