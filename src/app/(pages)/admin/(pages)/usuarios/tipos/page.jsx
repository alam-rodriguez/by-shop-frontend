"use client";

// React
import React from "react";

// Next
import { useRouter } from "next/navigation";

// Hooks
import { useGetUsersTypes } from "@/app/hooks/request/users/requestsUsersTypes";

// Components
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import ItemDiv from "@/app/components/others/ItemDiv";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";

const page = () => {
    const { data, isLoading } = useGetUsersTypes();

    const router = useRouter();

    const handleClickTypeUser = (idTypeUser = 0) => router.push(`/admin/usuarios/tipos/${idTypeUser}`);

    if (isLoading) return <LoadingParagraph />;
    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Tipos de usuarios</p>
            <div className="flex flex-col gap-4">
                {data.map((userType) => (
                    <ItemDiv
                        key={userType.id}
                        data={[
                            { key: "Nombre", value: userType.name },
                            { key: "Descripcion", value: userType.description },
                            { key: "Estado", value: userType.status == 1 ? "Activo" : "Inactivo" },
                        ]}
                        onClick={() => handleClickTypeUser(userType.id)}
                    />
                ))}
            </div>

            <ButtonGrayDown fn={() => handleClickTypeUser(0)}>Crear nuevo tipo de usuario</ButtonGrayDown>
        </div>
    );
};

export default page;
