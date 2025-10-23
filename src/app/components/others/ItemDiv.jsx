import React from "react";

// Components
import Spacer from "../home/Spacer";
import ImageA from "./ImageA";

const ItemDiv = ({ title, data = [], img, onClick = () => {} }) => {
    return (
        <div className="bg-gray-300 p-4 rounded-md" onClick={onClick}>
            {title && (
                <>
                    <p className="text-center">{title}</p>
                    <Spacer space={25} />
                </>
            )}

            {data?.map((item, index) => (
                <div key={index} className="flex justify-between">
                    <p className="text-start">{item.key}:</p>
                    <p className="text-end">{item.value}</p>
                </div>
            ))}
            <Spacer space={10} />

            {img && <ImageA className="rounded-lg" src={img} alt={title} />}
        </div>
    );
};

export default ItemDiv;
