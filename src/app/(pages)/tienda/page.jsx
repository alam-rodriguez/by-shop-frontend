"use client";

import Divider from "@/app/components/home/Divider";
import { zusShops } from "@/app/zustand/shops/zusShops";
import { Icon } from "@iconify/react";
import React from "react";
import HeaderShops from "./components/HeaderShops";

const page = () => {
    const { setShowMenu } = zusShops();

    return (
        <div className="">
            <img
                src="https://play-lh.googleusercontent.com/TpYOXVxhqa-4pCwfAi-kZ8aWME9FIvhCAXkILJHbYYuz-W_OGSTYro4giuNIhiqOgIL7"
                className="w-full h-20 object-cover"
            />
            <HeaderShops />
            {/* <div className="flex justify-between w-full p-4 bg-white border border-b-gray-700 sticky z-30">
                <div className="flex items-center gap-4">
                    <Icon icon="ic:round-menu" className="text-2xl" onClick={setShowMenu} />
                    <Icon icon="iconoir:search" className="text-2xl" />
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-slate-400/40 px-6 py-2 rounded-xl shadow-2xl">Seguir</button>
                    <Icon icon="meteor-icons:share" className="text-2xl" />
                </div>
            </div> */}
            <div className="m-4">
                <img
                    src="https://play-lh.googleusercontent.com/TpYOXVxhqa-4pCwfAi-kZ8aWME9FIvhCAXkILJHbYYuz-W_OGSTYro4giuNIhiqOgIL7"
                    className="w-full object-cover rounded-xl"
                />
                <img
                    src="https://www.androidauthority.com/wp-content/uploads/2023/01/Samsung-logo-2.jpg"
                    className="w-full object-cover rounded-xl"
                />
                <img
                    src="https://play-lh.googleusercontent.com/TpYOXVxhqa-4pCwfAi-kZ8aWME9FIvhCAXkILJHbYYuz-W_OGSTYro4giuNIhiqOgIL7"
                    className="w-full object-cover rounded-xl"
                />
                <img
                    src="https://www.androidauthority.com/wp-content/uploads/2023/01/Samsung-logo-2.jpg"
                    className="w-full object-cover rounded-xl"
                />
                <img
                    src="https://play-lh.googleusercontent.com/TpYOXVxhqa-4pCwfAi-kZ8aWME9FIvhCAXkILJHbYYuz-W_OGSTYro4giuNIhiqOgIL7"
                    className="w-full object-cover rounded-xl"
                />
                <img
                    src="https://www.androidauthority.com/wp-content/uploads/2023/01/Samsung-logo-2.jpg"
                    className="w-full object-cover rounded-xl"
                />
            </div>
            <div className="m-4 flex justify-between flex-wrap gap-y-3">
                <Category
                    category="Deals"
                    image="https://th.bing.com/th/id/R.e2f92865729906b3c004ab57f21fc1e2?rik=yYNSo5qAlsNyzg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftablet-hd-png-ipad-tablet-png-hd-1357.png&ehk=IdW2kG3QHoiSubcglgZdA7Cg5MhZmcN94nnIGCwDOUc%3d&risl=&pid=ImgRaw&r=0"
                    link="/"
                />
                <Category
                    category="Deals"
                    image="https://th.bing.com/th/id/R.e2f92865729906b3c004ab57f21fc1e2?rik=yYNSo5qAlsNyzg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftablet-hd-png-ipad-tablet-png-hd-1357.png&ehk=IdW2kG3QHoiSubcglgZdA7Cg5MhZmcN94nnIGCwDOUc%3d&risl=&pid=ImgRaw&r=0"
                    link="/"
                />
                <Category
                    category="Deals"
                    image="https://th.bing.com/th/id/R.e2f92865729906b3c004ab57f21fc1e2?rik=yYNSo5qAlsNyzg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftablet-hd-png-ipad-tablet-png-hd-1357.png&ehk=IdW2kG3QHoiSubcglgZdA7Cg5MhZmcN94nnIGCwDOUc%3d&risl=&pid=ImgRaw&r=0"
                    link="/"
                />
                <Category
                    category="Deals"
                    image="https://th.bing.com/th/id/R.e2f92865729906b3c004ab57f21fc1e2?rik=yYNSo5qAlsNyzg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftablet-hd-png-ipad-tablet-png-hd-1357.png&ehk=IdW2kG3QHoiSubcglgZdA7Cg5MhZmcN94nnIGCwDOUc%3d&risl=&pid=ImgRaw&r=0"
                    link="/"
                />
                <Category
                    category="Deals"
                    image="https://th.bing.com/th/id/R.e2f92865729906b3c004ab57f21fc1e2?rik=yYNSo5qAlsNyzg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftablet-hd-png-ipad-tablet-png-hd-1357.png&ehk=IdW2kG3QHoiSubcglgZdA7Cg5MhZmcN94nnIGCwDOUc%3d&risl=&pid=ImgRaw&r=0"
                    link="/"
                />
                <Category
                    category="Deals"
                    image="https://th.bing.com/th/id/R.e2f92865729906b3c004ab57f21fc1e2?rik=yYNSo5qAlsNyzg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftablet-hd-png-ipad-tablet-png-hd-1357.png&ehk=IdW2kG3QHoiSubcglgZdA7Cg5MhZmcN94nnIGCwDOUc%3d&risl=&pid=ImgRaw&r=0"
                    link="/"
                />
                <Category
                    category="Deals"
                    image="https://th.bing.com/th/id/R.e2f92865729906b3c004ab57f21fc1e2?rik=yYNSo5qAlsNyzg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftablet-hd-png-ipad-tablet-png-hd-1357.png&ehk=IdW2kG3QHoiSubcglgZdA7Cg5MhZmcN94nnIGCwDOUc%3d&risl=&pid=ImgRaw&r=0"
                    link="/"
                />
                <Category
                    category="Deals"
                    image="https://th.bing.com/th/id/R.e2f92865729906b3c004ab57f21fc1e2?rik=yYNSo5qAlsNyzg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftablet-hd-png-ipad-tablet-png-hd-1357.png&ehk=IdW2kG3QHoiSubcglgZdA7Cg5MhZmcN94nnIGCwDOUc%3d&risl=&pid=ImgRaw&r=0"
                    link="/"
                />
                <Category
                    category="Deals"
                    image="https://th.bing.com/th/id/R.e2f92865729906b3c004ab57f21fc1e2?rik=yYNSo5qAlsNyzg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftablet-hd-png-ipad-tablet-png-hd-1357.png&ehk=IdW2kG3QHoiSubcglgZdA7Cg5MhZmcN94nnIGCwDOUc%3d&risl=&pid=ImgRaw&r=0"
                    link="/"
                />
                <Category
                    category="Deals"
                    image="https://th.bing.com/th/id/R.e2f92865729906b3c004ab57f21fc1e2?rik=yYNSo5qAlsNyzg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftablet-hd-png-ipad-tablet-png-hd-1357.png&ehk=IdW2kG3QHoiSubcglgZdA7Cg5MhZmcN94nnIGCwDOUc%3d&risl=&pid=ImgRaw&r=0"
                    link="/"
                />
                <Category
                    category="Deals"
                    image="https://th.bing.com/th/id/R.e2f92865729906b3c004ab57f21fc1e2?rik=yYNSo5qAlsNyzg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftablet-hd-png-ipad-tablet-png-hd-1357.png&ehk=IdW2kG3QHoiSubcglgZdA7Cg5MhZmcN94nnIGCwDOUc%3d&risl=&pid=ImgRaw&r=0"
                    link="/"
                />
                <Category
                    category="Deals"
                    image="https://th.bing.com/th/id/R.e2f92865729906b3c004ab57f21fc1e2?rik=yYNSo5qAlsNyzg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftablet-hd-png-ipad-tablet-png-hd-1357.png&ehk=IdW2kG3QHoiSubcglgZdA7Cg5MhZmcN94nnIGCwDOUc%3d&risl=&pid=ImgRaw&r=0"
                    link="/"
                />
            </div>
            <div className="grid place-items-center">
                <button className="flex items-center border border-gray-700 shadow-lg shadow-gray-200 py-2 px-5 rounded-xl mt-10">
                    <Icon icon="famicons:share-outline" className="text-xl" />
                    <span>Compartir</span>
                </button>
                <p className="mt-4">Comparte esta pagina con tus amigos</p>
            </div>
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default page;

const Category = ({ category, image, link }) => {
    return (
        <div className="h-44 bg-gray-400/50 grid place-items-center rounded-xl" style={{ width: "calc(50% - 5px)" }}>
            <img src={image} className="object-cover h-3/4 w-3/4" />
            <p className="text-center font-semibold">{category}</p>
        </div>
    );
};
