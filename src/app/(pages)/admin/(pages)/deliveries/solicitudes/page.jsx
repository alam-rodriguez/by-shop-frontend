"use client";

// React
import React from "react";

// Next
import { useRouter } from "next/navigation";

// Hooks
import { getAllDeliveriesApplication } from "@/app/hooks/request/applications/requestsDeliveriesApplications";
import { getDateInSpanish } from "@/app/hooks/app/app";

// Components
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import ItemDiv from "@/app/components/others/ItemDiv";

const page = () => {
    const router = useRouter();

    const { data, isLoading } = getAllDeliveriesApplication();

    const handleClick = (id = 0) => router.push(`/deliveries/solicitudes/${id}`);

    if (isLoading) return <LoadingParagraph />;

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Solicitudes para ser delivery</p>
            <div className="flex flex-col gap-4">
                {data.map((application) => (
                    <ItemDiv
                        key={application.id}
                        data={[
                            { key: "Nombre", value: application.full_name },
                            { key: "Cedula", value: application.full_name },
                            { key: "Telefono", value: application.phone_number },
                            { key: "Correo", value: application.email },
                            { key: "Estado", value: application.status },
                            { key: "Fecha Solicitud", value: getDateInSpanish(application.created_at) },
                        ]}
                        img={application.image_from_dni}
                        onClick={() => handleClick(application.id)}
                    />
                ))}
            </div>

            <ButtonGrayDown fn={() => handleClick(0)}>Crear nueva moneda</ButtonGrayDown>
        </div>
    );
};

export default page;
