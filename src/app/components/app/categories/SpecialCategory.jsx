import React from "react";

const SpecialCategory = ({ text, img }) => {
    return (
        <div className="mx-4">
            <div>
                <p className="my-2 font-bold text-xl tracking-wide">{text}</p>
                <img className="w-full h-96 object-cover rounded-xl" src={img} alt="" />
            </div>
        </div>
    );
};

export default SpecialCategory;
