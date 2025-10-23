import React from "react";

const Button = ({ text, fn = () => {} }) => {
    return (
        <button className="bg-yellow-400 border border-black p-3 text-xl rounded-full border-none" onClick={fn}>
            {text}
        </button>
    );
};

export default Button;
