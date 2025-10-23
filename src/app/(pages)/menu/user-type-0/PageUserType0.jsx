import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import HeightAnimation from "@/app/components/animations/height-animation/HeightAnimation";
import RotateAnimation from "@/app/components/animations/rotate-animation/RotateAnimation";

const PageUserType0 = () => {
    return (
        <div className="m-4 flex flex-col gap-5">
            <Option
                text="Departamentos"
                hasOptions={true}
                options={[
                    { id: 1, category: "Arte y artesania" },
                    { id: 2, category: "Arte y artesania" },
                    { id: 3, category: "Arte y artesania" },
                    { id: 4, category: "Arte y artesania" },
                    { id: 5, category: "Arte y artesania" },
                    { id: 6, category: "Arte y artesania" },
                    { id: 7, category: "Arte y artesania" },
                    { id: 8, category: "Arte y artesania" },
                ]}
            />
            <Option
                text="Configuracion"
                hasOptions={true}
                options={[
                    { id: 1, category: "Arte y artesania" },
                    { id: 2, category: "Arte y artesania" },
                    { id: 3, category: "Arte y artesania" },
                    { id: 4, category: "Arte y artesania" },
                    { id: 5, category: "Arte y artesania" },
                    { id: 6, category: "Arte y artesania" },
                    { id: 7, category: "Arte y artesania" },
                    { id: 8, category: "Arte y artesania" },
                ]}
            />
            <Option text="Servicio de atencion al cliente" />
            <Option text="Iniciar Sesion" />
        </div>
    );
};

export default PageUserType0;

const Option = ({ text, link, hasOptions, options }) => {
    const animationRef = useRef();
    const animationRotateRef = useRef();

    const handleClickOption = () => {
        if (!hasOptions) return;
        animationRef.current.changeHeight();
        animationRotateRef.current.changeRotate();
    };

    return (
        <div className="border-blue-300 w-full border px-5 rounded-xl shadow-xl">
            <button
                className="flex justify-between items-center bg-red-300- w-full py-2  "
                onClick={handleClickOption}
            >
                <p className="text-lg font-semibold">{text}</p>
                <RotateAnimation ref={animationRotateRef}>
                    <Icon
                        icon={`${hasOptions ? "mingcute:down-line" : "icon-park-outline:right"}`}
                        className="text-3xl"
                    />
                </RotateAnimation>
            </button>
            {hasOptions && (
                <HeightAnimation ref={animationRef} maxHeight={`${29 * options.length}px`}>
                    <div className="flex flex-col gap-3">
                        {options.map((option) => (
                            <p key={option.id} className="text-lg font-semibold">
                                {option.category}
                            </p>
                        ))}
                    </div>
                </HeightAnimation>
            )}
        </div>
    );
};
