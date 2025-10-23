"use client";

import Divider from "@/app/components/home/Divider";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

const page = () => {
    return (
        <>
            <div className="flex justify-between items-center m-4">
                <p className="text-xl font-semibold">Filtros</p>
                <Icon icon="iconoir:cancel" className="text-xl" />
            </div>
            <Divider />
            <div className="m-4-">
                <Filtro
                    filtro="Prime y entrega"
                    dadges={[
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                    ]}
                />
                <Filtro filtro="Prime y entrega" dadges={["Nuevo", "Usado", "Renovado"]} />
                <Filtro filtro="Prime y entrega" dadges={["Nuevo", "Usado", "Renovado"]} />
                <Filtro filtro="Prime y entrega" dadges={["Nuevo", "Usado", "Renovado"]} />
                <Filtro filtro="Prime y entrega" dadges={["Nuevo", "Usado", "Renovado"]} />
                <Filtro
                    filtro="Prime y entrega"
                    dadges={[
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                    ]}
                />
                <Filtro
                    filtro="Prime y entrega"
                    dadges={[
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                    ]}
                />
                <Filtro
                    filtro="Prime y entrega"
                    dadges={[
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                        "Nuevo",
                        "Usado",
                        "Renovado",
                    ]}
                />
                {/* <div className="flex justify-between items-center">
                    <p>Prime y entrega</p>
                    <Icon icon="mingcute:down-line" className="text-xl" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Badge text="Nuevo" />
                    <Badge text="Usuado" />
                    <Badge text="Renovado" />
                    <Badge text="Nuevo" />
                    <Badge text="Usuado" />
                    <Badge text="Renovado" />
                    <Badge text="Nuevo" />
                    <Badge text="Usuado" />
                    <Badge text="Renovado" />
                </div> */}
                {/* <div className="flex justify-between items-center bg-white fixed bottom-0 w-full left-0 p-4 pb-14">
                    <button className="border border-gray-400 py-2 px-4 rounded-lg">Borrar filtros</button>
                    <button className="border bg-blue-800 text-white py-2 px-4 rounded-lg">Mostrar 127 resultados</button>
                </div> */}
                <Divider h={0} mt={0} mb={130} />

                <div className="bg-white fixed bottom-0 w-full left-0 pb-10">
                    <Divider mt={0} mb={0} />
                    <div className="flex justify-between items-center p-4 ">
                        <button className="border border-gray-400 py-2 px-4 rounded-lg">Borrar filtros</button>
                        <button className="border bg-blue-800 text-white py-2 px-4 rounded-lg">Mostrar 127 resultados</button>
                    </div>
                    <Divider mt={0} />
                </div>
            </div>
        </>
    );
};

export default page;

const Filtro = ({ filtro, dadges }) => {
    return (
        <>
            <div className="m-4">
                <div className="flex justify-between items-center">
                    <p className="font-semibold">{filtro}</p>
                    <Icon icon="mingcute:down-line" className="text-xl" />
                </div>
                <div className="flex gap-2 flex-wrap mt-4">
                    {dadges.map((dadge, i) => (
                        <Badge key={i} text={dadge} />
                    ))}
                </div>
            </div>
            <Divider />
        </>
    );
};

const Badge = ({ text }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => setIsSelected(!isSelected);

    return (
        <div className={`border border-gray-400 rounded-lg py-1 px-4 flex items-center ${isSelected && "bg-blue-200"}`} onClick={handleClick}>
            {isSelected && <Icon icon="iconoir:cancel" className="text-xl" />}
            <p>{text}</p>
        </div>
    );
};
