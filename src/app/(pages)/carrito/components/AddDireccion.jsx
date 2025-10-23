import React from "react";

// Next
import { useRouter } from "next/navigation";

// Components
import Divider from "@/app/components/home/Divider";
import Spacer from "@/app/components/home/Spacer";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

// Hooks
import { useChangeUserWantUseAddress, useRequestsUsers } from "@/app/hooks/request/users/requestsUsers";

const AddDireccion = () => {
    const router = useRouter();

    const { useGetUserInformation } = useRequestsUsers();

    const { id } = zusUser();

    const handleChangeUserWantUseAddress = async () => {
        const res = await useChangeUserWantUseAddress(id, 0);
        console.log(res);
        useGetUserInformation();
    };

    return (
        <>
            <div className="m-4">
                <p className="font-semibold text-2xl tracking-tight">Selecciona una direccion de entrega</p>
                <Spacer space={15} />
                <p className="font-semibold text-lg">Todas las direcciones (0)</p>
            </div>
            <Divider />
            <div className="m-4">
                <p className="font-semibold text-lg">Agregar direccion de entrega o recoleccion</p>
                <Spacer space={10} />
                <button
                    className="bg-yellow-400 border border-black p-2 text-xs rounded-full border-none w-full"
                    onClick={() => router.push("/usuario/direcciones/0")}
                >
                    agregar una nueva direccion de entrega
                </button>
                <Spacer space={10} />
                <button className="border border-gray-500 p-2 text-xs rounded-full w-full" onClick={handleChangeUserWantUseAddress}>
                    Voy a recoger yo mismo el pedido
                </button>
            </div>
            <Divider />
            <div>
                <div className="flex justify-between gap-2 items-center">
                    <Divider />
                    <span className="text-gray-400">o</span>
                    <Divider />
                </div>
                <p className="text-center text-violet-600" onClick={() => router.back()}>
                    Volver al carrito
                </p>
            </div>
        </>
    );
};

export default AddDireccion;
