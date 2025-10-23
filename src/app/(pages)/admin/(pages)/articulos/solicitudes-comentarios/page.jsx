"use client";
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Hooks
import { useGetRequestsReviews, useGetRequestsReviewsByShop } from "@/app/hooks/request/articles/requestsArticlesReviews";

// Zusand
import { zusUser } from "@/app/zustand/user/zusUser";

// Components
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import Spacer from "@/app/components/home/Spacer";
import ItemDiv from "@/app/components/others/ItemDiv";

const page = () => {
    const router = useRouter();

    const { id_shop, name_shop, type } = zusUser();

    const { data, isLoading } = useGetRequestsReviews();

    const { data: dataByShop, isLoading: isLoadingByShop } = useGetRequestsReviewsByShop(id_shop);

    // useEffect(() => {
    //     console.error(id_shop);
    // }, [id_shop]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        if (isLoadingByShop) return;
        console.log(dataByShop);
    }, [dataByShop, isLoadingByShop]);

    const handleClickSolicitud = (idSolicitud = 0) => router.push(`/admin/articulos/solicitudes-comentarios/${idSolicitud}`);

    // TODO: esto da error
    if (isLoading || isLoadingByShop) return <LoadingParagraph />;

    return (
        <div className="m-4">
            <p className="text-center mb-3 font-bold text-xl">Solicitudes de comentarios</p>
            <div className="flex flex-col gap-4">
                {type == 4 || type == 5
                    ? data.map((requestReview) => (
                          <ItemDiv
                              key={requestReview.id}
                              title={requestReview.user_name}
                              data={[
                                  { key: "Titulo", value: requestReview.title },
                                  { key: "Comentario", value: requestReview.comment },
                                  { key: "Articulo", value: requestReview.article_name },
                                  { key: "Puntuacion", value: requestReview.rating },
                                  { key: "Nombre publico para comentario", value: requestReview.user_public_name },
                                  { key: "Tiene imagenes", value: requestReview.images.length > 0 ? "Si" : "No" },
                                  { key: "Fecha de creacion", value: requestReview.created_at.split("T")[0].split("-").reverse().join("/") },
                              ]}
                              onClick={() => handleClickSolicitud(requestReview.id)}
                          />
                      ))
                    : dataByShop?.map((requestReview) => (
                          <ItemDiv
                              key={requestReview.id}
                              title={requestReview.user_name}
                              data={[
                                  { key: "Titulo", value: requestReview.title },
                                  { key: "Comentario", value: requestReview.comment },
                                  { key: "Articulo", value: requestReview.article_name },
                                  { key: "Puntuacion", value: requestReview.rating },
                                  { key: "Nombre publico para comentario", value: requestReview.user_public_name },
                                  { key: "Tiene imagenes", value: requestReview.images.length > 0 ? "Si" : "No" },
                                  { key: "Fecha de creacion", value: requestReview.created_at.split("T")[0].split("-").reverse().join("/") },
                              ]}
                              onClick={() => handleClickSolicitud(requestReview.id)}
                          />
                      ))}
            </div>
        </div>
    );
};

export default page;
