import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Icons
import { Icon } from "@iconify/react";

// Components
import Stars from "@/app/components/app/articles/Stars";
import Divider from "@/app/components/home/Divider";
import Review from "./Review";

// Hooks
import useApp from "@/app/hooks/app/useApp";
import { useGetArticleReviewsData } from "@/app/hooks/request/articles/requestsArticlesReviews";

const FeaturedReviews = ({ idArticle, reviews = [] }) => {
    const router = useRouter();

    const { data, isLoading } = useGetArticleReviewsData(idArticle);

    if (isLoading) return null;

    return (
        <>
            {/* <Divider h={2.5} /> */}
            {data.total_reviews > 0 && (
                <>
                    <div className="m-4 flex items-center justify-between">
                        <div className="">
                            <p className="text-lg font-semibold mb-2">Reseñas de clientes</p>
                            <div className="flex items-center gap-1 mb-2">
                                <Stars average={data.average_rating} showCountStart={false} showCountReviews={false} size={24} />
                                <p>{data.average_rating.slice(0, 3)} de 5</p>
                            </div>
                            <p className="text-gray-500 text-xs">{data.total_reviews} reseñas</p>
                        </div>
                        {/* <Icon icon="weui:arrow-outlined" width="16" height="28" /> */}
                    </div>
                    <div className="m-4">
                        <Divider h={2.5} />
                        <p className="text-lg font-semibold mb-10">Opiniones destacadas</p>

                        <div className="flex flex-col gap-10">
                            {reviews.map((review) => (
                                <Review
                                    key={review.id}
                                    clientName={review.user_public_name}
                                    stars={review.rating}
                                    reviewTitle={review.title}
                                    reviewContent={review.comment}
                                    reviewDate={review.created_at}
                                    options={review.options}
                                    images={review.images}
                                    utilCount={review.utilCount}
                                    status={review.status}
                                />
                            ))}
                        </div>
                    </div>
                    <Divider h={2.5} mt={50} />
                    <div className="m-4 flex justify-between items-center">
                        <p className="font-semibold">Ver mas opiniones</p>
                        <Icon className="text-xl" icon="uiw:right" />
                    </div>
                    <Divider h={2.5} />
                </>
            )}
            <div className="flex flex-col m-4 gap-2">
                {/* <button className="flex justify-between items-center border py-3 px-4 border-black rounded-full">
                    <span>Crea una reseña en video</span>
                    <Icon className="text-xl" icon="uiw:right" />
                </button> */}
                <button
                    className="flex justify-between items-center border py-3 px-4 border-black rounded-full"
                    onClick={() => router.push(`/articulos/${idArticle}/mi-opinion`)}
                >
                    <span>Crea una reseña con fotos</span>
                    <Icon className="text-xl" icon="uiw:right" />
                </button>
                <button
                    className="flex justify-between items-center border py-3 px-4 border-black rounded-full"
                    onClick={() => router.push(`/articulos/${idArticle}/mi-opinion`)}
                >
                    <span>Escribir una opinion</span>
                    <Icon className="text-xl" icon="uiw:right" />
                </button>
            </div>
        </>
    );
};

export default FeaturedReviews;
