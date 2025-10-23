"use client";

import { ButtonGrayDown } from "@/app/components/others/Buttons";
import ItemDiv from "@/app/components/others/ItemDiv";
import useRequestsBrands from "@/app/hooks/request/brands/useRequestsBrands";
import useRequestsModels from "@/app/hooks/request/models/useRequetsModels";
import { zusAdminBrands } from "@/app/zustand/admin/brands/zusAdminbrands";
import { zusAdminModels } from "@/app/zustand/admin/models/zusAdminModels";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
    const router = useRouter();

    // const { useGetBrands } = useRequestsBrands();
    const { useGetModels, useCreateModel, useUpdateModel } = useRequestsModels();

    // const { brands, setBrandSelected } = zusAdminBrands();
    const { models, setModelSelected } = zusAdminModels();

    useEffect(() => {
        // useGetBrands();
        useGetModels();
    }, []);

    useEffect(() => {
        console.log(models);
    }, [models]);

    const handleClickModel = (idModel = 0) => router.push(`/admin/modelos/${idModel}`);

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Lista de Modelos</p>

            <div className="flex flex-col gap-4">
                {models.map((model) => (
                    <ItemDiv
                        key={model.id}
                        title={model.name}
                        data={[
                            { key: "Modelo", value: model.name },
                            { key: "Marca", value: model.name_brand },
                            { key: "Descripcion", value: model.description },
                            { key: "Fecha de creacion", value: model.created_date.split("T")[0].split("-").reverse().join("/") },
                            { key: "Estado", value: model.status == 1 ? "Activa" : "Inactiva" },
                        ]}
                        img={model.image}
                        onClick={() => handleClickModel(model.id)}
                    />
                ))}
            </div>
            <ButtonGrayDown fn={() => handleClickModel("crear")}>Crear Nuevo Modelo</ButtonGrayDown>
        </div>
    );
};

export default page;
