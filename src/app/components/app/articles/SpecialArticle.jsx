import React from "react";

// Icons
import { Icon } from "@iconify/react";

const SpecialArticle = ({ imgBrand, imgArticle, descriptionArticle, stars, votes, hasOffer, nameOffer, discountOffer, priceArticle, priceWithOffer, store }) => {
    return (
        <div className="mx-4">
            <div>
                <div className="flex">
                    <img className="w-1/2 h-48 object-cover" src={imgBrand} alt="" />
                    <img className="w-1/2 h-48 object-cover" src={imgArticle} alt="" />
                </div>
                <div className="my-3">
                    <p>{descriptionArticle}</p>
                    <div className="flex items-center">
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                        <p>{votes}</p>
                    </div>
                    <div className="flex items-center gap-2 my-1">
                        <div className="py-1 px-2 bg-red-700 inline-block text-white">
                            <p>-{discountOffer}%</p>
                        </div>
                        <p>{nameOffer}</p>
                    </div>
                    <div className="flex gap-1 tracking-wider items-end my-1">
                        <p className="flex items-start">
                            <span>$</span>
                            <span className="text-2xl">{priceWithOffer}</span>
                            <span>99</span>
                        </p>
                        <span className="text-xl line-through">${priceArticle}</span>
                        <div className="flex items-center">
                            <Icon icon="ic:round-check" className="text-orange-700 text-lg" />
                            <p className="text-blue-500">prime</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialArticle;
