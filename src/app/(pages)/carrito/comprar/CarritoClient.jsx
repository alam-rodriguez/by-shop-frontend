"use client";

import { motion } from "framer-motion";

import React, { use, useEffect, useState } from "react";
import Button from "../components/Button";
import Divider from "@/app/components/home/Divider";
import CartItemForBuy from "../components/CartItemForBuy";
import {
    useCreateCartBuy,
    useCreateCartBuyItem,
    useGetCartUser,
    useGetCartUserReadyToBuy,
    useUpdateCartItemsStatus,
} from "@/app/hooks/request/carts/requestsCarts";
import { zusUser } from "@/app/zustand/user/zusUser";
import { zusCart } from "@/app/zustand/user/zusCart";
import appSettings from "@/app/zustand/app/zusApp";
import useApp from "@/app/hooks/app/useApp";
import InputFile from "@/app/components/inputs/InputFile";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import useUploadThing from "@/app/hooks/upload-thing/useUploadThing";
import Spacer from "@/app/components/home/Spacer";

// Components
import AddDireccion from "../components/AddDireccion";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetPaymentMethods } from "@/app/hooks/request/payment-methods/requestsPaymentMethods";
import { useGetCurrenciesForCustomers } from "@/app/hooks/request/currencies/requestsCurrencies";
import { calcPriceCurrency, calcPriceInCurrency, showPrice } from "@/app/hooks/app/app";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { useChangeArticleQuantity } from "@/app/hooks/request/articles/requestsArticles";
import { Icon } from "@iconify/react";
import ImageA from "@/app/components/others/ImageA";
import { Listbox } from "@headlessui/react";
import { useGetUserAddresses, useSetUserAddressPreferred } from "@/app/hooks/request/users/requestsUsersAddresses";
import { useChangeUserWantUseAddress, useGetUserById } from "@/app/hooks/request/users/requestsUsers";
import CartItemForBuy2 from "../components/CartItemForBuy2";
import { useCreateOrderPaypal } from "@/app/hooks/request/payments/requestsPaypal";

const CarritoClient = () => {
    // const { token } = useParams();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");
    const payerId = searchParams.get("PayerID");

    const captureOrderPaypal = async (token) => {
        return;
        // if (!payerId) {
        //     toast.error("Compra cancelada");
        //     return;
        // }
        // const res = await fetch(`http://localhost:3001/api/payments/paypal/capture-order/${token}`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         return_url: window.location.href,
        //         cancel_url: `${window.location.origin}/carrito/comprar`,
        //     }),
        // });
        // const data = await res.json();
        // if (data.status == "COMPLETED") {
        //     await handleClickPay(true);
        //     toast.success("Compra realizada con exito");
        //     router.push("/usuario/pedidos");
        // } else {
        //     toast.error("Error al realizar la compra");
        //     // router.replace("/carrito/comprar");
        // }
        // console.log(data);
    };

    useEffect(() => {
        console.log(token);
        console.log(payerId);
        console.log("-------------");
        if (!token || token == "") return;
        captureOrderPaypal(token);
    }, [token]);

    const { uploadImage } = useUploadThing();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        setValue,
        getValues,
        reset,
    } = useForm({
        // defaultValues,
        // resolver: zodResolver(articleSchema),
    });

    // const { showPrice, calcPriceInCurrency } = useApp();
    // const { showPrice } = useApp();
    const { id, type, firstName, address, wantUseAddress } = zusUser();
    const { appName, payMethods } = appSettings();
    // const { appName, currencies, payMethods } = appSettings();
    const {
        totalSelectedArticles,
        totalSelectedPrice,
        setTotalSelectedArticles,
        currencySelected,
        setCurrencySelected,
        payMethodSelected,
        setPayMethodSelected,
    } = zusCart();

    useEffect(() => {
        console.log(id);
    }, [id]);

    const [priceArticles, setPriceArticles] = useState({});

    // useEffect(() => {
    //     setPriceArticles({});
    // }, []);

    const { data, isLoading, refetch } = useGetCartUserReadyToBuy(id);

    const setTotalCart = (articlePrice) => setPriceArticles((prev) => ({ ...prev, [articlePrice.idCart]: { ...articlePrice } }));

    useEffect(() => {
        console.log(priceArticles);
    }, [priceArticles]);

    // useEffect(() => {
    //     if (isLoading) return;
    //     let priceWithoutDiscount = 0;
    //     let totalDiscount = 0;
    //     let priceWithDiscount = 0;
    //     data.forEach((cartItem) => {
    //         priceWithoutDiscount += cartItem.price * cartItem.quantity;
    //     });
    //     setPriceWithoutDiscount(priceWithoutDiscount);
    // }, [data, isLoading]);

    const { data: paymentMethods, isLoading: isLoadingPaymentMethods } = useGetPaymentMethods();

    useEffect(() => {
        if (isLoadingPaymentMethods) return;
        setPayMethodSelected(paymentMethods[0]);
    }, [isLoadingPaymentMethods, paymentMethods]);

    const [products, setProducts] = useState(0);
    const [productsRealPrice, setProductsRealPrice] = useState(0);
    const [productsPrice, setProductsPrice] = useState(0);

    useEffect(() => {
        console.log(data);
        if (!data) return;
        let total = 0;
        data.forEach((cartItem) => {
            total += (cartItem.price + cartItem.price_options) * cartItem.quantity;
        });
        setProductsRealPrice(total);
        console.log(currencySelected);
        total = calcPriceCurrency(currencySelected, total);
        setProducts(data.length);
        setProductsPrice(total);
    }, [data, currencySelected]);

    const { data: dataUser, isLoading: dataUserIsLoadinf, refetch: dataUserRefetch } = useGetUserById(id);

    useEffect(() => {
        console.log(dataUser);
    }, [dataUser]);

    const { data: currencies, isLoading: isLoadingCurrencies } = useGetCurrenciesForCustomers();

    const { data: userAddresses, isLoading: userAddressesIsLoading, refetch: userAddresRefetch } = useGetUserAddresses(id);

    useEffect(() => {
        console.log(userAddresses);
    }, [userAddresses]);

    useEffect(() => {
        if (isLoadingCurrencies) return;
        setCurrencySelected(currencies.find((currency) => currency.main_currency == 1));
    }, [currencies]);

    const people = [
        { id: 1, name: "Durward Reynolds" },
        { id: 2, name: "Kenton Towne" },
        { id: 3, name: "Therese Wunsch" },
        { id: 4, name: "Benedict Kessler" },
        { id: 5, name: "Katelyn Rohan" },
    ];

    const [selected, setSelected] = useState(people[0]);

    const [open, setOpen] = useState(false);

    const [openPaymentMethods, setOpenPaymentMethods] = useState(false);

    if (isLoading) return <LoadingParagraph />;

    // CREATE TABLE carts_bought_items(
    //     id char(36) NOT NULL PRIMARY KEY,
    //     id_cart_bought char(36) NOT NULL,
    //     id_cart char(36) NOT NULL,
    //     price DECIMAL(10,2) NOT NULL,
    //     id_currency char(36) NOT NULL,
    //     status TINYINT NOT NULL,
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    // );

    const handleClickPay = async (wasPayed = false) => {
        // console.log();

        const goToPayWithPaypal = payMethodSelected.type == 4 && payMethodSelected.is_paypal_method == 1;

        // console.log(goToPayWithPaypal);
        // console.log(wasPayed == false);

        console.log(goToPayWithPaypal && !token);
        // return;

        if (goToPayWithPaypal && !token) {
            const { status, link, statusCode } = await useCreateOrderPaypal();
            console.log(status, link, statusCode);
            // return;
            if (status == "CREATED") {
                window.location.href = link;
            }
            // debugger;
            return;
        }

        const image = watch("image");
        let imageUrl = null;

        if (payMethodSelected.require_image && !image) {
            toast.info("Es obligatorio subir una imagen");
            return;
        }

        const loadingToast = toast.loading("Realizando compra...");

        if (payMethodSelected.require_image) {
            const resImage = await uploadImage(image, "folder", "nombre.png");
            imageUrl = resImage[0].ufsUrl;
        }

        console.log("first");

        const { data: resData, status } = await useCreateCartBuy(
            id,
            payMethodSelected.id,
            imageUrl,
            currencySelected.id,
            wantUseAddress,
            address.address
        );
        console.log(resData);
        console.log(status);

        const resItem = await useCreateCartBuyItem(resData.id, data);
        console.log(resItem);

        const resCartItems = await useUpdateCartItemsStatus(data, 5);
        console.log(resCartItems);

        const resArticlesChangeQuantity = await useChangeArticleQuantity(data, "subtract");
        console.log(resArticlesChangeQuantity);

        if (status && resItem && resCartItems && resArticlesChangeQuantity) toast.success("Compra realizada", { id: loadingToast });
        else toast.error("Error al realizar la compra", { id: loadingToast });
        router.push("/usuario/pedidos");
    };

    const setUserAddressPreferred = async (idAddress) => {
        const res = await useSetUserAddressPreferred(id, idAddress);
        console.log(res);
        setUserWantUseAddress(0);

        userAddresRefetch();
    };

    const setOrderPaymentMethod = async (paymentMethod) => {
        setPayMethodSelected(paymentMethod);
        setOpenPaymentMethods(!openPaymentMethods);
        // const res = await useSetUserAddressPreferred(id, idAddress);
        // console.log(res);
        // setUserWantUseAddress(0);
        // userAddresRefetch();
    };

    const setUserWantUseAddress = async (wantUseAddress) => {
        const res = await useChangeUserWantUseAddress(id, wantUseAddress);
        console.log(res);
        if (res) {
            dataUserRefetch();
            setOpen(false);
        }
    };

    if (isLoading || dataUserIsLoadinf) return <LoadingParagraph />;

    return (
        <div className="m-4">
            <Toaster richColors />
            <p className="text-2xl font-bold text-center mb-4">Finalizar compra</p>
            {/* <div className="flex gap-4 w-full">
                <Icon icon="solar:arrow-left-outline" width="24" height="24" />
                <p className="text-2xl font-bold text-center">Finalizar compra</p>
            </div> */}
            <Spacer />
            <div>
                <p className="text-xl font-bold">Dirreccion de compra</p>
                <Spacer />

                {/* <div className="p-6"> */}
                {/* <button onClick={() => setOpen(!open)} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Toggle
                    </button> */}
                {dataUser.want_use_address == 1 ? (
                    <div key={address.id} className="bg-white p-4 rounded-3xl">
                        <div className="flex items-center">
                            <div className="size-1/6">
                                <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                    <div className="bg-black grid place-items-center rounded-full size-full">
                                        <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                    </div>
                                </div>
                            </div>
                            <div className="size-4/6">
                                <p className="text-lg font-bold">Tienda</p>
                                <p>prefiero recoger el pedido</p>
                            </div>
                            <div className="size-1/6 grid place-items-center" onClick={() => setOpen(!open)}>
                                <Icon icon="iconamoon:edit-fill" width="24" height="24" />
                            </div>
                        </div>
                    </div>
                ) : (
                    userAddresses
                        ?.filter((address) => address.preferred_address == 1)
                        .map((address) => (
                            <div key={address.id} className="bg-white p-4 rounded-3xl">
                                <div className="flex items-center">
                                    <div className="size-1/6">
                                        <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                            <div className="bg-black grid place-items-center rounded-full size-full">
                                                <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="size-4/6">
                                        <p className="text-lg font-bold">{address.neighborhood}</p>
                                        <p>
                                            {address.address_1} {address.address_2}
                                        </p>
                                    </div>
                                    <div className="size-1/6 grid place-items-center" onClick={() => setOpen(!open)}>
                                        <Icon icon="iconamoon:edit-fill" width="24" height="24" />
                                    </div>
                                </div>
                            </div>
                        ))
                )}

                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: open ? "auto" : 0,
                        opacity: open ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-2 flex flex-col gap-2 overflow-hidden bg-gray-200_p-4_mt-2_rounded"
                >
                    {userAddresses
                        ?.filter((address) => (dataUser.want_use_address == 0 ? address.preferred_address == 0 : true))
                        .map((address) => (
                            <div key={address.id} className="bg-white p-4 rounded-3xl" onClick={() => setUserAddressPreferred(address.id)}>
                                <div className="flex items-center">
                                    <div className="size-1/6">
                                        <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                            <div className="bg-black grid place-items-center rounded-full size-full">
                                                <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="size-4/6">
                                        <p className="text-lg font-bold">{address.neighborhood}</p>
                                        <p>
                                            {address.address_1} {address.address_2}
                                        </p>
                                    </div>
                                    <div className="size-1/6 grid place-items-center">
                                        <Icon icon="ep:select" width="24" height="24" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    {dataUser.want_use_address == 0 && (
                        <div key={address.id} className="bg-white p-4 rounded-3xl" onClick={() => setUserWantUseAddress(1)}>
                            <div className="flex items-center">
                                <div className="size-1/6">
                                    <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                        <div className="bg-black grid place-items-center rounded-full size-full">
                                            <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                        </div>
                                    </div>
                                </div>
                                <div className="size-4/6">
                                    <p className="text-lg font-bold">Tienda</p>
                                    <p>prefiero recoger el pedido</p>
                                </div>
                                <div className="size-1/6 grid place-items-center">
                                    <Icon icon="ep:select" width="24" height="24" />
                                </div>
                            </div>
                        </div>
                    )}
                    {/* <div key={address.id} className="bg-white p-4 rounded-3xl" onClick={() => setUserWantUseAddress(0)}>
                        <div className="flex items-center">
                            <div className="size-1/6">
                                <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                    <div className="bg-black grid place-items-center rounded-full size-full">
                                        <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                    </div>
                                </div>
                            </div>
                            <div className="size-4/6">
                                <p className="text-lg font-bold">Tienda</p>
                                <p>prefiero recoger el pedido en la tienda</p>
                            </div>
                            <div className="size-1/6 grid place-items-center">
                                <Icon icon="ep:select" width="24" height="24" />
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="bg-white p-4 rounded-3xl" onClick={() => setOpen(false)}>
                        <div className="flex items-center">
                            <div className="size-1/6">
                                <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                    <div className="bg-black grid place-items-center rounded-full size-full">
                                        <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                    </div>
                                </div>
                            </div>
                            <div className="size-4/6">
                                <p className="text-lg font-bold">Home</p>
                                <p>61480 Sunbrook Park, PC 5679</p>
                            </div>
                            <div className="size-1/6 grid place-items-center">
                                <Icon icon="iconamoon:edit-fill" width="24" height="24" />
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="bg-white p-4 rounded-3xl" onClick={() => setOpen(false)}>
                        <div className="flex items-center">
                            <div className="size-1/6">
                                <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                    <div className="bg-black grid place-items-center rounded-full size-full">
                                        <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                    </div>
                                </div>
                            </div>
                            <div className="size-4/6">
                                <p className="text-lg font-bold">Home</p>
                                <p>61480 Sunbrook Park, PC 5679</p>
                            </div>
                            <div className="size-1/6 grid place-items-center">
                                <Icon icon="iconamoon:edit-fill" width="24" height="24" />
                            </div>
                        </div>
                    </div> */}
                </motion.div>
            </div>
            <Divider h={"0.5px"} />
            <Spacer />
            <div>
                <p className="text-xl font-bold">Lista de articulos</p>
                <Spacer />
                <div className="flex flex-col gap-4 p-4- rounded-3xl">
                    {data.map((order) => (
                        <CartItemForBuy2
                            key={order.id}
                            idCart={order.id}
                            idArticle={order.id_article}
                            image={order.article_image}
                            name={order.article_name}
                            description={order.description}
                            options={order.options}
                            values={order.values}
                            price={order.price + order.price_options}
                            quantity={order.quantity}
                            setTotalCart={setTotalCart}
                        />

                        // <div key={order.id} className="h-40 flex items-end- gap-2 bg-white p-4 rounded-3xl">
                        //     <div className="w-2/5 h-full">
                        //         <ImageA className="w-full h-full  object-cover rounded-2xl" src={order.article_image} />
                        //     </div>
                        //     <div className="w-2/3 h-full flex flex-col justify-around gap-3">
                        //         <p className="text-lg font-bold">{order.article_name}</p>
                        //         <p className="font-bold text-gray-500 text-xs">{order.description}</p>
                        //         <p className="text-gray-400">{order.options}</p>
                        //         <p className="text-lg font-bold">
                        //             $
                        //             {
                        //                 Number(order.price * order.quantity)
                        //                     .toString()
                        //                     .split(".")[0]
                        //             }
                        //         </p>
                        //     </div>
                        //     <div className="w-1/12 flex flex-col justify-end items-end">
                        //         <div className="size-9 grid place-items-center bg-slate-200 rounded-full">
                        //             <span>{order.quantity}</span>
                        //         </div>
                        //     </div>
                        // </div>
                    ))}
                    {/* <div className="h-40 flex items-end- gap-2 bg-white p-4 rounded-2xl">
                        <div className="w-2/5 h-full">
                            <ImageA
                                className="w-full h-full  object-cover rounded-3xl"
                                src="https://8cfbi9foz7.ufs.sh/f/0DUeKQjxChl7lBHUB6y7D4zVcm0fFoU6uJhKXLwTOIMGkjN3"
                            />
                        </div>
                        <div className="w-2/3 h-full flex flex-col justify-around gap-3">
                            <p className="text-lg font-bold">Werolla Cardigans</p>
                            <p className="text-gray-400">Color | Size = M</p>
                            <p className="text-lg font-bold">$385.00</p>
                        </div>
                        <div className="w-1/12 flex flex-col justify-end items-end">
                            <div className="size-9 grid place-items-center bg-slate-200 rounded-full">
                                <span>1</span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <Divider h={"0.5px"} />
            {/* {paymentMethods.map((payMethod) => {
                return (
                    <div className="flex gap-5" key={payMethod.id}>
                        <input
                            type="radio"
                            name="payMethod"
                            value={payMethod.id}
                            checked={payMethod.id == payMethodSelected.id}
                            onClick={() => setPayMethodSelected(payMethod)}
                        />
                        <p>{payMethod.name}</p>
                    </div>
                );
            })} */}
            {/* <Divider h={"0.5px"} /> */}
            <div>
                <p className="text-xl font-bold">Metodo de pago</p>
                <Spacer />
                <div className="bg-white p-4 rounded-3xl">
                    <div className="flex items-center">
                        <div className="size-1/6">
                            <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                <div className="bg-black grid place-items-center rounded-full size-full">
                                    <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                </div>
                            </div>
                        </div>
                        <div className="size-4/6">
                            <p className="text-lg font-bold">{payMethodSelected.name}</p>
                            <p>{payMethodSelected.description}</p>
                        </div>
                        <div className="size-1/6 grid place-items-center" onClick={() => setOpenPaymentMethods(!openPaymentMethods)}>
                            <Icon icon="iconamoon:edit-fill" width="24" height="24" />
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: openPaymentMethods ? "auto" : 0,
                        opacity: openPaymentMethods ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-2 flex flex-col gap-2 overflow-hidden bg-gray-200_p-4_mt-2_rounded"
                >
                    {paymentMethods
                        .filter((paymentMethod) => paymentMethod.id !== payMethodSelected.id)
                        .map((paymentMethod) => (
                            <div key={paymentMethod.id} className="bg-white p-4 rounded-3xl" onClick={() => setOrderPaymentMethod(paymentMethod)}>
                                <div className="flex items-center">
                                    <div className="size-1/6">
                                        <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                            <div className="bg-black grid place-items-center rounded-full size-full">
                                                <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="size-4/6">
                                        <p className="text-lg font-bold">{paymentMethod.name}</p>
                                        <p>{paymentMethod.description}</p>
                                    </div>
                                    <div className="size-1/6 grid place-items-center">
                                        <Icon icon="ep:select" width="24" height="24" />
                                    </div>
                                </div>
                            </div>
                        ))}
                </motion.div>

                {payMethodSelected.require_image == 1 && (
                    <>
                        <InputFile
                            imgLink=""
                            control={control}
                            errors={errors}
                            name="image"
                            inputClassName="border-2 border-gray-300 rounded-md p-2"
                            errorClassName="text-red-700"
                            placeholder=""
                            label="Imagen del comprobante"
                        />
                        <Spacer />
                    </>
                )}
                {payMethodSelected.type == 2 && (
                    <>
                        <div className="flex justify-between font-bold">
                            <p>Banco:</p>
                            <p>{payMethodSelected.bank_name}</p>
                        </div>
                        <div className="flex justify-between font-bold">
                            <p>Cuenta Bancaria</p>
                            <p>{payMethodSelected.bank_account}</p>
                        </div>
                    </>
                )}

                {/* <p className="mt-3">{payMethodSelected.description}</p> */}
            </div>
            {/* <div>
                <p className="text-xl font-bold">Metodo de pago</p>
                <Spacer />
                <div className="bg-white p-4 rounded-3xl">
                    <div className="flex items-center">
                        <div className="size-1/6">
                            <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                <div className="bg-black grid place-items-center rounded-full size-full">
                                    <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                </div>
                            </div>
                        </div>
                        <div className="size-4/6">
                            <p className="text-lg font-bold">Home</p>
                            <p>61480 Sunbrook Park, PC 5679</p>
                        </div>
                        <div className="size-1/6 grid place-items-center">
                            <Icon icon="iconamoon:edit-fill" width="24" height="24" />
                        </div>
                    </div>
                </div>
            </div> */}
            {/* const [priceWithoutDiscount, setPriceWithoutDiscount] = useState(0); 
            const [totalDiscount, setTotalDiscount] = useState(0); const
            [priceWithDiscount, setPriceWithDiscount] = useState(0); */}

            <Divider h={"0.5px"} />
            <div className="bg-white p-6 rounded-2xl flex flex-col gap-6">
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Total</p>
                    <p className="font-semibold">
                        {showPrice(Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithoutDiscount, 0))}
                    </p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Descuento</p>
                    <p className="font-bold">{showPrice(Object.values(priceArticles).reduce((acc, curr) => acc + curr.totalDiscount, 0.0))}</p>
                </div>
                <Divider mt={0} mb={0} h={"0.5px"} />
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Total General</p>
                    <p className="font-bold">{showPrice(Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0))}</p>
                </div>
            </div>
            <Divider h={"0.5px"} />
            <button className="bg-black text-white p-5 rounded-full w-full text-sm" onClick={handleClickPay}>
                <p>Realizar Compra</p>
            </button>
        </div>
    );

    // TODO: Mostrar este componente solo cuando el usuario no tiene ubicacion y prefiera que le manden el pedido
    // if (id == "" && direction.id == null) return <AddDireccion />;
    if (wantUseAddress == null) return <AddDireccion />;
    return (
        <div className="">
            <Toaster richColors />
            <div className="m-4">
                <p>
                    Al realizar el pedido, aceptas el <span className="text-blue-500 underline">aviso de privacidad</span> y las{" "}
                    <span className="text-blue-500 underline">condiciones de uso</span> de {appName}
                </p>

                <div className="flex flex-col gap-5 mt-5">
                    <Button text={`Pagar en ${currencySelected.iso_code}`} fn={handleClickPay} />
                </div>
            </div>

            <Divider h={2.5} />

            <div className="m-4">
                <div className="flex justify-between">
                    <p>Productos ({products}):</p>
                    <p>
                        {currencySelected.iso_code} {showPrice(productsPrice, true)}.{showPrice(productsPrice, false)}
                    </p>
                </div>
                <div className="flex justify-between">
                    <p>Envio y manejo:</p>
                    <p>{currencySelected.iso_code} 0.00</p>
                </div>
                <div className="flex justify-between">
                    <p>Total antes de impuestos:</p>
                    <p>
                        {currencySelected.iso_code} {showPrice(productsPrice, true)}.{showPrice(productsPrice, false)}
                    </p>
                </div>
                <div className="flex justify-between">
                    <p>Calculo estimado de impuestos por cobrar:</p>
                    <p>{currencySelected.iso_code} 0.00</p>
                </div>
                <div className="flex justify-between font-bold text-xl">
                    <p>Total del pedido:</p>
                    <p>
                        {currencySelected.iso_code} {showPrice(productsPrice, true)}.{showPrice(productsPrice, false)}
                    </p>
                </div>
            </div>

            <Divider h={2.5} />

            <div className="m-4">
                <p>Conversor de divisas de {appName}</p>
                <p>Habalitado - pagar en DOP</p>

                {currencies.map((currency) => {
                    const price = calcPriceCurrency(currency, productsRealPrice);
                    return (
                        <div className="flex gap-5" key={currency.id}>
                            <input
                                type="radio"
                                name="currency"
                                value={currency.id}
                                checked={currency.id == currencySelected.id}
                                onClick={() => setCurrencySelected(currency)}
                                // onChange={() => setCurrencySelected(currency)}
                            />
                            <p>
                                {/* {currency.name} {showPrice(price, true)}.{showPrice(price, false)} */}
                                {currency.iso_code} {showPrice(price, true)}.{showPrice(price, false)}
                            </p>
                        </div>
                    );
                })}

                {/* <div className="flex gap-5">
                    <input type="radio" name="divisa" value="DOP" />
                    <p>
                        DOP {showPrice(productsPrice, true)}.{showPrice(productsPrice, false)}
                    </p>
                </div>
                <div className="flex gap-5">
                    <input type="radio" name="divisa" value="USD" />
                    <p>
                        USD {showPrice(productsPrice, true)}.{showPrice(productsPrice, false)}
                    </p>
                </div> */}

                <p>Pagando en efectivo</p>
                <p className="text-blue-500 underline">Cambiar el metodo de pago </p>
                <p className="text-blue-500 underline">Utilizar una tarjeta de regalo, vale o codigo promocional </p>
            </div>

            <Divider />

            <div className="m-4">
                {/* <p>Conversor de divisas de {appName}</p> */}
                <p>Seleciona el metodo de pago de tu preferencia</p>
                {/* {payMethods.map((payMethod) => {
                    return (
                        <div className="flex gap-5" key={payMethod.id}>
                            <input
                                type="radio"
                                name="payMethod"
                                value={payMethod.id}
                                checked={payMethod.id == payMethodSelected.id}
                                onClick={() => setPayMethodSelected(payMethod)}
                            />
                            <p>{payMethod.name}</p>
                        </div>
                    );
                })} */}
                {paymentMethods.map((payMethod) => {
                    return (
                        <div className="flex gap-5" key={payMethod.id}>
                            <input
                                type="radio"
                                name="payMethod"
                                value={payMethod.id}
                                checked={payMethod.id == payMethodSelected.id}
                                onClick={() => setPayMethodSelected(payMethod)}
                            />
                            <p>{payMethod.name}</p>
                        </div>
                    );
                })}

                {payMethodSelected.require_image == 1 && (
                    <InputFile
                        imgLink=""
                        control={control}
                        errors={errors}
                        name="image"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Imagen del comprobante"
                    />
                )}
                <p className="mt-3">{payMethodSelected.description}</p>
            </div>

            <Divider />
            <Divider />
            <p>Entregada para Alam Francisco</p>
            <p>Direccion</p>
            <p className="text-blue-500 underline">Modificar direccion de etrega</p>
            <p className="text-blue-500 underline">Agregar intruncciones de entrega</p>

            <Divider />
            {/* <Divider /> */}
            {/* <p>LLega el martes 19 de octubre</p>
            <p>Si realizas tu pedido en 2 horas y 40 minutos Detalles</p>

            <div>
                <input type="radio" />
                <div>
                    <p>martes, 1 de abr y miercole, 2 de abril</p>
                    <p>GRATIS Entrega</p>
                </div>
            </div>

            <div>
                <input type="radio" />
                <div>
                    <p>martes, 1 de abr y miercole, 2 de abril</p>
                    <p>GRATIS Entrega</p>
                </div>
            </div> */}

            <div>
                {data.map((cartItem) => (
                    <CartItemForBuy
                        key={cartItem.id}
                        id={cartItem.id}
                        idArticle={cartItem.id_article}
                        image={cartItem.article_image}
                        price={(cartItem.price + cartItem.price_options) * cartItem.quantity}
                        description={cartItem.article_name + " - " + cartItem.description}
                        options={cartItem.options}
                        values={cartItem.values}
                        quantity={cartItem.quantity}
                        status={cartItem.status}
                        // refetch={refreshCart}
                    />
                ))}
            </div>

            <Divider h={2.5} />

            <div className="flex flex-col gap-5 mt-10">
                <Button text={`Pagar en ${currencySelected.name}`} fn={() => {}} />
            </div>
            <p>
                Al realizar el pedido, aceptas el <span className="text-blue-500 underline">aviso de privacidad</span> y las{" "}
                <span className="text-blue-500 underline">condiciones de uso</span> de Amazon
            </p>
            <p>
                Por que se cobraron impuestos de venta en tu pedido?{" "}
                <span className="text-blue-500 underline">Ver la informacion impositada y del vendedor</span>{" "}
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, a. Tempore porro earum quaerat corporis ullam nostrum quisquam
                fugiat consectetur, eligendi omnis at natus animi. Facere distinctio beatae quia deserunt.
            </p>
        </div>
    );
};

export default CarritoClient;
