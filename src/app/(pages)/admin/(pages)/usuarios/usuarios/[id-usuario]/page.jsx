"use client";

// React
import React, { useEffect, useRef, useState } from "react";

// Next
import { useParams } from "next/navigation";

// Sonner
import { toast } from "sonner";

// React Hook Form
import { useForm } from "react-hook-form";

// Hooks
import {
    useChangeUserCanBuy,
    useChangeUserEmailVerified,
    useChangeUserType,
    useGetUserById,
    useSetShopAdmin,
    useSetShopSubAdmin,
} from "@/app/hooks/request/users/requestsUsers";
import { useGetShops } from "@/app/hooks/request/shops/requestsShops";

// Components
import Spacer from "@/app/components/home/Spacer";
import Select from "@/app/components/inputs/Select";

const page = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        reset,
    } = useForm();

    // const shopRef = useRef();
    // const adminShopsRef = useRef();
    // const subadminShopsRef = useRef();

    const { ["id-usuario"]: idUser } = useParams();

    const { data: user, isLoading } = useGetUserById(idUser);
    const { data: shops, isLoading: isLoadingShops } = useGetShops();

    useEffect(() => {
        console.log(shops);
    }, [shops]);

    const [showSelectShops, setShowSelectShops] = useState(false);
    const [showSelectShopsForMakeAdmin, setShowSelectShopsForMakeAdmin] = useState(false);
    const [showSelectShopsForMakeSubadmin, setShowSelectShopsForMakeSubadmin] = useState(false);

    const velidateEmail = async () => {
        const emailUser = user.email;

        const loadingToast = toast.loading("Verificando email...");

        const res = await useChangeUserEmailVerified(emailUser, 1);

        if (res)
            toast.success("Email verificado", {
                id: loadingToast,
            });
        else
            toast.error("Error al verificar el email", {
                id: loadingToast,
            });
    };

    const makeCantBuy = async () => {
        const idUser = user.id;
        const loadingToast = toast.loading("Cambiando usario a no puede comprar...");

        const res = await useChangeUserCanBuy(idUser, 0);

        if (res)
            toast.success("Usuario cambiado a no puede comprar", {
                id: loadingToast,
            });
        else
            toast.error("Error al cambiar el usuario a no puede comprar", {
                id: loadingToast,
            });
    };

    const makeShopAdmin = async () => {
        if (!showSelectShops) {
            setShowSelectShops(true);
            return;
        }
        const loadingToast = toast.loading("Cambiando usario a administrador...");

        const idUser = user.id;
        const emailUser = user.email;
        const idShopSelected = watch("id_shop");

        console.log(idUser);
        console.log(emailUser);
        console.log(idShopSelected);

        // console.log(idShopSelected);

        const { message, status } = await useSetShopAdmin(idUser, emailUser, idShopSelected);
        const res = await useChangeUserType(idUser, 2);
        console.log(status);
        console.log(message);

        if (status == 200 && res)
            toast.success("Usuario cambiado a adminstrador", {
                id: loadingToast,
            });
        else if (status == 400)
            toast.error(message, {
                id: loadingToast,
            });
    };

    const makeShopSubAdmin = async () => {
        if (!showSelectShops) {
            setShowSelectShops(true);
            return;
        }
        const loadingToast = toast.loading("Cambiando usario a sub administrador...");

        const idUser = user.id;
        const emailUser = user.email;
        const idShopSelected = watch("id_shop");

        const { message, status } = await useSetShopSubAdmin(emailUser, idShopSelected);
        const res = await useChangeUserType(idUser, 2);

        if (status == 200 && res)
            toast.success("Usuario cambiado a sub adminstrador", {
                id: loadingToast,
            });
        else if (status == 400)
            toast.error(message, {
                id: loadingToast,
            });
    };

    const makeSupport = async () => {
        const loadingToast = toast.loading("Cambiando usario a soporte...");

        const idUser = user.id;

        const res = await useChangeUserType(idUser, 4);

        if (res)
            toast.success("Usuario cambiado a soporte", {
                id: loadingToast,
            });
        else
            toast.error("Error al cambiar el usuario a soporte", {
                id: loadingToast,
            });
    };

    if (isLoading) return <>Cargando</>;
    return (
        <div className="m-4">
            <div key={user.id} className="bg-gray-300 p-4 rounded-md">
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
            <Spacer space={25} />
            <div className="flex gap-4 flex-col_justify-end flex-wrap">
                <button className="px-4 py-2 rounded bg-gray-200 self-end" onClick={velidateEmail}>
                    Verificar email
                </button>
                <button className="px-4 py-2 rounded bg-gray-200 self-end" onClick={makeCantBuy}>
                    Marcar no puede comprar
                </button>
                <button className="px-4 py-2 rounded bg-gray-200 self-end" onClick={makeShopAdmin}>
                    Marcar como Administrador de tienda
                </button>
                <button className="px-4 py-2 rounded bg-gray-200 self-end" onClick={makeShopSubAdmin}>
                    Marcar como SubAdministrador de tienda
                </button>
                <button className="px-4 py-2 rounded bg-gray-200 self-end" onClick={makeSupport}>
                    Marcar como Soporte
                </button>
            </div>

            <div>
                {showSelectShops && (
                    <Select
                        register={register}
                        errors={errors}
                        type="text"
                        name="id_shop"
                        items={shops ? shops : []}
                        selectClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        optionNameForShow="name"
                        label="Lista de tiendas"
                        control={control}
                        isMulti={false}
                    />
                )}
                {/* {showSelectShopsForMakeAdmin && (
                    <Select
                        register={register}
                        errors={errors}
                        type="text"
                        name="id_shop_for_admin"
                        items={shops ? shops : []}
                        selectClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        optionNameForShow="name"
                        label="Lista de tiendas"
                        control={control}
                        isMulti={false}
                    />
                )} */}
                {/* {showSelectShopsForMakeSubadmin && (
                    <Select
                        register={register}
                        errors={errors}
                        type="text"
                        name="id_shop_for_subadmin"
                        items={shops ? shops : []}
                        selectClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        optionNameForShow="name"
                        label="Lista de tiendas"
                        control={control}
                        isMulti={true}
                    />
                )} */}
            </div>
        </div>
    );
};

export default page;
