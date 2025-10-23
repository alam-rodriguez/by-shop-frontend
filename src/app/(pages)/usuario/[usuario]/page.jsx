"use client";

import Divider from "@/app/components/home/Divider";
import React, { useState } from "react";

import userImage from "@/app/assets/images/user.png";
import Image from "next/image";
import { Icon } from "@iconify/react";

const page = () => {
    const [filterSelected, setFilterSelected] = useState(0);

    return (
        <>
            <div className="m-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image src={userImage} className="h-16 w-16" alt="user" />
                        <div className="">
                            <p className="text-2xl font-semibold">Xavier Reyres Ochoa</p>
                            <p className="text-gray-500 text-sm">Genera comisiones</p>
                        </div>
                    </div>
                    <Icon icon="tdesign:share" className="text-3xl" />
                </div>
                <p className="mt-5">Tecnologias que uso y recomiendo</p>
                <button className="bg-blue-900 text-white w-full py-2 rounded-lg mt-5">Seguir</button>
            </div>
            <Divider />
            <div className="m-4">
                <div className="border border-gray-700 rounded-md flex items-center py-2 px-4">
                    <Icon icon="si:search-line" className="text-2xl" />
                    <input type="text" placeholder="Buscar en todas las 5 publicaciones" className="w-full border-none" />
                </div>
                <div className="mt-5 flex gap-3">
                    <Badget text="Todo" filterId={0} filterSelected={filterSelected} setFilterSelected={setFilterSelected} />
                    <Badget text="Listas de regalo" filterId={1} filterSelected={filterSelected} setFilterSelected={setFilterSelected} />
                </div>
                <div className="flex flex-wrap justify-between gap-y-5 mt-5">
                    <List
                        img="https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-d-a-book-mockup-on-minimalist-transparent-background-sparks-timeless-aesthetic-png-image_13331281.png"
                        articles={2}
                        title="Libros"
                    />
                    <List
                        img="https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-d-a-book-mockup-on-minimalist-transparent-background-sparks-timeless-aesthetic-png-image_13331281.png"
                        articles={2}
                        title="Libros"
                    />
                    <List
                        img="https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-d-a-book-mockup-on-minimalist-transparent-background-sparks-timeless-aesthetic-png-image_13331281.png"
                        articles={2}
                        title="Libros"
                    />
                    <List
                        img="https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-d-a-book-mockup-on-minimalist-transparent-background-sparks-timeless-aesthetic-png-image_13331281.png"
                        articles={2}
                        title="Libros"
                    />
                    <List
                        img="https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-d-a-book-mockup-on-minimalist-transparent-background-sparks-timeless-aesthetic-png-image_13331281.png"
                        articles={2}
                        title="Libros"
                    />
                </div>
            </div>
        </>
    );
};

export default page;

const Badget = ({ text, filterId, filterSelected, setFilterSelected }) => {
    const handleClick = () => setFilterSelected(filterId);

    return (
        <p
            className={`${filterSelected == filterId ? "bg-blue-400/35 text-blue-700" : "bg-gray-400/35"} inline-block rounded-lg px-3 py-1`}
            onClick={handleClick}
        >
            {text}
        </p>
    );
};

const List = ({ img, articles, title }) => {
    return (
        <div className="relative bg-slate-200 grid place-content-center rounded-lg overflow-hidden" style={{ width: "calc(50% - 7px)" }}>
            <img src={img} alt="" className="h-full- p-5" />
            <div
                className="absolute bottom-0 bg-black/50- w-full text-white px-3 pb-1 pt-20"
                style={{ background: "linear-gradient(180deg, transparent , rgba(0, 0, 0, 0.5) )" }}
            >
                <p>{articles} articulos</p>
                <p className="font-semibold text-lg">{title}</p>
            </div>
        </div>
    );
};
