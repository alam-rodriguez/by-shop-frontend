"use client";

import React, { useEffect, useRef, useState } from "react";

// Framer motion
import { motion, AnimatePresence } from "framer-motion";

// import { BottomSheet } from "react-spring-bottom-sheet";
// import ModalSheet from "react-modal-sheet";

// import { Sheet } from "react-modal-sheet";

// Icons
import { Icon } from "@iconify/react";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

// Components
import Divider from "@/app/components/home/Divider";

import UnregisteredUser from "./components/UnregisteredUser";
import { useGetCartUserBought } from "@/app/hooks/request/carts/requestsCarts";
import { useGetUserArticlesViews, useListArticlesUser } from "@/app/hooks/request/articles/requestsArticles";

// import { BottomSheet } from "react-spring-bottom-sheet";
// import "react-spring-bottom-sheet/dist/style.css";
import BottomModel from "@/app/components/animations/bottom-model/BottomModel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAlert from "@/app/alerts/react-confirm-alert/useAlert";
import { useLogout } from "@/app/hooks/request/users/requestsUsers";
import { toast } from "sonner";
import ImageA from "@/app/components/others/ImageA";
import Spacer from "@/app/components/home/Spacer";
import { getDateInSpanish } from "@/app/hooks/app/app";
import useInstallApp from "@/app/hooks/app/useInstallApp";
import api from "@/app/api/api";

const page = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const { confirmAlertCustom } = useAlert();

    // return (
    //     <div>
    //         <button onClick={() => setOpen(true)}>Abrir Bottom Sheet</button>

    //         <BottomSheet open={open} onDismiss={() => setOpen(false)} snapPoints={({ maxHeight }) => [maxHeight * 0.5, maxHeight * 0.9]}>
    //             <div style={{ padding: 20 }}>
    //                 <h2>Contenido del Bottom Sheet</h2>
    //                 <p>Puedes poner cualquier cosa aquí.</p>
    //             </div>
    //         </BottomSheet>
    //     </div>
    // );

    const { type, firstName, lastName, id, email, firstNames, lastNames, setUserInfo, emailVerified, registrationDate, picture } = zusUser();

    // const [isOpen, setOpen] = useState(false);

    // const res = useRef(null);

    console.log(type);

    // const { isLoading, data } = useGetCartUserBought(id);

    // const { data: listArticles, isLoading: isLoadingListArticles } = useListArticlesUser(id);

    // useEffect(() => {
    //     console.log(listArticles);
    // }, [listArticles]);

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    // const { data: articlesViews, isLoading: isLoadingArticlesViews } = useGetUserArticlesViews(id);

    // useEffect(() => {
    //     console.log(articlesViews);
    // }, [articlesViews]);

    const handleClickLogout = async () => {
        console.log("hola");
        const want = await confirmAlertCustom({
            head: "Confirmar Cierre de Sesión",
            content: `${firstNames} ${lastNames}, Estas a punto de cerra la sesion de las aplicaciones de amazon de este dispositivo.`,
            confirmText: "Sí",
            cancelText: "No",
        });

        if (!want) return;

        const { message, status } = await useLogout();
        if (status != 200) return;
        setUserInfo({
            id: "",
            firstName: "",
            firstNames: "",
            lastNames: "",
            registrationDate: "",
            type: 0,
            canBuy: 0,
            email: "",
            password: "",
            direction: {},
        });
        toast.info("Sesion cerrada");
    };

    const { handleInstall } = useInstallApp();

    // Helper para convertir la clave pública

    return (
        <div>
            <div className="p-4 bg-gray-200 h-20 relative">
                {/* <div className="flex justify-between">
                    <Icon icon="material-symbols:close-rounded" className="size-7 text-gray-500" />
                    <p className="text-xl font-medium">Your Profile</p>
                    <Icon icon="famicons:notifications-outline" className="size-7 text-gray-500" />
                </div> */}
                <ImageA
                    className="size-20 rounded-full object-cover absolute top-full left-1/2- -translate-y-1/2 -translate-x-1/2-"
                    src={picture && picture != "" ? picture : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
                />
            </div>
            <div className="bg-gray-100 p-2">
                <Spacer space={50} />
                <p className="font-bold text-lg">
                    {firstName} {lastName}
                </p>
                <p className="text-gray-500 text-xs">{email}</p>
            </div>
            <div className="bg-white p-2 pt-6">
                <UserOption
                    icon="mdi:account-circle"
                    text="Informacion personal"
                    hiddenContent={
                        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 space-y-4">
                            {/* <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Información del usuario</h2> */}

                            <div className="grid grid-cols-2 gap-y-4 text-sm">
                                <div className="text-gray-500">Email</div>
                                <div className="font-medium text-gray-800">{email}</div>

                                <div className="text-gray-500">Nombre</div>
                                <div className="font-medium text-gray-800">
                                    {firstName} {lastName}
                                </div>

                                <div className="text-gray-500">Fecha de creación</div>
                                <div className="font-medium text-gray-800">{getDateInSpanish(registrationDate)}</div>

                                <div className="text-gray-500">Último acceso</div>
                                <div className="font-medium text-gray-800">14 Oct 2025</div>

                                <div className="text-gray-500">Estado de correo</div>
                                <div className="font-medium text-gray-800">{emailVerified ? "Verificado" : "No Verificado"}</div>
                            </div>
                        </div>
                    }
                />
                <Spacer space={25} />
                <UserOption icon="mdi:clipboard-list-outline" text="Pedidos" link="/usuario/pedidos" isButton={true} />
                <Spacer space={25} />
                <UserOption icon="mdi:map-marker" text="Direcciones" link="/usuario/direcciones" isButton={true} />
                <Spacer space={25} />
                <UserOption icon="majesticons:chats-2" text="Chats" link="/usuario/chats" isButton={true} />
                <Spacer space={25} />
                {/* <UserOption icon="mdi:account-lock" text="Registro y seguridad" /> */}
                {/* <Spacer space={40} /> */}
                <UserOption
                    icon="ic:baseline-support-agent"
                    text="Servicio al cliente"
                    hiddenContent={
                        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 space-y-4">
                            {/* <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Información del usuario</h2> */}

                            <div className="grid grid-cols-2 gap-y-4 text-sm">
                                <div className="text-gray-500">Email Soporte</div>
                                <div className="font-medium text-gray-800">usuario@example.com</div>

                                <div className="text-gray-500">Telefono soporte</div>
                                <div className="font-medium text-gray-800">829-3198834</div>
                            </div>
                        </div>
                    }
                />
                <Spacer space={25} />
                <UserOption
                    icon="ph:handshake-light"
                    text="Quiero formar parte de byshop"
                    hiddenContent={
                        <div className="m-4 flex flex-col gap-4">
                            <button
                                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                                onClick={() => router.push("/deliveries/solicitudes/0")}
                            >
                                Solicitar ser delivery
                            </button>

                            <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition ml-3-">
                                Solicitar registrar tienda
                            </button>
                        </div>
                    }
                />
                <Spacer space={25} />
                {/* <UserOption icon="ic:baseline-language" text="Lenguaje" /> */}
                {/* <Spacer space={40} /> */}
                {/* <UserOption icon="ic:baseline-language" text="Lenguaje" /> */}
                {/* <Spacer space={40} /> */}
                <UserOption
                    icon="mdi:share-variant"
                    text="Comparte la app"
                    hiddenContent={
                        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 space-y-4">
                            {/* <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Información del usuario</h2> */}

                            <div className="grid grid-cols-2 gap-y-4 text-sm">
                                <div className="text-gray-500">Email</div>
                                <div className="font-medium text-gray-800">usuario@example.com</div>

                                <div className="text-gray-500">Nombre</div>
                                <div className="font-medium text-gray-800">Juan Pérez</div>

                                <div className="text-gray-500">Fecha de creación</div>
                                <div className="font-medium text-gray-800">15 Oct 2025</div>

                                <div className="text-gray-500">Último acceso</div>
                                <div className="font-medium text-gray-800">14 Oct 2025</div>
                            </div>
                        </div>
                    }
                />
                <Spacer space={25} />
                {id != "" ? (
                    <UserOption icon="mdi:logout" text="Cerrar sesión" isButton={true} onClick={handleClickLogout} />
                ) : (
                    <UserOption icon="mdi:login" text="Iniciar sesión" isButton={true} link="/usuario/sesion" validate={false} />
                )}
                <Spacer space={25} />
                <UserOption icon="duo-icons:app" text="Instalar app" isButton={true} onClick={handleInstall} />

                {/* <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Icon icon="famicons:notifications-outline" className="size-7 text-gray-700" />
                        <p className="text-xl text-gray-700">Personal information</p>
                    </div>
                    <Icon icon="icon-park-outline:right" className="size-7 text-gray-700" />
                </div> */}
                {/* <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Icon icon="famicons:notifications-outline" className="size-7 text-gray-700" />
                        <p className="text-xl text-gray-700">Personal information</p>
                    </div>
                    <Icon icon="icon-park-outline:right" className="size-7 text-gray-700" />
                </div> */}
                {/* <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Icon icon="famicons:notifications-outline" className="size-7 text-gray-700" />
                        <p className="text-xl text-gray-700">Personal information</p>
                    </div>
                    <Icon icon="icon-park-outline:right" className="size-7 text-gray-700" />
                </div> */}
            </div>
        </div>
    );

    if (isLoading || isLoadingListArticles) return <></>;

    if (type == 0) return <UnregisteredUser />;
    else
        return (
            <>
                <BottomModel show={open} setShow={setOpen} height="45%" close={() => setOpen(false)}>
                    <div className="m-4 mt-8">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-xl">Quien etsa comprando ?</p>
                            <Icon icon="material-symbols-light:close-rounded" width="36" height="36" onClick={() => setOpen(false)} />
                        </div>
                        <br />
                        <div className="flex justify-between items-center bg-gray-300/50 rounded-xl p-3">
                            <div className="flex items-center gap-2">
                                <Image src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width={50} height={40} alt="" />
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-sm">
                                        {firstName} {lastName}
                                    </p>
                                    <p className="text-xs font-thin text-gray-500">Titular de la cuenta</p>
                                </div>
                            </div>
                            <p className="text-blue-800 me-4 text-lg">Ver</p>
                        </div>
                        <br />
                        <div className="flex justify-between items-center">
                            <p className="text-blue-800">Agregar perfil</p>
                            <p className="text-blue-800">Eliminar perfil</p>
                        </div>
                    </div>
                    <Divider mt={20} mb={20} />
                    <div className="m-4">
                        <p className="text-xs text-gray-500">Sesion iniciada como {email}</p>
                        <button className="w-full border-2 shadow-xl rounded-md p-3 m-2- mt-2" onClick={handleClickLogout}>
                            Cambia cuenta
                        </button>
                        <button className="w-full border-2_shadow-xl rounded-md p-3 text-blue-800" onClick={handleClickLogout}>
                            Cerrar sesion
                        </button>
                    </div>
                </BottomModel>
                {/* <>
                    <button onClick={() => setOpen(true)}>Open sheet</button>

                    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[600, 0]}>
                        <Sheet.Container>
                            <Sheet.Header />
                            <Sheet.Content>hola</Sheet.Content>
                        </Sheet.Container>
                        <Sheet.Backdrop />
                    </Sheet>
                </> */}
                {/* <BottomSheet open={open} onDismiss={() => setOpen(false)}>
                    My awesome content here
                </BottomSheet> */}
                <div className="m-4">
                    {/* <button onClick={() => setOpen(true)}>Open</button> */}
                    <div className="flex justify-between items-center" onClick={() => setOpen(!open)}>
                        <div className="flex items-center gap-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" className="h-8 w-8" />
                            <p>Hola, {firstName}</p>
                            <Icon icon="mingcute:down-line" className="text-2xl" />
                        </div>
                        <div>
                            {/* <img src="" alt="" /> */}
                            <p>ES</p>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-5">
                        <LinkComponent text="Lista" />
                        <LinkComponent text="Comprar de nuevo" />
                        {/* <LinkComponent text="Cuenta" onClick={() => setOpen(true)} /> */}
                        <LinkComponent text="Cuenta" link={"/usuario/cuenta"} />
                        <LinkComponent text="Pedidos" link={"/usuario/pedidos"} />
                    </div>
                    <div className="mt-5">
                        <div className="flex justify-between overflow-scroll">
                            <p className="font-semibold text-xl">Tus pedidos</p>
                            <p className="text-blue-900" onClick={() => router.push("/usuario/pedidos")}>
                                Ver todo
                            </p>
                        </div>
                        {data.length > 0 ? (
                            <div className="flex gap-2 overflow-scroll mt-5">
                                {data?.map((order, i) => (
                                    <Order key={order.id} idCart={order.id_cart} date={order.fecha} articlesBought={order.articles} />
                                ))}
                            </div>
                        ) : (
                            <div className="mt-5">
                                <p className="text-gray-700">No se encontro ningun pedido reciente.</p>
                                <button className="mt-2 border border-gray-700 w-full py-4 rounded-xl text-lg">Ver todos los pedidos</button>
                            </div>
                        )}
                    </div>
                </div>
                <Divider h={5} />
                <div className="m-4">
                    <p className="text-xl font-semibold">Comprar otra vez</p>
                    <p className="mt-5">Descubre lo que otras personas compran frecuentemente en Comprar de nuevo</p>
                    <button className="mt-3 border border-gray-700 w-full py-4 rounded-xl text-lg">Visita Buy Again</button>
                </div>
                <Divider h={10} />
                <ArticlesViewed articlesViews={articlesViews ? articlesViews : []} />
                <Divider h={10} />
                <div className="m-4">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">Tus listas</p>
                        <p className="text-blue-900">Ver todo</p>
                    </div>
                    <Lista listArticles={listArticles} />
                </div>
                <Divider h={5} />
                <div className="m-4">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">Tu cuenta</p>
                        <p className="text-blue-900">Ver todo</p>
                    </div>
                    <div className="flex gap-5 overflow-scroll no-scrollbar mt-3">
                        <LinkComponentV2 text="Tus pedidos" link="/usuario/pedidos" />
                        {/* <p className="border border-gray-500 rounded-lg px-6 py-3 text-lg text-nowrap">Tus pedidos</p> */}
                        <p className="border border-gray-500 rounded-lg px-6 py-3 text-lg text-nowrap">Tus pedidos</p>
                        <p className="border border-gray-500 rounded-lg px-6 py-3 text-lg text-nowrap">Tus pedidos</p>
                        <p className="border border-gray-500 rounded-lg px-6 py-3 text-lg text-nowrap">Tus pedidos</p>
                        <p className="border border-gray-500 rounded-lg px-6 py-3 text-lg text-nowrap">Tus pedidos</p>
                        <p className="border border-gray-500 rounded-lg px-6 py-3 text-lg text-nowrap">Tus pedidos</p>
                        <p className="border border-gray-500 rounded-lg px-6 py-3 text-lg text-nowrap">Tus pedidos</p>
                        <p className="border border-gray-500 rounded-lg px-6 py-3 text-lg text-nowrap">Tus pedidos</p>
                        <p className="border border-gray-500 rounded-lg px-6 py-3 text-lg text-nowrap">Tus pedidos</p>
                        <p className="border border-gray-500 rounded-lg px-6 py-3 text-lg text-nowrap">Tus pedidos</p>
                    </div>
                </div>
                <Divider h={5} />
                <div className="m-4">
                    <p className="text-xl font-semibold">Saldo de Tarjetas de regalo: $0.00</p>
                    <div className="flex justify-between mt-4">
                        <div className="grid place-content-center border border-gray-500 rounded-lg h-24 px-8" style={{ width: "calc(50% - 5px)" }}>
                            <p className="text-center">Canjear Tarjeta Regalo</p>
                        </div>
                        <div className="grid place-content-center border border-gray-500 rounded-lg h-24 px-8" style={{ width: "calc(50% - 5px)" }}>
                            <p className="text-center">Balance de Recarga</p>
                        </div>
                    </div>
                    <p className="mt-4 text-blue-900">Administrar</p>
                </div>
                <Divider h={5} />
                <div className="m-4">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">Siguiendo</p>
                        <p className="text-blue-900">Ver todo</p>
                    </div>
                    <p className="mt-4">
                        Estas al dia! <span className="text-blue-900">Ver publicaciones mas antiguas</span>
                    </p>
                </div>
                <Divider h={10} />
                <div className="m-4">
                    <p className="text-xl font-semibold">Necesitas mas ayuda ?</p>
                    <p className="border border-gray-500 py-4 px-6 rounded-lg inline-block mt-4 text-lg">Visitar el servicio al cliente</p>
                </div>
                <Divider h={5} />
                <Divider h={0} mb={200} />
            </>
        );
};

export default page;

const LinkComponent = ({ text, link = "#", onClick = () => {} }) => {
    return (
        <Link href={link} onClick={onClick}>
            <p className="border border-black rounded-3xl inline-block py-2 px-4 tracking-tight text-sm font-medium">{text}</p>
        </Link>
    );
};

const LinkComponentV2 = ({ text, link = "#", onClick = () => {} }) => {
    return (
        <Link href={link} onClick={onClick}>
            <p className="border border-gray-500 rounded-lg px-6 py-3 text-lg text-nowrap">{text}</p>
        </Link>
    );
};

const Order = ({ idCart, date, articlesBought, link }) => {
    const router = useRouter();

    const [articlesToShow, setArticlesToShow] = useState([]);

    useEffect(() => {
        const randomArticles = articlesBought.sort(() => Math.random() - 0.5).slice(0, 2);
        setArticlesToShow(randomArticles);
    }, []);

    return (
        // <div className="border border-gray-700 p-4 flex flex-col justify-between rounded-xl" style={{ minWidth: "calc(50% - 5px)" }}>
        <div
            className="border border-gray-700 p-4 flex flex-col justify-between rounded-xl flex-shrink-0 h-56"
            style={{ width: "60%" }}
            onClick={() => router.push(`/usuario/pedidos/${idCart}`)}
        >
            {/* <p>Entregado el {date}</p> */}
            <p>Comprado el {date.split("T")[0]}</p>
            <div className="flex">
                {articlesToShow.map((article, i) => (
                    <img className="basis-full w-1/2 p-2 object-contain h-32" src={article.article_image} key={i} alt="" />
                ))}
            </div>
            {articlesBought.length > 1 ? (
                <p>
                    <span className="text-blue-500">{articlesBought.length} articulos</span> en este paquete
                </p>
            ) : (
                <div></div>
            )}
        </div>
    );
};

const KeepBuying = ({ img, text, views }) => {
    return (
        <div style={{ width: "calc(33.33% - 10px)" }}>
            <div className="border border-gray-700 rounded-xl grid place-items-center p-4">
                <img src={img} alt="" />
            </div>
            <p className="text-sm">{text}</p>
            <p className="text-gray-600 text-sm">{views} vistos</p>
        </div>
    );
};

const Lista = ({ listArticles = [] }) => {
    const router = useRouter();

    return (
        <div className="border border-gray-600 rounded-xl flex p-4 mt-5">
            <div className="w-2/5">
                <p>Lista de compras</p>
                <p className="text-gray-400">Privado </p>
                <p className="text-gray-400">Predeterminado</p>
            </div>
            <div className="w-3/5 flex gap-1 justify-end">
                {listArticles.length > 0 ? (
                    <>
                        {listArticles.slice(0, 2).map((ListArticle) => (
                            <div
                                key={ListArticle.id}
                                className="bg-gray-500/25 rounded-lg p-2 grid place-content-center h-20 w-20"
                                onClick={() => router.push(`/articulos/${ListArticle.id_article}`)}
                            >
                                <img src={ListArticle.image_article} className="w-full h-full object-cover" />
                            </div>
                        ))}
                        {listArticles.length > 2 && (
                            <div className="bg-gray-500/25 rounded-lg p-2 grid place-content-center h-20 w-14">
                                <p className="text-2xl text-gray-700">+{listArticles.length - 2}</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-slate-300 p-2 h-full rounded-lg">
                        <div className="bg-slate-400 h-full rounded-lg p-2">
                            <Icon icon="clarity:list-line" className="h-full w-auto text-gray-600" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// {
//   id_article_direct_category: '8f361c80-a7a2-4109-8723-834eaba3294b',
//   id_article: '372034dc-7210-4433-95c6-979c039d490b',
//   image_article:
//     'https://058205erp7.ufs.sh/f/rKpaPJUtRxfmngThDgrpM4rkfugFoWUeycDjxtO53iKzSvIl',
//   created_at: '2025-04-11T07:25:14.000Z',
//   views: 6
// }

const ArticlesViewed = ({ articlesViews = [] }) => {
    return (
        <div className="m-4">
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Seguir comprando</p>
                <p className="text-blue-900">Editar</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
                {articlesViews.map((article, i) => (
                    <KeepBuying key={i} img={article.image_article} text={article.category_name} views={article.views} />
                ))}
                {/* <KeepBuying
                    img="https://th.bing.com/th/id/R.2aee5ee6d367852bf906a6b842b829bb?rik=XFm8pKBTb%2frjHA&pid=ImgRaw&r=0"
                    text="Autos y autos de..."
                    views={1}
                />
                <KeepBuying
                    img="https://th.bing.com/th/id/R.2aee5ee6d367852bf906a6b842b829bb?rik=XFm8pKBTb%2frjHA&pid=ImgRaw&r=0"
                    text="Autos y autos de..."
                    views={1}
                />
                <KeepBuying
                    img="https://th.bing.com/th/id/R.2aee5ee6d367852bf906a6b842b829bb?rik=XFm8pKBTb%2frjHA&pid=ImgRaw&r=0"
                    text="Autos y autos de..."
                    views={1}
                />
                <KeepBuying
                    img="https://th.bing.com/th/id/R.2aee5ee6d367852bf906a6b842b829bb?rik=XFm8pKBTb%2frjHA&pid=ImgRaw&r=0"
                    text="Autos y autos de..."
                    views={1}
                />
                <KeepBuying
                    img="https://th.bing.com/th/id/R.2aee5ee6d367852bf906a6b842b829bb?rik=XFm8pKBTb%2frjHA&pid=ImgRaw&r=0"
                    text="Autos y autos de..."
                    views={1}
                />
                <KeepBuying
                    img="https://th.bing.com/th/id/R.2aee5ee6d367852bf906a6b842b829bb?rik=XFm8pKBTb%2frjHA&pid=ImgRaw&r=0"
                    text="Autos y autos de..."
                    views={1}
                /> */}
            </div>
            <div className="flex items-center gap-1">
                <Icon icon="formkit:down" className="text-blue-900 text-xs" />
                <p className="text-blue-900">Ver mas</p>
            </div>
            <p className="text-blue-900 mt-2">Ver tu historial de busqueda</p>
        </div>
    );
};

const UserOption = ({ icon, text, isButton = false, onClick = () => {}, link = "", hiddenContent, validate = true }) => {
    const router = useRouter();

    const { id: idUser } = zusUser();

    const [show, setShow] = useState(false);

    const handleClick = () => {
        if (idUser == "" && validate) {
            toast.error("Debes iniciar sesion para acceder a esta opcion");
            return;
        }
        if (link) router.push(link);
        else {
            onClick();
            setShow((prev) => !prev);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center" onClick={handleClick}>
                <div className="flex items-center gap-2">
                    <Icon icon={icon} className="size-5 text-gray-700" />
                    <p className="text-base text-gray-700">{text}</p>
                </div>
                {isButton ? (
                    <Icon icon="icon-park-outline:right" className="size-5 text-gray-700" />
                ) : (
                    <Icon
                        icon="icon-park-outline:down"
                        className={`size-5 text-gray-700 transition-transform duration-300 ${show ? "rotate-180" : "rotate-0"}`}
                    />
                )}
            </div>
            {!isButton && hiddenContent && (
                <AnimatePresence>
                    {show && (
                        <motion.div
                            key="grow-box"
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: "easeInOut",
                            }}
                            className="overflow-hidden"
                        >
                            {hiddenContent}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </>
    );
};
