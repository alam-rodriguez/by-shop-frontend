"use client";

import React, { useEffect } from "react";

const BottomModel = ({ show = false, setShow, height = "50%", children }) => {
    useEffect(() => {
        console.log(show);
    }, [show]);

    const onClose = (e) => {
        if (e.target.hasAttribute("data-parent")) setShow(false);
    };

    return (
        <div
            className="fixed top-0 left-0 h-full w-full bg-black/20 z-50"
            data-parent={true}
            style={{ display: show ? "block" : "none" }}
            onClick={onClose}
        >
            <div className="fixed w-full bg-white bottom-0 rounded-t-3xl shadow-2xl border-t-2 border-gray-500/50 " style={{ height: height }}>
                <div style={{ height: "7px" }} className="w-14 bg-gray-500 absolute top-3 left-1/2 transform -translate-x-1/2 rounded-full" />
                {children}
            </div>
        </div>
    );
};

export default BottomModel;
