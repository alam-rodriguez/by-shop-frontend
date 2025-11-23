import React from "react";

// Components
import Skeleton from "./Skeleton";
import Spacer from "../home/Spacer";

const Home = () => {
    return (
        <div className="m-4 flex flex-col gap-5">
            <Skeleton className="w-full h-44 rounded-2xl" />
            <div className="flex gap-2">
                <Skeleton className="w-full h-10 rounded-lg" />
                <Skeleton className="w-full h-10 rounded-lg" />
                <Skeleton className="w-full h-10 rounded-lg" />
            </div>

            <div>
                <div className="flex gap-10">
                    <Skeleton className="w-1/2 h-6 rounded-md" />
                    <Skeleton className="w-1/2 h-6 rounded-md" />
                </div>
                <Spacer space={15} />
                <div className="flex gap-6 justify-between">
                    <Skeleton className="w-full h-64 rounded-2xl" />
                    <Skeleton className="w-full h-64 rounded-2xl" />
                </div>
                <Spacer space={15} />
                <div className="flex gap-6 justify-between">
                    <Skeleton className="w-full h-64 rounded-2xl" />
                    <Skeleton className="w-full h-64 rounded-2xl" />
                </div>
            </div>
            {/* <Skeleton className="w-full h-44 rounded-2xl" /> */}
            {/* <Skeleton className="w-full h-44 rounded-2xl" /> */}
        </div>
    );
};

export default Home;
