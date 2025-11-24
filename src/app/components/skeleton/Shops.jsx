import React from "react";

// Components
import Skeleton from "./Skeleton";
import Spacer from "../home/Spacer";

const Shops = () => {
    return (
        <div className="m-4">
            <Skeleton className="w-2/4 h-6 rounded-lg" />
            <Spacer />
            <div className="flex flex-col gap-4">
                <Skeleton className="w-full h-28 rounded-lg" />
                <Skeleton className="w-full h-28 rounded-lg" />
                <Skeleton className="w-full h-28 rounded-lg" />
                <Skeleton className="w-full h-28 rounded-lg" />
                <Skeleton className="w-full h-28 rounded-lg" />
                <Skeleton className="w-full h-28 rounded-lg" />
            </div>
        </div>
    );
};

export default Shops;
