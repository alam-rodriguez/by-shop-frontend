"use client";

// React
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Hooks
import { getDeliveryApplication } from "@/app/hooks/request/applications/requestsDeliveriesApplications";
import { getDateInSpanish } from "@/app/hooks/app/app";

// Components
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import ItemDiv from "@/app/components/others/ItemDiv";
import { zusUser } from "@/app/zustand/user/zusUser";

const page = () => {
    const router = useRouter();

    const { id: userId } = zusUser();

    const { data = [], isLoading } = getDeliveryApplication(userId);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleClickApplication = (applicationId = 0) => router.push(`/deliveries/solicitudes/${applicationId}`);

    if (isLoading) return <LoadingParagraph />;

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Solicitudes Para ser delivery</p>
            <div className="flex flex-col gap-4">
                {data.map((application) => (
                    <ItemDiv
                        key={application.id}
                        data={[
                            { key: "Nombre Completo", value: application.full_name },
                            { key: "Tipo de Vehiculo", value: application.vehicle_type },
                            { key: "Marca de Vehiculo", value: application.vehicle_brand },
                            { key: "Modelo de Vehiculo", value: application.vehicle_model },
                            { key: "Estado de Solicitud", value: application.status },
                            { key: "Fecha de Solicitud", value: getDateInSpanish(application.created_at) },
                        ]}
                        onClick={() => handleClickApplication(application.id)}
                    />
                ))}
            </div>

            <ButtonGrayDown fn={() => handleClickApplication(0)}>Crear Solicitud</ButtonGrayDown>
        </div>
    );
};

export default page;
