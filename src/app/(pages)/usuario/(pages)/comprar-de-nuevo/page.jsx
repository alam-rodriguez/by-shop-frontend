import ImageA from "@/app/components/others/ImageA";
import { Icon } from "@iconify/react";
import React from "react";

const page = () => {
    return (
        <div className="m-4">
            <p className="text-lg font-semibold">Comprar de nuevo</p>
            <div className="flex gap-2">
                <div className="flex gap-2 items-center border border-gray-700 rounded-md py-0 px-2">
                    <Icon icon="material-symbols:search-rounded" className="text-lg" />
                    <input type="text" placeholder="Buscar compras pasadas" />
                </div>
                <div>
                    <p>Cancelar</p>
                </div>
                <div>
                    <p>Filtros</p>
                    <Icon icon="mingcute:down-line" width="24" height="24" />
                </div>
            </div>

            <div>
                <div>
                    {/* <ImageA src, alt = "", width, height, className /> */}
                    <div>
                        <p></p>
                        <span></span>
                        <p></p>
                        <button>Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
