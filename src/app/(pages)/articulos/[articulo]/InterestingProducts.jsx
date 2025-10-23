import React, { useEffect } from "react";

// Icons
import { Icon } from "@iconify/react";

// Components
import Stars from "@/app/components/app/articles/Stars";
import useApp from "@/app/hooks/app/useApp";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

const InterestingProducts = ({ articlesCanBeInterested = [] }) => {
    useEffect(() => {
        console.log(articlesCanBeInterested);
    }, [articlesCanBeInterested]);

    return (
        <div className="m-4">
            <p className="text-2xl font-semibold tracking-tighter">Tambien podria interesarte</p>
            <div className="flex gap-4 overflow-x-scroll">
                {articlesCanBeInterested.map((article) => (
                    <Products
                        key={article.id}
                        id={article.id}
                        img={article.main_image}
                        description={article.description}
                        average={3.5}
                        reviews={1}
                        price={article.price}
                        shop={"Luis"}
                    />
                ))}
                {/* <Products
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    description="!14 ProMAX - Telefono celular..."
                    stars={4.4}
                    opinions={13}
                    price={159}
                    shop="Prime"
                /> */}
                {/* <Products
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    description="!14 ProMAX - Telefono celular..."
                    stars={4.4}
                    opinions={13}
                    price={159}
                    shop="Prime"
                /> */}
                {/* <Products
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    description="!14 ProMAX - Telefono celular..."
                    stars={4.4}
                    opinions={13}
                    price={159}
                    shop="Prime"
                /> */}
            </div>
        </div>
    );
};

export default InterestingProducts;

const Products = ({ id, img, description, stars, average, reviews, price, shop }) => {
    const { showPrice } = useApp();

    const router = useRouter();

    const handleClick = () => router.push(`/articulos/${id}`);

    return (
        <div className="h-72 w-40 min-w-40 bg-red-600-" onClick={handleClick}>
            <div className="text-white h-1/2">
                <img className="h-full w-full object-contain" src={img} alt="" />
            </div>
            <p className="text-blue-600 text-sm">{description}</p>
            <div className=" h-1/2">
                {reviews > 0 && (
                    <>
                        <div className="flex">
                            <Stars average={average} reviews={reviews} />
                        </div>
                        <p className="text-gray-400 flex gap-2 text-sm">
                            <span>{reviews}</span>
                            <span>opiniones</span>
                        </p>
                    </>
                )}
                <p className="flex items-start gap-1">
                    <span>US$</span>
                    <span className="text-xl font-bold">{showPrice(price, true)}</span>
                    <span>{showPrice(price, false)}</span>
                </p>
                <div className="flex items-center">
                    <Icon icon="iconamoon:check-bold" className="text-orange-400 text-xl" />
                    <p>{shop}</p>
                </div>
            </div>
        </div>
    );
};
