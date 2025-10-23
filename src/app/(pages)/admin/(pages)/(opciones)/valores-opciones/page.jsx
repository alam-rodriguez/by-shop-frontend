"use client";

import { ButtonGrayDown } from "@/app/components/others/Buttons";
import ItemDiv from "@/app/components/others/ItemDiv";
import useRequestsBrands from "@/app/hooks/request/brands/useRequestsBrands";
import useRequestsModels from "@/app/hooks/request/models/useRequetsModels";
import useRequestsOptions from "@/app/hooks/request/options/useRequestsOptions";
import { zusAdminBrands } from "@/app/zustand/admin/brands/zusAdminbrands";
import { zusAdminModels } from "@/app/zustand/admin/models/zusAdminModels";
import { zusAdminOptions } from "@/app/zustand/admin/options/zusAdminOptions";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
    const router = useRouter();

    // const { useGetBrands } = useRequestsBrands();
    const { useGetModels, useCreateModel, useUpdateModel } = useRequestsModels();
    const { useGetOptions, useCreateOption, useUpdateOption, useGetOptionsValues } = useRequestsOptions();

    // const { brands, setBrandSelected } = zusAdminBrands();
    const { models, setModelSelected } = zusAdminModels();
    const { options, setOptionSelected, valuesOptions, valueOptionSelected, setValueOptionSelected } = zusAdminOptions();

    useEffect(() => {
        // useGetBrands();
        useGetOptionsValues();
    }, []);

    // useEffect(() => {
    //     console.log(valueOptionSelected);
    // }, [valueOptionSelected]);

    const handleClickValueOption = (valueOption = 0) => router.push(`/admin/valores-opciones/${valueOption}`);

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Valores Opciones</p>

            <div className="flex flex-col gap-4">
                {valuesOptions.map((valueOption) => (
                    <ItemDiv
                        key={valueOption.id}
                        title={valueOption.name}
                        data={[
                            { key: "Valor de opcion", value: valueOption.name },
                            { key: "Opcion asociada", value: valueOption.option },
                            { key: "Estado", value: valueOption.status == 1 ? "Activa" : "Inactiva" },
                        ]}
                        onClick={() => handleClickValueOption(valueOption.id)}
                    />
                ))}
            </div>
            <ButtonGrayDown fn={() => handleClickValueOption("crear")}>Crear Valor de Opcion</ButtonGrayDown>
        </div>
    );
};

export default page;
