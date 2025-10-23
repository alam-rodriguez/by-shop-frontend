import React from "react";

const ArticlesSection2 = () => {
    return (
        <div className="mb-96 m-4">
            <p className="my-2 font-bold text-xl">Las mejores selecciones para republica dominicana</p>
            <div>
                <Articles
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    articleDescription="DEWALK Kit combo de perforacion inalambrico de 20V MAX, 2 Herrami..."
                    price="239.00"
                    hasOffer={true}
                    priceWithOffer={17}
                />
                <Articles
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    articleDescription="DEWALK Kit combo de perforacion inalambrico de 20V MAX, 2 Herrami..."
                    price="239.00"
                    hasOffer={true}
                    priceWithOffer={17}
                />
                <Articles
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    articleDescription="DEWALK Kit combo de perforacion inalambrico de 20V MAX, 2 Herrami..."
                    price="239.00"
                    hasOffer={true}
                    priceWithOffer={17}
                />
            </div>
        </div>
    );
};

export default ArticlesSection2;

const Articles = ({ img, articleDescription, price, hasOffer, priceWithOffer }) => {
    return (
        <div className="flex">
            <img className="w-1/4 object-cover rounded-md" src={img} alt="" />
            <div className="items-center w-3/4 m-3">
                <p className="text-sm">{articleDescription}</p>
                <div className="flex">
                    <p className="flex items-start">
                        <span>US$</span>
                        <span className="text-xl">{priceWithOffer}</span>
                        <span>59</span>
                        <span className="text-xl">
                            PVPR:
                            <span className="line-through">US${price}</span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
