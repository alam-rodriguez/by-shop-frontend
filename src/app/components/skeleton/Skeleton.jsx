import React from "react";

const Skeleton = ({ className = "", replaceClassName = false }) => {
    return <div className={`${!replaceClassName && "bg-gray-300 rounded mx-auto animate-pulse"} ${className}`}></div>;
};

export default Skeleton;
