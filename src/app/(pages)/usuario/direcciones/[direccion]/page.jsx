"use client";

// React
import React, { useEffect } from "react";

// Next
import { useParams, useRouter } from "next/navigation";

// React Hook Form
import { useForm } from "react-hook-form";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";

// Alerts
import { toast } from "sonner";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

// Hooks
import { useCreateAddress, useRequestsUsers } from "@/app/hooks/request/users/requestsUsers";
import {
    useGetAddressById,
    useSetUserAddressPreferred,
    useUpdateAddress,
    useUserAddressCanBePreferred,
} from "@/app/hooks/request/users/requestsUsersAddresses";

// Schemas
import userAddressSchema from "@/app/schemas/userAddress.schema";

// Components
import Divider from "@/app/components/home/Divider";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";

const page = () => {
    const { direccion: idAddress } = useParams();
    const wantCreate = idAddress === "0";

    const router = useRouter();

    const { id } = zusUser();

    const { useGetUserInformation } = useRequestsUsers();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        setValue,
        getValues,
        reset,
    } = useForm({
        defaultValues: {},
        resolver: zodResolver(userAddressSchema),
    });

    useEffect(() => {
        if (id != "") setValue("id_user", id);
    }, [id]);

    const { data: address, isLoading: isLoadingAddress } = useGetAddressById(idAddress);

    useEffect(() => {
        if (isLoadingAddress || !address) return;
        reset(address);
        setValue("preferred_address", address.preferred_address === 1);
    }, [address]);

    const create = async (data) => {
        const loadingToast = toast.loading("Guardando direccion...");

        const res = await useCreateAddress(data);
        if (res) {
            toast.success("Direccion guardada", {
                id: loadingToast,
            });
            useGetUserInformation();
            router.back();
        } else {
            toast.error("Error al guardar la direccion", {
                id: loadingToast,
            });
        }
    };
    const update = async (data) => {
        const loadingToast = toast.loading("Actualizando direccion...");

        const res = await useUpdateAddress(idAddress, data);
        if (res)
            toast.success("Direccion actualizada", {
                id: loadingToast,
            });
        else
            toast.error("Error al actualizar la direccion", {
                id: loadingToast,
            });
    };

    const onSubmit = async (data) => {
        if (data.preferred_address) {
            const can = await useUserAddressCanBePreferred(id, idAddress);
            if (!can) {
                toast.error("Ya tienes una direccion preferida");
                return;
            }
        }
        if (wantCreate) create(data);
        else update(data);
    };

    if (isLoadingAddress) return <LoadingParagraph />;
    return (
        <form className="m-4" onSubmit={handleSubmit(onSubmit)}>
            <p className="font-semibold">Ingresa una nueva direccion de envio</p>
            <Select
                register={register}
                errors={errors}
                type="text"
                name="country"
                items={[{ id: "Republica Dominicana", name: "Republica Dominicana" }]}
                selectClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                optionNameForShow="name"
                label="Pais"
            />
            <Input
                register={register}
                errors={errors}
                type="text"
                name="full_name"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder=""
                label="Nombre completo (nombre y apellido)"
            />
            <Input
                register={register}
                errors={errors}
                type="text"
                name="number"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder=""
                label="Numero de telefono"
            />
            <p className="text-xs mt-2">Se puede utilizar para ayudar a la entrega</p>
            <Input
                register={register}
                errors={errors}
                type="text"
                name="address_1"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder="Nombre de la calle"
                label="Linea de direccion 1"
            />
            <Input
                register={register}
                errors={errors}
                type="text"
                name="address_2"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder="Departamento, piso, unidad, edificio (opcional)"
                label="Linea de direccion 2"
            />
            <Input
                register={register}
                errors={errors}
                type="text"
                name="neighborhood"
                inputClassName="border-2 border-gray-300 rounded-md p-2"
                errorClassName="text-red-700"
                placeholder=""
                label="Barrio"
            />
            <div className="flex gap-2">
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="province"
                    items={[{ id: 1, name: "Republica Dominicana" }]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2 h-full_ h-11"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Provincia"
                    width="48%"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="postal_code"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Codigo postal"
                    width="48%"
                />
            </div>
            <Input
                register={register}
                errors={errors}
                type="checkbox"
                name="preferred_address"
                divClassName="flex gap-2 mt-5 items-center"
                inputClassName="border-2 border-gray-300 rounded-md p-2 h-6 w-6"
                errorClassName="text-red-700"
                placeholder=""
                label="Marcar como direccion preferida"
            />
            <Divider />
            <button className="bg-yellow-400 border border-black p-3 text-base rounded-full border-none w-full">Usar esta direccion</button>
        </form>
    );
};

export default page;
