"use client";

// React
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Hooks
import { getUsersShop, useGetUsers } from "@/app/hooks/request/users/requestsUsers";

// Components
import Spacer from "@/app/components/home/Spacer";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { zusUser } from "@/app/zustand/user/zusUser";
import { ButtonGrayDown } from "@/app/components/others/Buttons";

const page = () => {
    const { shop_id: shopId, userTypeName } = zusUser();

    // const { data, isLoading } = useGetUsers();

    const { data, isLoading } = useGetUsers();
    const { data: usersShop, isLoading: isLoadingUsersShop } = getUsersShop(shopId);

    const router = useRouter();

    useEffect(() => {
        console.log(data);
    }, [data]);

    if (isLoading) return <LoadingParagraph />;

    const handleClickUser = (idUser = 0) => router.push(`/admin/usuarios/usuarios/${idUser}`);

    if (userTypeName == "DEV")
        return (
            <div className="m-4">
                <div className="flex flex-col gap-4">
                    <p className="text-center font-bold text-lg">Listado de usuarios</p>
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

    return (
        <div className="m-4">
            <div className="flex flex-col gap-4">
                <p className="text-center font-bold text-lg">Listado de usuarios</p>
                {usersShop &&
                    usersShop.map((user) => (
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
            <ButtonGrayDown fn={() => router.push("/admin/usuarios/buscar")}>Agregar nuevo usuario</ButtonGrayDown>
        </div>
    );
};

export default page;
