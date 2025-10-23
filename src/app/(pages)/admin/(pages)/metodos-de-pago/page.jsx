"use client";

import Spacer from "@/app/components/home/Spacer";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import useRequestsBrands from "@/app/hooks/request/brands/useRequestsBrands";
import useRequestsPaymentMethods from "@/app/hooks/request/payment-methods/usePaymentMethods";
import { zusAdminBrands } from "@/app/zustand/admin/brands/zusAdminbrands";
import { zusAdminPaymentMethods } from "@/app/zustand/admin/payment-methods/zusPaymentMethods";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
    const router = useRouter();

    const { useGetBrands } = useRequestsBrands();

    // const { brands, setBrandSelected } = zusAdminBrands();

    const { useGetPaymentMethods, useCreatePaymentMethod, useUpdatePaymentMethod } = useRequestsPaymentMethods();

    const { paymentMethods, setPaymentMethodSelected } = zusAdminPaymentMethods();

    useEffect(() => {
        useGetPaymentMethods();
    }, []);

    useEffect(() => {
        console.log(paymentMethods);
    }, [paymentMethods]);

    const handleClickPayMethod = (idPaymentMethod = 0) => router.push(`/admin/metodos-de-pago/${idPaymentMethod}`);

    // return <LoadingParagraph />;

    return (
        <div className="m-4">
            <p className="text-center font-semibold text-xl">Metodos de pago</p>
            <Spacer space={25} />

            <div className="flex flex-col gap-4">
                {paymentMethods.map((paymentMethod) => (
                    <div key={paymentMethod.id} className="bg-gray-300 p-4 rounded-md" onClick={() => handleClickPayMethod(paymentMethod.id)}>
                        <p className="text-center font-semibold text-lg">{paymentMethod.name}</p>
                        <Spacer space={25} />
                        <div className="flex justify-between">
                            <p>Nombre:</p>
                            <p>{paymentMethod.name}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Descripcion:</p>
                            <p className="text-end">{paymentMethod.description}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Requiere imagen:</p>
                            <p>{paymentMethod.require_image == 1 ? "Si" : "No"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Estado:</p>
                            <p>{paymentMethod.status == 1 ? "Activo" : "Inactivo"}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div key={paymentMethod.id} onClick={() => handleClickPayMethod(paymentMethod.id)}>
                <p>id: {paymentMethod.id}</p>
                <p>name: {paymentMethod.name}</p>
                <p>description: {paymentMethod.description}</p>
                <p>description: {paymentMethod.description}</p>
                <p>type: {paymentMethod.type}</p>
                <p>status: {paymentMethod.status}</p>
            </div> */}
            <ButtonGrayDown fn={() => handleClickPayMethod(0)}>Crear Nuevo Modelo</ButtonGrayDown>
            {/* <button onClick={() => handleClickPayMethod()}>Crear metodo de pago</button> */}
        </div>
    );
};

export default page;
