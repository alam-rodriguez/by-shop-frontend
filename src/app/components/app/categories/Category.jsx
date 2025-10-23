import React from "react";

const Category = ({ text, img1, img2, img3, img4, img5, img6, img7, img8, img9 }) => {
    return (
        <div className="mx-4">
            <p className="my-2 font-bold text-xl">{text}</p>
            <div className="flex flex-wrap justify-between">
                <img className="w-1/3- h-32 object-cover mb-2" style={{ width: "calc(33.333333% - 10px)" }} src={img1} alt="" />
                <img className="w-1/3- h-32 object-cover mb-2" style={{ width: "calc(33.333333% - 10px)" }} src={img1} alt="" />
                <img className="w-1/3- h-32 object-cover mb-2" style={{ width: "calc(33.333333% - 10px)" }} src={img1} alt="" />
                <img className="w-1/3- h-32 object-cover mb-2" style={{ width: "calc(33.333333% - 10px)" }} src={img1} alt="" />
                <img className="w-1/3- h-32 object-cover mb-2" style={{ width: "calc(33.333333% - 10px)" }} src={img1} alt="" />
                <img className="w-1/3- h-32 object-cover mb-2" style={{ width: "calc(33.333333% - 10px)" }} src={img1} alt="" />
                <img className="w-1/3- h-32 object-cover mb-2" style={{ width: "calc(33.333333% - 10px)" }} src={img1} alt="" />
                <img className="w-1/3- h-32 object-cover mb-2" style={{ width: "calc(33.333333% - 10px)" }} src={img1} alt="" />
                <img className="w-1/3- h-32 object-cover mb-2" style={{ width: "calc(33.333333% - 10px)" }} src={img1} alt="" />
            </div>
        </div>
    );
};

export default Category;
