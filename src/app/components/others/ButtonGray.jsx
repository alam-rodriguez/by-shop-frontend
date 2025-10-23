import React from "react";

const ButtonGray = ({ children, fn = () => {}, disabled = false }) => {
    return (
        <button
            className={`px-4 py-2 rounded self-end mx-auto w-full bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed `}
            onClick={fn}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default ButtonGray;
