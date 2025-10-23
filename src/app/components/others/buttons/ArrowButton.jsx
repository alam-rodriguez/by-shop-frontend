"use client";

// Next
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";

// Components
import Divider from "../../home/Divider";

const ArrowButton = ({ text, lt = true, lb = true, link, onclick = () => {} }) => {
    return (
        <>
            {lt && <Divider />}
            <Link href={link} onClick={onclick} className="flex justify-between items-center mx-4">
                <p>{text}</p>
                <Icon icon="weui:arrow-outlined" width="12" height="24" />
            </Link>
            {lb && <Divider />}
        </>
    );
};

export default ArrowButton;
