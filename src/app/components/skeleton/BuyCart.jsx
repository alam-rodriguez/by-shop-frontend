import React from "react";

// Components
import Skeleton from "./Skeleton";

const BuyCart = () => {
    return (
        <div className="m-4 flex flex-col gap-4">
            <Skeleton className="w-full h-10 rounded-xl" />
            <Skeleton className="w-full h-10 rounded-xl" />
            <Skeleton className="w-full h-64 rounded-xl" />
            <Skeleton className="w-full h-10 rounded-xl" />
            <Skeleton className="w-full h-64 rounded-xl" />
        </div>
    );
};

export default BuyCart;
