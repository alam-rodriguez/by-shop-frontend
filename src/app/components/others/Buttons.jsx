import React from "react";

export const ButtonGrayDown = ({ children, fn = () => {}, disabled = false, type = "submit" }) => {
    return (
        <button
            className={`px-4 py-2 rounded bg-gray-200 fixed bottom-4 left-1/2 -translate-x-1/2 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed `}
            onClick={fn}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
