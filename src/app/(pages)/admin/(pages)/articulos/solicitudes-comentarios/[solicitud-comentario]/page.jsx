"use client";
import React, { useEffect } from "react";

// Next
import { useRouter, useParams } from "next/navigation";

// Sonner
import { Toaster, toast } from "sonner";

// Hooks
import { useChangeReviewStatus, useGetReviewArticle } from "@/app/hooks/request/articles/requestsArticlesReviews";

// Components
import Review from "@/app/(pages)/articulos/[articulo]/Review";

const page = () => {
    const router = useRouter();

    const { ["solicitud-comentario"]: solicitudComentario } = useParams();

    const { data, isLoading } = useGetReviewArticle(solicitudComentario);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const rechazarSolicitud = async () => {
        const loadingToast = toast.loading("Rechazando solicitud...");

        const res = await useChangeReviewStatus(data.id, 0);
        if (res)
            toast.success("Solicitud rechazada", {
                id: loadingToast,
            });
        else
            toast.error("Error al rechazar la solicitud", {
                id: loadingToast,
            });
    };
    const publicarSolicitud = async () => {
        const loadingToast = toast.loading("Publicando solicitud...");
        const res = await useChangeReviewStatus(data.id, 2);
        if (res)
            toast.success("Solicitud publicada", {
                id: loadingToast,
            });
        else
            toast.error("Error al publicar la solicitud", {
                id: loadingToast,
            });
    };

    if (isLoading) return <>Cargando</>;

    return (
        <div className="m-4">
            <p className="text-xl font-bold mb-4">Previsualización de la reseña</p>
            <div className="bg-gray-200/50 p-4 rounded-lg">
                <Review
                    clientName={data.user_public_name}
                    stars={data.rating}
                    reviewTitle={data.title}
                    reviewContent={data.comment}
                    reviewDate={data.created_at}
                    options={data.options}
                    images={data.images}
                    utilCount={data.utilCount}
                    status={data.status}
                />
            </div>
            <div className="flex justify-end mt-4 gap-4">
                <button onClick={rechazarSolicitud} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                    No publicar
                </button>
                <button onClick={publicarSolicitud} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Publicar
                </button>
            </div>
        </div>
    );
};

export default page;
