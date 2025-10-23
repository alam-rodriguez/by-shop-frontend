import { Icon } from "@iconify/react";
import React from "react";

const page = () => {
    return (
        <div>
            <div className="m-4">
                <p className="text-lg font-semibold tracking-wide">Ofertas que no te puedes perder</p>
                <div className="flex overflow-scroll gap-5 mt-5">
                    <Oferta />
                    <Oferta />
                    <Oferta />
                    <Oferta />
                    <Oferta />
                </div>
            </div>

            <hr />
            <div className="relative shadow border border-slate-700">
                <div className="flex overflow-scroll m-3 gap-4">
                    <p className="text-nowrap border border-black rounded-lg py-2 px-2 font-semibold">Ofertas de tendencia</p>
                    <p className="text-nowrap border border-black rounded-lg py-2 px-2 font-semibold">Festivos</p>
                    <p className="text-nowrap border border-black rounded-lg py-2 px-2 font-semibold">Favoritos de los clientes</p>
                    <p className="text-nowrap border border-black rounded-lg py-2 px-2 font-semibold">Ofertas de tendencia</p>
                </div>
                <div className="absolute right-0 bg-white h-full flex items-center px-5 top-0 border border-l-green-950">
                    <p className="text-green-900">Filtros (2)</p>
                    <Icon icon="mingcute:down-line" className="text-green-900" />
                </div>
            </div>
            <hr />
            <div className="flex m-4 justify-between flex-wrap gap-5">
                <OfferItem />
                <OfferItem />
                <OfferItem />
                <OfferItem />
                <OfferItem />
                <OfferItem />
                <OfferItem />
                <OfferItem />
            </div>
            <div className="bg-red-700 p-4">
                <p className="text-white">Offertas en estilos para las fiestas</p>

                <div className="flex gap-5 overflow-scroll">
                    <OfferItem2 />
                    <OfferItem2 />
                    <OfferItem2 />
                    <OfferItem2 />
                    <OfferItem2 />
                </div>
            </div>
            <div className="flex m-4 justify-between flex-wrap gap-5">
                <OfferItem />
                <OfferItem />
                <OfferItem />
                <OfferItem />
                <OfferItem />
                <OfferItem />
                <OfferItem />
                <OfferItem />
            </div>
        </div>
    );
};

export default page;

const Oferta = () => {
    return (
        <div className="w-36 min-w-36 h-44 border border-gray-400 rounded-md overflow-hidden">
            <img
                className="w-full object-cover"
                style={{ height: "70%" }}
                src="https://th.bing.com/th/id/R.794d90c5c24a8bb9ad9c637288d134ce?rik=4F4vl%2fk7eD2DQw&riu=http%3a%2f%2fwww.tech21century.com%2fwp-content%2fuploads%2f2015%2f03%2fmacbookpro.jpg&ehk=%2bfxMio%2f%2fVIUxJapq3Va%2bHFT7hHn2Z5%2bkayswWCcGjhc%3d&risl=&pid=ImgRaw&r=0"
                alt=""
            />
            <p style={{ height: "30%" }} className="text-sm m-2">
                Amazon Essentials y mas
            </p>
        </div>
    );
};

const OfferItem = () => {
    return (
        <div className="h-64 border_border-5_border-red-600" style={{ width: "calc(50% - 10px)" }}>
            <div className="bg-red-900- bg-slate-300- h-3/5">
                <img
                    className="h-full w-full object-contain"
                    src="https://th.bing.com/th/id/R.794d90c5c24a8bb9ad9c637288d134ce?rik=4F4vl%2fk7eD2DQw&riu=http%3a%2f%2fwww.tech21century.com%2fwp-content%2fuploads%2f2015%2f03%2fmacbookpro.jpg&ehk=%2bfxMio%2f%2fVIUxJapq3Va%2bHFT7hHn2Z5%2bkayswWCcGjhc%3d&risl=&pid=ImgRaw&r=0"
                    alt=""
                />
            </div>
            <div className="h-1/4- h-2/5 py-4">
                <div className="flex items-center gap-2">
                    <div className="bg-red-700 rounded">
                        <p className="text-white py-2 px-4 text-sm">-37%</p>
                    </div>
                    <p className="text-xs font-semibold tracking-wide text-red-700 text-nowrap">Oferta Relampago</p>
                </div>
                <p>Sony SRX-XB100 Altavoz...</p>
            </div>
        </div>
    );
};

const OfferItem2 = () => {
    return (
        <div className="h-72 w-40 bg-white border_border-5_border-red-600 rounded-lg">
            <div className="bg-red-900- bg-slate-300- h-3/5">
                <img
                    className="h-full w-full object-contain"
                    src="https://th.bing.com/th/id/R.794d90c5c24a8bb9ad9c637288d134ce?rik=4F4vl%2fk7eD2DQw&riu=http%3a%2f%2fwww.tech21century.com%2fwp-content%2fuploads%2f2015%2f03%2fmacbookpro.jpg&ehk=%2bfxMio%2f%2fVIUxJapq3Va%2bHFT7hHn2Z5%2bkayswWCcGjhc%3d&risl=&pid=ImgRaw&r=0"
                    alt=""
                />
            </div>
            <div className="h-1/4- h-2/5 p-2">
                <div className="flex items-center gap-2">
                    <div className="bg-red-700 rounded">
                        <p className="text-white py-2 px-4 text-sm">-37%</p>
                    </div>
                    <p className="text-xs font-semibold tracking-wide text-red-700">Oferta Relampago</p>
                </div>
                <p>
                    <span>us$</span>
                    <span>49</span>
                    <span>95</span>
                </p>
                <p className="text-xs">
                    PVPR:
                    <span className="line-through">US$79.95</span>
                </p>
                <p>Tipsy Elves Unise...</p>
            </div>
        </div>
    );
};
