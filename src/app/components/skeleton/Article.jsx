import React from "react";

// Components
import Skeleton from "./Skeleton";
import Spacer from "../home/Spacer";

const Article = () => {
    return (
        <>
            <Skeleton className="w-full h-80" />
            <Spacer space={10} />
            <div className="p-4 w-full flex flex-col gap-4">
                <div className="flex flex-col gap-2 items-start">
                    <Skeleton className="w-1/2 !mx-0 h-6 rounded-lg" />
                    <Skeleton className="w-2/3 !mx-0 h-6 rounded-lg" />
                </div>
                <Skeleton className="w-full h-1" />
                <div className="flex flex-col gap-2 items-start">
                    <Skeleton className="w-1/3 !mx-0 h-6 rounded-lg" />
                    <Skeleton className="w-full !mx-0 h-6 rounded-lg" />
                    <Skeleton className="w-1/4 !mx-0 h-6 rounded-lg" />
                </div>
                <div className="flex">
                    <div className="w-1/2 flex flex-col gap-2 items-start">
                        <Skeleton className="w-1/2 !mx-0 h-6 rounded-lg" />
                        <div className="flex gap-2">
                            <Skeleton className="size-10 !mx-0 rounded-full" />
                            <Skeleton className="size-10 !mx-0 rounded-full" />
                            {/* <Skeleton className="size-10 !mx-0 rounded-full" /> */}
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-2 items-start">
                        <Skeleton className="w-1/2 !mx-0 h-6 rounded-lg" />
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-16 !mx-0 rounded-xl" />
                            <Skeleton className="h-8 w-16 !mx-0 rounded-xl" />

                            {/* <Skeleton className="size-10 !mx-0 rounded-full" /> */}
                            {/* <Skeleton className="size-10 !mx-0 rounded-full" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Article;
