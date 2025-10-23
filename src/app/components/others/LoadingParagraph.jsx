import React from "react";

const LoadingParagraph = ({ text = "Cargando..." }) => {
    return <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center">{text}</div>;
};

export default LoadingParagraph;
