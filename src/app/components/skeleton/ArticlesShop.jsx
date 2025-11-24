import React from "react";

// Components
import Skeleton from "./Skeleton";
import Spacer from "../home/Spacer";

const ArticlesShop = () => {
    return (
        <>
            <Skeleton className="w-full h-48" />
            <div className="m-4">
                <div className="flex flex-col items-start gap-2">
                    <Skeleton className="w-3/4 !mx-0 h-4 rounded-lg" />
                    <Skeleton className="w-1/4 !mx-0 h-4 rounded-lg" />
                </div>
                <Spacer />
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <div className="w-1/2 flex flex-col gap-4 h-60">
                            <Skeleton className="w-full h-48 rounded-lg" />
                            <div className="w-full flex flex-col gap-1 items-start">
                                <Skeleton className="w-1/4 !mx-0 h-4 rounded-lg" />
                                <Skeleton className="w-2/4 !mx-0 h-4 rounded-lg" />
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-col gap-4 h-60">
                            <Skeleton className="w-full h-48 rounded-lg" />
                            <div className="w-full flex flex-col gap-1 items-start">
                                <Skeleton className="w-1/4 !mx-0 h-4 rounded-lg" />
                                <Skeleton className="w-2/4 !mx-0 h-4 rounded-lg" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2 flex flex-col gap-4 h-60">
                            <Skeleton className="w-full h-48 rounded-lg" />
                            <div className="w-full flex flex-col gap-1 items-start">
                                <Skeleton className="w-1/4 !mx-0 h-4 rounded-lg" />
                                <Skeleton className="w-2/4 !mx-0 h-4 rounded-lg" />
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-col gap-4 h-60">
                            <Skeleton className="w-full h-48 rounded-lg" />
                            <div className="w-full flex flex-col gap-1 items-start">
                                <Skeleton className="w-1/4 !mx-0 h-4 rounded-lg" />
                                <Skeleton className="w-2/4 !mx-0 h-4 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArticlesShop;
