import React from "react";

// Components
import Spacer from "@/app/components/home/Spacer";
import useApp from "@/app/hooks/app/useApp";
import Stars from "@/app/components/app/articles/Stars";
import { useRouter } from "next/navigation";

const SimilarProducts = ({ isLoading, similarProducts = [] }) => {
    if (isLoading) return null;
    if (similarProducts.length == 0) return null;
    return (
        <div className="m-4">
            <p className="text-xl font-semibold mb-1">Productos similares</p>
            <Spacer space={15} />
            <div className="flex justify-between flex-wrap">
                {similarProducts.map((article) => (
                    <SimilarProduct
                        key={article.id}
                        idArticle={article.id}
                        img={article.main_image}
                        text={article.description}
                        price={article.price}
                        average={4}
                        reviews={1}
                    />
                ))}
                {/* <SimilarProduct /> */}
                {/* <SimilarProduct /> */}
                {/* <SimilarProduct /> */}
            </div>
        </div>
    );
};

export default SimilarProducts;

const SimilarProduct = ({ idArticle, img, text, price, average, reviews }) => {
    const router = useRouter();

    const { showPrice, showText } = useApp();

    return (
        <div className="h-80" style={{ width: "calc(50% - 5px)" }} onClick={() => router.push(`/articulos/${idArticle}`)}>
            <div className="h-4/6 rounded-md bg-slate-200/50 grid place-items-center p-3">
                <img src={img} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="h-2/6">
                <Spacer space={8} />
                <p className="leading-4">{showText(text, 43)}</p>
                <Spacer space={4} />
                <Stars average={average} reviews={reviews} showAverage={false} />
                <p className="flex items-start">
                    {/* {offerArticle.id && <span className="text-red-700 text-3xl me-2">-{offerArticle.percent_discount.split(".")[0]}%</span>} */}
                    <span>us$</span>
                    <span className="text-2xl">{showPrice(price, true)}</span>
                    <span>{showPrice(price, false)}</span>
                </p>
            </div>
        </div>
    );
};
