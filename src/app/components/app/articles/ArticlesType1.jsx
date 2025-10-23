import React from "react";

// hooks
import useApp from "@/app/hooks/app/useApp";

const ArticlesType1 = ({ img, title, price, link }) => {
    const { showText } = useApp();

    return (
        <div className="h-72" style={{ width: "calc(50% - 10px)" }}>
            <img className="h-5/6 object-cover rounded-md" src={img} alt="" />
            <div className="h-1/6">
                <p>{showText(title, 23)}</p>
                <p>
                    DOP$ <span>{price}</span> 00
                </p>
            </div>
        </div>
    );
};

export default ArticlesType1;
