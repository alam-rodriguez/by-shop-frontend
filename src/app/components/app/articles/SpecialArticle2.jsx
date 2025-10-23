import React from "react";

// Icons
import { Icon } from "@iconify/react";

const SpecialArticle2 = ({ img, articleDescrition, stars, votes, price, brand, link }) => {
    return (
        <div className="flex mb-96- h-32 overflow-hidden-">
            <img className="w-1/4 object-cover" src={img} alt="" />
            <div className="w-3/4 m-3">
                <p className="text-sm">{articleDescrition}</p>
                <div className="flex gap-1 items-center">
                    <p>{stars}</p>
                    <div className="flex">
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                        <Icon icon="material-symbols:star" className="text-orange-400" />
                    </div>
                    <p>{votes}</p>
                </div>
                <div className="flex items-center">
                    <p className="flex items-start">
                        <span>$</span>
                        <span className="text-2xl">{price}</span>
                        <span>59</span>
                    </p>
                    <div className="flex items-center">
                        <Icon icon="ic:round-check" className="text-orange-700 text-lg" />
                        <p className="text-blue-500">Prime</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialArticle2;
