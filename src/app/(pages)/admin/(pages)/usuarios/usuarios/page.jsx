"use client";

// React
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Hooks
import { useGetUsers } from "@/app/hooks/request/users/requestsUsers";

// Components
import Spacer from "@/app/components/home/Spacer";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";

const page = () => {
    const { data, isLoading } = useGetUsers();

    const router = useRouter();

    useEffect(() => {
        console.log(data);
    }, [data]);

    if (isLoading) return <LoadingParagraph />;

    const handleClickUser = (idUser = 0) => router.push(`/admin/usuarios/usuarios/${idUser}`);

    return (
        <div className="m-4">
            <div className="flex flex-col gap-4">
                {data.map((user) => (
                    <div key={user.id} className="bg-gray-300 p-4 rounded-md" onClick={() => handleClickUser(user.id)}>
                        <p className="text-center">
                            {user.first_name} {user.last_name}
                        </p>
                        <Spacer space={25} />
                        <div className="flex justify-between">
                            <p>Email:</p>
                            <p>{user.email}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Email verificado:</p>
                            <p>{user.email_verified == 1 ? "Si" : "No"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Estado:</p>
                            <p>{user.status == 1 ? "Activo" : "Inactivo"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Tipo de usuario:</p>
                            <p>{user.type == 1 ? "Normal" : "Administrador"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Puede comprar:</p>
                            <p>{user.can_buy == 1 ? "Si" : "No"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Fecha de registro:</p>
                            <p>{user.created_at.split("T")[0].split("-").reverse().join("-")}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default page;
