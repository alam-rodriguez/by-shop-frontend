"use client";

// React
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

// Hooks
import { useGetUserAddresses, useSetUserAddressPreferred } from "@/app/hooks/request/users/requestsUsersAddresses";

// Components
import ArrowButton from "@/app/components/others/buttons/ArrowButton";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import Spacer from "@/app/components/home/Spacer";
import Divider from "@/app/components/home/Divider";
import { toast } from "sonner";

const page = () => {
    const { id } = zusUser();

    const router = useRouter();

    const { data: addresses, isLoading: isLoadingAddresses, refetch } = useGetUserAddresses(id);

    const handleSetPreferredAddress = async (idAddress) => {
        const res = await useSetUserAddressPreferred(id, idAddress);
        if (res) toast.success("Direccion establecida como preferida");
        else toast.error("Error al establecer la direccion como preferida");
        refetch();
    };

    if (isLoadingAddresses || !addresses) return <LoadingParagraph />;
    return (
        <div className="m-4">
            <p className="text-2xl font-bold">Tus direcciones</p>
            <ArrowButton text="Agregar una direccion nueva" link="/usuario/direcciones/0" />
            <ArrowButton text="Agregar una nueva ubicacion de recoleccion" link="/usuario/direcciones/0" />
            <p className="text-xl font-bold">Tus direcciones</p>

            <div className="flex flex-col gap-4">
                {addresses.map((address) => (
                    <div href={`/usuario/direcciones/${address.id}`} key={address.id} className="p-2 border border-gray-300 rounded-lg">
                        {address.preferred_address == 1 && (
                            <>
                                <p>{address.preferred_address == 1 ? "Direccion principal" : "Otra direccion"}</p>
                                <Divider mt={8} mb={3} h={"0.1px"} />
                            </>
                        )}

                        <p className="font-bold">{address.full_name}</p>
                        <p>{address.address_1}</p>
                        <p>{address.address_2}</p>
                        <p>{address.country}</p>
                        <p>Numero de telefono: {address.number}</p>
                        <Spacer space={8} />
                        <div className="flex gap-x-4 gap-y-1 flex-wrap">
                            <button
                                className="border border-gray-400 text-gray-700 rounded-full px-4 py-2 text-sm"
                                onClick={() => router.push(`/usuario/direcciones/${address.id}`)}
                            >
                                Editar
                            </button>
                            <button className="border border-gray-400 text-gray-700 rounded-full px-4 py-2 text-sm">Descartar</button>
                            {address.preferred_address == 0 && (
                                <button
                                    className="border border-gray-400 text-gray-700 rounded-full px-4 py-2 text-sm"
                                    onClick={() => handleSetPreferredAddress(address.id)}
                                >
                                    Establecer como predeterminada
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default page;
