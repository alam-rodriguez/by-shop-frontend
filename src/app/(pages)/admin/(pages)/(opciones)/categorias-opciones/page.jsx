"use client";
import React, { useEffect } from "react";

// Hooks
import { useGetOptionCategories } from "@/app/hooks/request/options/requestsOptions";

// Router
import { useRouter } from "next/navigation";
import ItemDiv from "@/app/components/others/ItemDiv";
import { ButtonGrayDown } from "@/app/components/others/Buttons";

const page = () => {
    const router = useRouter();

    const { data, isLoading } = useGetOptionCategories();

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleClickValueOption = (id = 0) => router.push(`/admin/categorias-opciones/${id}`);

    if (isLoading) return <p>cargando...</p>;

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Categorias de Opciones</p>

            <div className="flex flex-col gap-4">
                {data.map((optionCategory) => (
                    <ItemDiv
                        key={optionCategory.id}
                        title={optionCategory.name}
                        data={[
                            { key: "Nombre", value: optionCategory.name },
                            { key: "Estado", value: optionCategory.status == 1 ? "Activa" : "Inactiva" },
                        ]}
                        onClick={() => handleClickValueOption(optionCategory.id)}
                    />
                ))}
            </div>
            <ButtonGrayDown fn={() => handleClickValueOption("crear")}>Crear Nuevo Modelo</ButtonGrayDown>
        </div>
    );
};

export default page;
