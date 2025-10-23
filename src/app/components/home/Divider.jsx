import React from "react";

const Divider = ({ mt = 16, mb = 16, h = 1 }) => {
    return <div className={`w-full bg-gray-300`} style={{ height: h, marginTop: mt, marginBottom: mb }}></div>;
};

export default Divider;
