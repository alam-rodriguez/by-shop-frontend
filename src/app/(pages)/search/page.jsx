import { Icon } from "@iconify/react";
import React from "react";

const page = () => {
    return (
        <div className="m-4 flex flex-col gap-3">
            <Item2 text="iphone" link="" />
            <Item2 text="iphone 16 pro max case" link="" />
            <Item text="iphone 16 pro max case" link="" />
            <Item text="iphone 16 pro max case" link="" />
            <Item text="iphone 16 pro max case" link="" />
            <Item text="iphone 16 pro max case" link="" />
            <Item text="iphone 16 pro max case" link="" />
            <Item text="iphone 16 pro max case" link="" />
        </div>
    );
};

const Item = ({ text, link }) => {
    return (
        <div className="flex justify-between items-center border-b" style={{ padding: "2px 0" }}>
            <div className="flex items-center gap-2">
                <Icon icon="si:search-line" />
                <p className="font-semibold">{text}</p>
            </div>
            <Icon icon="ep:top-left" className="text-gray-500" />
        </div>
    );
};

const Item2 = ({ text, link }) => {
    return (
        <div className="flex justify-between items-center border-b" style={{ padding: "2px 0" }}>
            <div className="flex items-center gap-2">
                <Icon icon="material-symbols:history" className="text-lg" />
                <p className="font-semibold text-blue-800">{text}</p>
            </div>
            <Icon icon="iconoir:cancel" className="text-xl" />
        </div>
    );
};

export default page;
