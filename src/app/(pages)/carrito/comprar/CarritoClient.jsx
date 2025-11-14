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
import { useGetPaymentMethodById, useGetPaymentMethods } from "@/app/hooks/request/payment-methods/requestsPaymentMethods";
import { useGetCurrenciesForCustomers } from "@/app/hooks/request/currencies/requestsCurrencies";
import {
    calcPriceCurrency,
    calcPriceInCurrency,
    isUUID,
    showPrice,
    showPriceWithCurrency,
    showPriceWithCurrencyUser,
    showText,
} from "@/app/hooks/app/app";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { useChangeArticleQuantity } from "@/app/hooks/request/articles/requestsArticles";
import { Icon } from "@iconify/react";
import ImageA from "@/app/components/others/ImageA";
import { Listbox } from "@headlessui/react";
import { useGetUserAddresses, useSetUserAddressPreferred } from "@/app/hooks/request/users/requestsUsersAddresses";
import {
    useChangeIdCurrencyUser,
    useChangeIdPayMethodForCart,
    useChangeIdShopForCart,
    useChangeIdUserAdressForCart,
    useChangeUserWantUseAddress,
    useGetUserById,
} from "@/app/hooks/request/users/requestsUsers";
import CartItemForBuy2 from "../components/CartItemForBuy2";
import { useCreateOrderPaypal } from "@/app/hooks/request/payments/requestsPaypal";
import { useGetShopsForUserCart } from "@/app/hooks/request/shops/requestsShops";
import { getUserById } from "@/app/request/users/requestsUsers";
import { getCartUserReadyToBuy } from "@/app/request/carts/requestsCarts";
import { getUserAddresses } from "@/app/request/users/requestsUsersAddresses";
import { getShopsForUserCart } from "@/app/request/shops/requestShops";
import { getCurrencyById } from "@/app/request/currencies/requestsCurrencies";
import { useSendPushNotificationsForNewsOrders } from "@/app/hooks/request/web-push-notifications/webPushNotifications";

const CarritoClient = () => {
    // const { token } = useParams();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");
    const payerId = searchParams.get("PayerID");

    const comeFromPaypal = token ? true : false;
    const comeFromPaypalAndPayed = token && payerId ? true : false;

    console.log(comeFromPaypal);
    console.log(comeFromPaypalAndPayed);

    const captureOrderPaypal = async (token) => {
        if (!comeFromPaypalAndPayed) {
            toast.error("Compra cancelada");
            router.replace("/carrito/comprar");
            return;
        }
        const res = await fetch(`http://localhost:3001/api/payments/paypal/capture-order/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log(data);
        // TODO: ESTA FALLANDO AL GUARDAR LA DATA EN EN BACKEND
        // TODO: LA MONEDA DOP NO SE PERMITE EN PAYPAL
        if (data.status == "COMPLETED") {
            // await handleClickPay(true);

            const loadingToast = toast.loading("Realizando compra...");

            const infoUser = await getUserById(id);
            console.log(infoUser);
            const userCurrency = await getCurrencyById(infoUser.id_currency);
            console.log(userCurrency);

            const cartUser = await getCartUserReadyToBuy(id);

            const userAddresses = await getUserAddresses(id);
            const shopsCart = await getShopsForUserCart(id);

            console.log(userAddresses);
            console.log(shopsCart);

            console.log(getDeliveryPrice(shopsCart[0], userAddresses[0]));

            const deliveryCost =
                infoUser.want_use_address == 1
                    ? convertDOP(getDeliveryPrice(shopsCart[0], userAddresses[0]).price, userCurrency.iso_code, userCurrency.exchange_rate)
                    : 0;
            console.log(deliveryCost);
            const deliveryDistance = infoUser.want_use_address == 1 ? getDeliveryPrice(shopsCart[0], userAddresses[0]).distance : 0;

            const userAddresSelectedForCart =
                infoUser.id_address_for_cart != null ? infoUser.id_address_for_cart : userAddresses[0] ? userAddresses[0].id : null;

            console.log(
                id,
                infoUser.id_payment_method_for_cart,
                null,
                infoUser.id_currency,
                infoUser.want_use_address == null ? 0 : infoUser.want_use_address,
                // infoUser.id_address_for_cart ?? userAddresses[0]?.id,
                userAddresSelectedForCart,
                infoUser.id_shop_for_cart ?? shopsCart[0]?.id
            );

            // const currencyUser = {
            //     iso_code: infoUser,
            //     exchange_rate: infoUser,
            // };

            // const total = calculateTotalWithPaypalFee(
            //     Object.values(cartUser).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0),
            //     infoUser.id_currency
            // );

            console.log(cartUser);

            // const total = showPriceWithCurrency(
            //     userCurrency,
            //     Object.values(cartUser).reduce((acc, curr) => acc + curr.priceWithoutDiscount, 0.0),
            //     false
            // );
            // const totalDiscount = showPriceWithCurrency(
            //     userCurrency,
            //     Object.values(cartUser).reduce((acc, curr) => acc + curr.totalDiscount, 0.0),
            //     false
            // );

            // let subtotal = 0;
            // cartUser.forEach((cartItem) => {
            //     subtotal += (Number(cartItem.price) + Number(cartItem.price_options)) * Number(cartItem.quantity);
            // });
            // let total = 0;
            // cartUser.forEach((cartItem) => {
            //     const totalPriceArticle = (Number(cartItem.price) + Number(cartItem.price_options)) * Number(cartItem.quantity);
            //     const currencyArticle = {
            //         iso_code: cartItem.iso_code,
            //         exchange_rate: cartItem.exchange_rate,
            //     };
            //     const totalArticleInCurrencyUser = showPriceWithCurrencyUser(totalPriceArticle, currencyArticle, userCurrency, false);
            //     total += totalArticleInCurrencyUser;
            // });
            // let totalDiscount = 0;
            // cartUser.forEach((cartItem) => {
            //     const totalPriceArticle = (Number(cartItem.price) + Number(cartItem.price_options)) * Number(cartItem.quantity);
            //     const percentDiscount = cartItem.offer ? cartItem.offer.percent_discount : 0;
            //     const currencyArticle = {
            //         iso_code: cartItem.iso_code,
            //         exchange_rate: cartItem.exchange_rate,
            //     };
            //     const totalDiscountArticleInCurrencyUser =
            //         showPriceWithCurrencyUser(totalPriceArticle, currencyArticle, userCurrency, false) * (percentDiscount / 100);
            //     totalDiscount += totalDiscountArticleInCurrencyUser;
            // });

            // const totalWithFee = calculateTotalWithPaypalFee(subtotal, userCurrency.iso_code);

            // const paypalFee = totalWithFee - subtotal;

            //  {
            //      payMethodSelected.is_paypal_method == 1
            //          ? showPriceWithCurrency(
            //                currencySelected,
            //                calculateTotalWithPaypalFee(
            //                    Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0),
            //                    currencySelected.iso_code
            //                ) - Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0),
            //                false
            //            )
            //          : showPriceWithCurrency(currencySelected, 0, false);
            //  }

            let subtotal = 0;
            let total = 0;
            let totalDiscount = 0;

            cartUser.forEach((cartItem) => {
                const basePrice = (Number(cartItem.price) + Number(cartItem.price_options)) * Number(cartItem.quantity);

                // Conversión de moneda
                const currencyArticle = {
                    iso_code: cartItem.iso_code,
                    exchange_rate: cartItem.exchange_rate,
                };
                const priceInUserCurrency = showPriceWithCurrencyUser(basePrice, currencyArticle, userCurrency, false);

                subtotal += basePrice; // Precio en moneda original del artículo
                total += priceInUserCurrency; // Precio convertido para mostrar al usuario

                // Calcular descuento (en moneda del usuario)
                const percentDiscount = cartItem.offer ? cartItem.offer.percent_discount : 0;
                const discount = priceInUserCurrency * (percentDiscount / 100);
                totalDiscount += discount;
            });

            // const total = subtotal - total_discount + paypalFee;

            // 💰 Calcula la comisión de PayPal sobre el subtotal original
            // const totalWithFee = calculateTotalWithPaypalFee(subtotal - totalDiscount, userCurrency.iso_code);
            // showPriceWithCurrency(
            //     currencySelected,
            //     calculateTotalWithPaypalFee(
            //         Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0),
            //         currencySelected.iso_code
            //     ) - Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0),
            //     false
            // );
            // const paypalFee = totalWithFee - (subtotal - totalDiscount);
            const paypalFee = getPaypalFee(total - totalDiscount + deliveryCost, userCurrency.iso_code);

            const { data: resData, status } = await useCreateCartBuy(
                id,
                infoUser.id_payment_method_for_cart,
                total,
                totalDiscount,
                paypalFee,
                token,
                deliveryCost,
                deliveryDistance,
                null,
                infoUser.id_currency,
                infoUser.want_use_address == null ? 0 : infoUser.want_use_address,
                // infoUser.id_address_for_cart ?? userAddresses[0]?.id,
                userAddresSelectedForCart,
                infoUser.id_shop_for_cart ?? shopsCart[0]?.id
            );

            const resItem = await useCreateCartBuyItem(resData.id, cartUser);

            const resCartItems = await useUpdateCartItemsStatus(cartUser, 5);

            const resArticlesChangeQuantity = await useChangeArticleQuantity(cartUser, "subtract");

            refetch();
            setPriceArticles({});

            if (status && resItem && resCartItems && resArticlesChangeQuantity) toast.success("Compra realizada", { id: loadingToast });
            else toast.error("Error al realizar la compra", { id: loadingToast });
            router.replace("/usuario/pedidos");
        } else {
            toast.error("Error al realizar la compra");
            // router.replace("/carrito/comprar");
        }
        // console.log(data);
    };

    const { hasData, id, type, firstName, address, wantUseAddress, changeUserWantUseAddress, idCurrency: idCurrencyUser } = zusUser();

    useEffect(() => {
        console.log(token);
        console.log(payerId);
        console.log("-------------");
        if (!token || payerId == "" || !hasData) return;
        captureOrderPaypal(token);
    }, [token, hasData]);

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

    // useEffect(() => {
    //     console.error(wantUseAddress);
    // }, [wantUseAddress]);

    const { appName, payMethods } = appSettings();
    // const { appName, currencies, payMethods } = appSettings();
    const {
        totalSelectedArticles,
        totalSelectedPrice,
        setTotalSelectedArticles,
        payMethodSelected,
        setPayMethodSelected,
        shopSelectedForAddress,
        setShopSelectedForAddress,
        userAddressSelected,
        setUserAddressSelected,
        deliveryPreferenceSelected,
        setDeliveryPreferenceSelected,
    } = zusCart();

    const { showCurrencies, setShowCurrencies, currencySelected, setCurrencySelected } = zusCart();

    const { data: currencies, isLoading: isLoadingCurrencies } = useGetCurrenciesForCustomers();

    useEffect(() => {
        if (isLoadingCurrencies || !currencies || !hasData) return;
        let currencySelectByUser;
        if (isUUID(idCurrencyUser)) currencySelectByUser = currencies.find((currency) => currency.id == idCurrencyUser);
        else currencySelectByUser = currencies.find((currency) => currency.main_currency == 1);
        setCurrencySelected(currencySelectByUser);
    }, [currencies, hasData]);

    const [priceArticles, setPriceArticles] = useState({});

    useEffect(() => {
        return () => {
            setPriceArticles({});
        };
    }, []);

    const { data, isLoading, refetch } = useGetCartUserReadyToBuy(id);

    const setTotalCart = (articlePrice) => setPriceArticles((prev) => ({ ...prev, [articlePrice.idCart]: { ...articlePrice } }));

    const { data: dataUser, isLoading: dataUserIsLoadinf, refetch: dataUserRefetch } = useGetUserById(id);

    useEffect(() => {
        // setPriceArticles({});
    }, []);

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

    const { data: shopsForUserCart, isLoading: isLoadingShopsForUserCart } = useGetShopsForUserCart(id);

    useEffect(() => {
        if ((isLoadingShopsForUserCart && !shopsForUserCart) || shopsForUserCart == undefined || !dataUser) return;

        if (isUUID(dataUser.id_shop_for_cart)) {
            const shopSelected = shopsForUserCart.find((shop) => shop.id == dataUser.id_shop_for_cart);
            if (shopSelected.id) setShopSelectedForAddress(shopSelected);
            else setShopSelectedForAddress(shopsForUserCart[0]);
        } else setShopSelectedForAddress(shopsForUserCart[0]);
    }, [shopsForUserCart]);

    const { data: paymentMethods, isLoading: isLoadingPaymentMethods } = useGetPaymentMethods();

    const { data: paymentMethodForCart, isLoading: isLoadingPaymentMethodForCart } = useGetPaymentMethodById(dataUser?.id_payment_method_for_cart);

    useEffect(() => {
        if (isLoadingPaymentMethods || isLoadingPaymentMethodForCart) return;
        if (paymentMethodForCart && paymentMethodForCart.id) setPayMethodSelected(paymentMethodForCart);
        else setPayMethodSelected(paymentMethods[0]);
    }, [isLoadingPaymentMethods, paymentMethods, isLoadingPaymentMethodForCart, paymentMethodForCart]);

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
        // total = calcPriceCurrency(currencySelected, total);
        setProducts(data.length);
        // setProductsPrice(total);
    }, [data, currencySelected]);

    useEffect(() => {
        console.log(dataUser);
    }, [dataUser]);

    const { data: userAddresses, isLoading: userAddressesIsLoading, refetch: userAddresRefetch } = useGetUserAddresses(id);

    useEffect(() => {
        if ((userAddresses && !userAddresses) || userAddresses == undefined) return;
        setUserAddressSelected(userAddresses[0]);
    }, [userAddresses]);

    // useEffect(() => {
    //     if (isLoadingCurrencies) return;
    //     setCurrencySelected(currencies.find((currency) => currency.main_currency == 1));
    // }, [currencies]);

    const people = [
        { id: 1, name: "Durward Reynolds" },
        { id: 2, name: "Kenton Towne" },
        { id: 3, name: "Therese Wunsch" },
        { id: 4, name: "Benedict Kessler" },
        { id: 5, name: "Katelyn Rohan" },
    ];

    const [selected, setSelected] = useState(people[0]);

    const [open, setOpen] = useState(false);

    const [showUserAddresses, setShowUserAddresses] = useState(false);

    const [openPaymentMethods, setOpenPaymentMethods] = useState(false);

    // const [showCurrencies, setShowCurrencies] = useState(false);

    // CREATE TABLE carts_bought_items(
    //     id char(36) NOT NULL PRIMARY KEY,
    //     id_cart_bought char(36) NOT NULL,
    //     id_cart char(36) NOT NULL,
    //     price DECIMAL(10,2) NOT NULL,
    //     id_currency char(36) NOT NULL,
    //     status TINYINT NOT NULL,
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    // );

    const paypalFees = {
        USD: { percent: 0.045, fixed: 0.3 },
        EUR: { percent: 0.045, fixed: 0.35 },
        DOP: { percent: 0.045, fixed: 15 },
        GBP: { percent: 0.045, fixed: 0.2 },
        MXN: { percent: 0.045, fixed: 4 },
        AUD: { percent: 0.045, fixed: 0.59 },
        BRL: { percent: 0.045, fixed: 2.9 },
        CAD: { percent: 0.045, fixed: 0.59 },
        CZK: { percent: 0.045, fixed: 9.0 },
        DKK: { percent: 0.045, fixed: 2.9 },
        HUF: { percent: 0.045, fixed: 149.0 },
        ILS: { percent: 0.045, fixed: 1.6 },
        JPY: { percent: 0.045, fixed: 49.0 },
        MYR: { percent: 0.045, fixed: 2.0 },
        HKD: { percent: 0.045, fixed: 3.79 },
        NZD: { percent: 0.045, fixed: 0.69 },
        NOK: { percent: 0.045, fixed: 3.9 },
        PHP: { percent: 0.045, fixed: 25.0 },
        PLN: { percent: 0.045, fixed: 1.89 },
        RUB: { percent: 0.045, fixed: 39.0 },
        SGD: { percent: 0.045, fixed: 0.69 },
        SEK: { percent: 0.045, fixed: 4.09 },
        CHF: { percent: 0.045, fixed: 0.49 },
        THB: { percent: 0.045, fixed: 15.0 },
        TWD: { percent: 0.045, fixed: 14.0 },
    };

    function calculateTotalWithPaypalFee(amount, currency) {
        const fee = paypalFees[currency];
        if (!fee) throw new Error("Moneda no soportada");
        return (amount + fee.fixed) / (1 - fee.percent).toFixed(2);
    }
    function getPaypalFee(amount, currency) {
        const fee = paypalFees[currency];
        if (!fee) throw new Error("Moneda no soportada");

        const paypalFee = amount * fee.percent + fee.fixed;
        return paypalFee;
    }

    // 🔹 Si quieres obtener el total final para el cliente:
    function getTotalWithPaypalFee(amount, currency) {
        return parseFloat((amount + getPaypalFee(amount, currency)).toFixed(2));
    }

    function convertDOP(amount, currency, exchangeRate = null) {
        let rate;
        if (exchangeRate == null) {
            const currencyForConvert = currencies.find((currencyItem) => currencyItem.iso_code == currency);
            rate = currencyForConvert.exchange_rate;
        } else rate = exchangeRate;
        if (!rate) throw new Error(`Moneda ${currency} no soportada`);
        return +(amount * rate).toFixed(2); // redondea a 2 decimales
    }

    // Calcula distancia entre dos ubicaciones (en kilómetros)
    function calculateDistance(from, to) {
        const R = 6371; // Radio de la Tierra en km
        const toRad = (value) => (value * Math.PI) / 180;

        // Convertir explícitamente a número
        const lat1 = parseFloat(from.latitude);
        const lon1 = parseFloat(from.longitude);
        const lat2 = parseFloat(to.latitude);
        const lon2 = parseFloat(to.longitude);

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // distancia en km
    }
    // function calculateDistance(from, to) {
    //     const R = 6371; // Radio de la Tierra en km
    //     const toRad = (value) => (value * Math.PI) / 180;

    //     const dLat = toRad(to.latitude - from.latitude);
    //     const dLon = toRad(to.longitude - from.longitude);

    //     const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(from.latitude)) * Math.cos(toRad(to.latitude)) * Math.sin(dLon / 2) ** 2;

    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    //     return R * c; // distancia en km
    // }

    // Calcula precio del envío entre dos puntos
    function getDeliveryPrice(from, to) {
        console.log(from);
        console.log(to);
        // return;
        if (!from?.latitude || !from?.longitude || !to?.latitude || !to?.longitude) {
            return {
                distance: 0, // km
                price: 0, // precio final
            };
            // throw new Error("Both origin and destination must include latitude and longitude");
        }

        const distance = calculateDistance(from, to);
        const basePrice = 50; // precio base (ajustable)
        const pricePerKm = 15; // costo por km (ajustable)

        const total = basePrice + distance * pricePerKm;

        return {
            distance: Number(distance.toFixed(2)), // km
            // price: Math.round(total), // precio final
            price: Number(total.toFixed(2)), // precio final
        };
    }

    function calculateTotalWithPaypalFee(amount, percentFee, fixedFee) {
        return (amount + fixedFee) / (1 - percentFee);
    }

    const crearePurchaseUnitsForPaypal = (articles, add) => {
        const currency_code = currencySelected.iso_code;

        // const totalWithFee = (price - discount + paypalFee).toFixed(2);

        const subtotal = price - discount;
        // const factor = paypalFee / subtotal;

        const deliveryPricePaypal = deliveryPrice;
        let totalPriceForClient = deliveryPrice;
        let itemsTotal = 0;

        const items = articles.map((article) => {
            const currencyArticle = { iso_code: article.iso_code, exchange_rate: article.exchange_rate };
            let originalPrice = parseFloat(article.price) + parseFloat(article.price_options);
            const percentDiscount = article.offer ? article.offer.percent_discount : 0;
            originalPrice = originalPrice * (1 - percentDiscount / 100);
            originalPrice = showPriceWithCurrencyUser(originalPrice, currencyArticle, currencySelected, false).toFixed(2);

            // const proportion = originalPrice / subtotal;
            // const extra = proportion * paypalFee; // parte proporcional del fee
            // const newPrice = originalPrice + extra;
            console.log(originalPrice);
            // console.log(extra);

            // totalPriceForClient += newPrice * article.quantity;
            itemsTotal += parseFloat(originalPrice) * Number(article.quantity);

            return {
                name: article.article_name,
                description: article.description,
                quantity: article.quantity.toString(),
                unit_amount: {
                    currency_code: currency_code,
                    // value: showPriceWithCurrencyUser(originalPrice * factor, currencyArticle, currencySelected, false).toFixed(2),
                    value: originalPrice,
                },
            };
        });

        console.log(itemsTotal);
        console.log(deliveryPricePaypal);

        let totalAmount = itemsTotal + deliveryPricePaypal;
        // itemsTotal += deliveryPricePaypal;
        console.log(totalAmount);

        const paypalFee = getPaypalFee(totalAmount, currencySelected.iso_code);
        totalAmount += paypalFee;
        itemsTotal += paypalFee;

        items.push({
            name: "cobro paypal",
            description: "cobro paypal",
            quantity: "1",
            unit_amount: {
                currency_code: currency_code,
                value: paypalFee.toFixed(2),
            },
        });

        return [
            {
                description: "Compra de productos electrónicos",
                items: items,
                amount: {
                    currency_code: currency_code,
                    value: totalAmount.toFixed(2), // Total general de la orden
                    breakdown: {
                        item_total: {
                            currency_code: currency_code,
                            // value: (totalWithFee - deliveryPrice - paypalFee).toFixed(2), // Suma de los items
                            value: itemsTotal.toFixed(2), // Suma de los items
                        },
                        shipping: {
                            currency_code: currency_code,
                            value: deliveryPricePaypal.toFixed(2),
                        },
                    },
                },
            },
        ];
    };
    // const crearePurchaseUnitsForPaypal = (articles, add) => {
    //     const currency_code = currencySelected.iso_code;

    //     // const totalWithFee = (price - discount + paypalFee).toFixed(2);

    //     const subtotal = price - discount;
    //     // const factor = paypalFee / subtotal;

    //     const deliveryPricePaypal = deliveryPrice;
    //     let totalPriceForClient = deliveryPrice;
    //     let itemsTotal = 0;

    //     const items = articles.map((article) => {
    //         const currencyArticle = { iso_code: article.iso_code, exchange_rate: article.exchange_rate };
    //         let originalPrice = Number(article.price) + Number(article.price_options);
    //         const percentDiscount = article.offer ? article.offer.percent_discount : 0;
    //         originalPrice = originalPrice * (1 - percentDiscount / 100);
    //         originalPrice = showPriceWithCurrencyUser(originalPrice, currencyArticle, currencySelected, false);

    //         const proportion = originalPrice / subtotal;
    //         const extra = proportion * paypalFee; // parte proporcional del fee
    //         const newPrice = parseFloat((originalPrice + extra).toFixed());
    //         // console.log(originalPrice);
    //         // console.log(extra);

    //         totalPriceForClient += newPrice * article.quantity;
    //         itemsTotal += newPrice * article.quantity;

    //         return {
    //             name: article.article_name,
    //             description: article.description,
    //             quantity: article.quantity.toString(),
    //             unit_amount: {
    //                 currency_code: currency_code,
    //                 // value: showPriceWithCurrencyUser(originalPrice * factor, currencyArticle, currencySelected, false).toFixed(2),
    //                 value: newPrice.toFixed(2),
    //             },
    //         };
    //     });

    //     console.log(itemsTotal);
    //     console.log(deliveryPricePaypal);

    //     const totalAmount = itemsTotal + deliveryPricePaypal;
    //     console.log(totalAmount);

    //     return [
    //         {
    //             description: "Compra de productos electrónicos",
    //             items: items,
    //             amount: {
    //                 currency_code: currency_code,
    //                 value: totalAmount.toFixed(2), // Total general de la orden
    //                 breakdown: {
    //                     item_total: {
    //                         currency_code: currency_code,
    //                         // value: (totalWithFee - deliveryPrice - paypalFee).toFixed(2), // Suma de los items
    //                         value: itemsTotal.toFixed(2), // Suma de los items
    //                     },
    //                     shipping: {
    //                         currency_code: currency_code,
    //                         value: deliveryPricePaypal.toFixed(2),
    //                     },
    //                 },
    //             },
    //         },
    //     ];
    // };
    // const crearePurchaseUnitsForPaypal = (articles, add) => {
    //     console.log(articles);
    //     // const subtotal = articles.reduce((acc, article) => {
    //     //     const price = Number(article.price) + Number(article.price_options);
    //     //     return acc + price * article.quantity;
    //     // }, 0);

    //     const currency_code = currencySelected.iso_code;

    //     // const paypalFee = getPaypalFee(subtotal + add, currency_code);
    //     // console.log(paypalFee);

    //     console.log(currencySelected);
    //     // console.log(subtotal);
    //     // const totalWithFee = calcPriceCurrency(currencySelected, subtotal + paypalFee);
    //     // const totalWithFee = price - discount + paypalFee;
    //     const totalWithFee = (price - discount + paypalFee).toFixed(2);

    //     console.log(totalWithFee);
    //     console.log(paypalFee);

    //     // const totalWithFee = calculateTotalWithPaypalFee(subtotal, currency_code);

    //     const subtotal = price - discount;
    //     console.log(subtotal);
    //     const factor = paypalFee / subtotal;
    //     // const factor = paypalFee / price - discount;

    //     console.log(factor);

    //     const deliveryPricePaypal = parseFloat(deliveryPrice.toFixed(2));
    //     let totalPriceForClient = parseFloat(deliveryPrice.toFixed(2));

    //     const items = articles.map((article) => {
    //         const currencyArticle = { iso_code: article.iso_code, exchange_rate: article.exchange_rate };
    //         let originalPrice = Number(article.price) + Number(article.price_options);
    //         const percentDiscount = article.offer ? article.offer.percent_discount : 0;
    //         originalPrice = originalPrice * (1 - percentDiscount / 100);
    //         originalPrice = showPriceWithCurrencyUser(originalPrice, currencyArticle, currencySelected, false);

    //         const proportion = originalPrice / subtotal;
    //         const extra = parseFloat((proportion * paypalFee).toFixed(2)); // parte proporcional del fee
    //         const newPrice = originalPrice + extra;
    //         console.log(originalPrice);
    //         console.log(extra);
    //         // return { ...item, newPrice: newPrice.toFixed(2) };

    //         totalPriceForClient += newPrice * article.quantity;

    //         return {
    //             name: article.article_name,
    //             description: article.description,
    //             quantity: article.quantity.toString(),
    //             unit_amount: {
    //                 currency_code: currency_code,
    //                 // value: showPriceWithCurrencyUser(originalPrice * factor, currencyArticle, currencySelected, false).toFixed(2),
    //                 value: newPrice.toFixed(2),
    //             },
    //         };
    //     });

    //     // const deliveryPricePaypal = ;

    //     // totalPriceForClient += deliveryPricePaypal;

    //     return [
    //         {
    //             description: "Compra de productos electrónicos",
    //             items: items,
    //             amount: {
    //                 currency_code: currency_code,
    //                 value: totalPriceForClient.toFixed(2), // Total general de la orden
    //                 breakdown: {
    //                     item_total: {
    //                         currency_code: currency_code,
    //                         // value: (totalWithFee - deliveryPrice - paypalFee).toFixed(2), // Suma de los items
    //                         value: (totalPriceForClient - deliveryPricePaypal).toFixed(2), // Suma de los items
    //                     },
    //                     shipping: {
    //                         currency_code: currency_code,
    //                         value: deliveryPricePaypal.toFixed(2),
    //                     },
    //                 },
    //             },
    //         },
    //     ];
    // };

    // const crearePurchaseUnitsForPaypal = (articles, add) => {
    //     console.log(articles);
    //     // const subtotal = articles.reduce((acc, article) => {
    //     //     const price = Number(article.price) + Number(article.price_options);
    //     //     return acc + price * article.quantity;
    //     // }, 0);

    //     const currency_code = currencySelected.iso_code;

    //     // const paypalFee = getPaypalFee(subtotal + add, currency_code);
    //     // console.log(paypalFee);

    //     console.log(currencySelected);
    //     // console.log(subtotal);
    //     // const totalWithFee = calcPriceCurrency(currencySelected, subtotal + paypalFee);
    //     const totalWithFee = price - discount + paypalFee + deliveryPrice;

    //     console.log(totalWithFee);
    //     console.log(paypalFee);

    //     // const totalWithFee = calculateTotalWithPaypalFee(subtotal, currency_code);

    //     const subtotal = price - discount + deliveryPrice;
    //     console.log(subtotal);
    //     const factor = paypalFee / subtotal;

    //     // const factor = paypalFee / price - discount;

    //     console.log(factor);

    //     // const originalTotal = 1747.26;
    //     // const totalWithFee = calculateTotalWithPaypalFee(originalTotal, 0.045, 0.35);

    //     // articles.forEach((cartItem) => {
    //     //     const totalPriceArticle = Number(cartItem.price) + Number(cartItem.price_options) * Number(cartItem.quantity);
    //     //     const currencyArticle = {
    //     //         iso_code: cartItem.iso_code,
    //     //         exchange_rate: cartItem.exchange_rate,
    //     //     };
    //     //     const totalArticleInCurrencyUser = showPriceWithCurrencyUser(totalPriceArticle, currencyArticle, userCurrency, false);
    //     //     total += totalArticleInCurrencyUser;
    //     // });
    //     // let totalDiscount = 0;
    //     // cartUser.forEach((cartItem) => {
    //     //     const totalPriceArticle = Number(cartItem.price) + Number(cartItem.price_options) * Number(cartItem.quantity);
    //     //     const percentDiscount = cartItem.offer ? cartItem.offer.percent_discount : 0;
    //     //     const currencyArticle = {
    //     //         iso_code: cartItem.iso_code,
    //     //         exchange_rate: cartItem.exchange_rate,
    //     //     };
    //     //     const totalDiscountArticleInCurrencyUser =
    //     //         showPriceWithCurrencyUser(totalPriceArticle, currencyArticle, userCurrency, false) * (percentDiscount / 100);
    //     //     totalDiscount += totalDiscountArticleInCurrencyUser;
    //     // });

    //     const items = articles.map((article) => {
    //         let originalPrice = Number(article.price) + Number(article.price_options);
    //         const percentDiscount = article.offer ? article.offer.percent_discount : 0;
    //         originalPrice = originalPrice * (1 - percentDiscount / 100);

    //         const proportion = originalPrice / subtotal;
    //         const extra = proportion * paypalFee; // parte proporcional del fee
    //         const newPrice = originalPrice + extra;
    //         // return { ...item, newPrice: newPrice.toFixed(2) };

    //         const currencyArticle = { iso_code: article.iso_code, exchange_rate: article.exchange_rate };
    //         return {
    //             name: article.article_name,
    //             description: article.description,
    //             quantity: article.quantity.toString(),
    //             unit_amount: {
    //                 currency_code: currency_code,
    //                 // value: showPriceWithCurrencyUser(originalPrice * factor, currencyArticle, currencySelected, false).toFixed(2),
    //                 value: newPrice.toFixed(2),
    //             },
    //         };
    //     });

    //     // const total = items.reduce((acc, item) => acc + Number(item.unit_amount.value) * Number(item.quantity), 0).toFixed(2);

    //     // const total = Object.values(priceArticles)
    //     //     .reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0)
    //     //     .toFixed(2);

    //     return [
    //         {
    //             description: "Compra de productos electrónicos",
    //             items: items,
    //             amount: {
    //                 currency_code: currency_code,
    //                 value: totalWithFee.toFixed(2), // Total general de la orden
    //                 breakdown: {
    //                     item_total: {
    //                         currency_code: currency_code,
    //                         value: totalWithFee.toFixed(2), // Suma de los items
    //                     },
    //                     shipping: {
    //                         currency_code: currency_code,
    //                         value: add,
    //                     },
    //                 },
    //             },
    //         },
    //     ];
    // };

    // const crearePurchaseUnitsForPaypal = (articles, add) => {
    //     const subtotal = articles.reduce((acc, article) => {
    //         const price = Number(article.price) + Number(article.price_options);
    //         return acc + price * article.quantity;
    //     }, 0);

    //     const currency_code = currencySelected.iso_code;

    //     const paypalFee = getPaypalFee(subtotal + add, currency_code);

    //     console.log(currencySelected);
    //     console.log(subtotal);
    //     const totalWithFee = calcPriceCurrency(currencySelected, subtotal + paypalFee);
    //     console.log(totalWithFee);

    //     // const totalWithFee = calculateTotalWithPaypalFee(subtotal, currency_code);

    //     const factor = totalWithFee / subtotal;

    //     // const originalTotal = 1747.26;
    //     // const totalWithFee = calculateTotalWithPaypalFee(originalTotal, 0.045, 0.35);

    //     // articles.forEach((cartItem) => {
    //     //     const totalPriceArticle = Number(cartItem.price) + Number(cartItem.price_options) * Number(cartItem.quantity);
    //     //     const currencyArticle = {
    //     //         iso_code: cartItem.iso_code,
    //     //         exchange_rate: cartItem.exchange_rate,
    //     //     };
    //     //     const totalArticleInCurrencyUser = showPriceWithCurrencyUser(totalPriceArticle, currencyArticle, userCurrency, false);
    //     //     total += totalArticleInCurrencyUser;
    //     // });
    //     // let totalDiscount = 0;
    //     // cartUser.forEach((cartItem) => {
    //     //     const totalPriceArticle = Number(cartItem.price) + Number(cartItem.price_options) * Number(cartItem.quantity);
    //     //     const percentDiscount = cartItem.offer ? cartItem.offer.percent_discount : 0;
    //     //     const currencyArticle = {
    //     //         iso_code: cartItem.iso_code,
    //     //         exchange_rate: cartItem.exchange_rate,
    //     //     };
    //     //     const totalDiscountArticleInCurrencyUser =
    //     //         showPriceWithCurrencyUser(totalPriceArticle, currencyArticle, userCurrency, false) * (percentDiscount / 100);
    //     //     totalDiscount += totalDiscountArticleInCurrencyUser;
    //     // });

    //     const items = articles.map((article) => {
    //         let originalPrice = Number(article.price) + Number(article.price_options);
    //         const percentDiscount = article.offer ? article.offer.percent_discount : 0;
    //         originalPrice = originalPrice * (1 - percentDiscount / 100);
    //         const currencyArticle = { iso_code: article.iso_code, exchange_rate: article.exchange_rate };
    //         return {
    //             name: article.article_name,
    //             description: article.description,
    //             quantity: article.quantity.toString(),
    //             unit_amount: {
    //                 currency_code: currency_code,
    //                 value: showPriceWithCurrencyUser(originalPrice * factor, currencyArticle, currencySelected, false).toFixed(2),
    //             },
    //         };
    //     });

    //     const total = items.reduce((acc, item) => acc + Number(item.unit_amount.value) * Number(item.quantity), 0).toFixed(2);

    //     // const total = Object.values(priceArticles)
    //     //     .reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0)
    //     //     .toFixed(2);

    //     return [
    //         {
    //             description: "Compra de productos electrónicos",
    //             items: items,
    //             amount: {
    //                 currency_code: currency_code,
    //                 value: (Number(total) + Number(add)).toFixed(2), // Total general de la orden
    //                 breakdown: {
    //                     item_total: {
    //                         currency_code: currency_code,
    //                         value: total, // Suma de los items
    //                     },
    //                     shipping: {
    //                         currency_code: currency_code,
    //                         value: add,
    //                     },
    //                 },
    //             },
    //         },
    //     ];
    // };

    const handleClickPay = async (wasPayed = false) => {
        // const res = showPriceWithCurrency(
        //     currencySelected,
        //     calculateTotalWithPaypalFee(
        //         Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0) +
        //             (deliveryPreferenceSelected.value == 1
        //                 ? convertDOP(getDeliveryPrice(shopSelectedForAddress, userAddressSelected).price, currencySelected.iso_code)
        //                 : 0),
        //         currencySelected.iso_code
        //     ),
        //     false
        // );

        // console.log(res);

        // console.log(
        //     calculateTotalWithPaypalFee(
        //         Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0),
        //         currencySelected.iso_code
        //     ).toFixed(2)
        // );

        // console.log(convertDOP(getDeliveryPrice(shopSelectedForAddress, userAddressSelected).price, currencySelected.iso_code));

        // console.log(Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0));

        // return;

        const deliveryCost =
            deliveryPreferenceSelected.value == 1
                ? convertDOP(getDeliveryPrice(shopSelectedForAddress, userAddressSelected).price, currencySelected.iso_code)
                : 0;
        // console.log(deliveryCost);
        const deliveryDistance = deliveryPreferenceSelected.value == 1 ? getDeliveryPrice(shopSelectedForAddress, userAddressSelected).distance : 0;
        // console.log(deliveryDistance);

        // console.log(getDeliveryPrice(shopSelectedForAddress, userAddressSelected));

        // console.log("Quiere usar address", wantUseAddress);

        // console.log("id tienda", shopSelectedForAddress.id);
        // console.log("id address", userAddressSelected.id);

        // console.log(wantUseAddress);
        // console.log(deliveryPreferenceSelected.value); // Quiero usar direccion
        // console.log(shopSelectedForAddress.id); // tienda selecionada
        // console.log(userAddressSelected?.id); // direccion seleccionada

        // return;

        const goToPayWithPaypal = payMethodSelected.type == 4 && payMethodSelected.is_paypal_method == 1;
        // const comeFromPaypal = token && payerId;

        // console.log(token);
        // console.log(payerId);

        // console.log(goToPayWithPaypal);
        // console.log(comeFromPaypal);

        // return;

        // console.log(goToPayWithPaypal);
        // console.log(wasPayed == false);

        // return;

        console.log(goToPayWithPaypal && !comeFromPaypalAndPayed);
        // return;

        const paypalSupportedCurrencies = [
            "AUD", // Australian Dollar
            "BRL", // Brazilian Real (solo Brasil)
            "CAD", // Canadian Dollar
            "CNY", // Chinese Renminbi (solo China)
            "CZK", // Czech Koruna
            "DKK", // Danish Krone
            "EUR", // Euro
            "HKD", // Hong Kong Dollar
            "HUF", // Hungarian Forint (0 decimales)
            "ILS", // Israeli New Shekel
            "JPY", // Japanese Yen (0 decimales)
            "MYR", // Malaysian Ringgit (solo cuentas locales)
            "MXN", // Mexican Peso
            "TWD", // New Taiwan Dollar (0 decimales)
            "NZD", // New Zealand Dollar
            "NOK", // Norwegian Krone
            "PHP", // Philippine Peso
            "PLN", // Polish Złoty
            "GBP", // Pound Sterling
            "SGD", // Singapore Dollar
            "SEK", // Swedish Krona
            "CHF", // Swiss Franc
            "THB", // Thai Baht
            "USD", // United States Dollar
        ];

        if (goToPayWithPaypal && !comeFromPaypalAndPayed) {
            if (!paypalSupportedCurrencies.includes(currencySelected.iso_code)) {
                toast.error("Esta moneda no es soportada por paypal, eliga otra.");
                return;
            }
            // console.error("Crear orden");

            // console.log(data);

            const purchaseUnitsArray = crearePurchaseUnitsForPaypal(data, deliveryCost);
            console.log(purchaseUnitsArray);
            // return;

            const { status, link, statusCode } = await useCreateOrderPaypal(purchaseUnitsArray);
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

        console.log(currencySelected);

        console.log(
            id,
            payMethodSelected.id,
            imageUrl,
            currencySelected,
            wantUseAddress,
            userAddressSelected ? userAddressSelected.id : null
            // userAddressSelected.id,
            // shopSelectedForAddress.id
        );
        // return;

        // TODO: TOTAL Y TOTAL DISCOUNT

        const { data: resData, status } = await useCreateCartBuy(
            id,
            payMethodSelected.id,
            Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0),
            Object.values(priceArticles).reduce((acc, curr) => acc + curr.totalDiscount, 0.0),
            null,
            null,
            deliveryCost,
            deliveryDistance,
            imageUrl,
            currencySelected.id,
            wantUseAddress,
            userAddressSelected ? userAddressSelected.id : null,
            // userAddressSelected?.id userAddressSelected,
            shopSelectedForAddress.id
        );
        console.log(resData);
        console.log(status);

        const resItem = await useCreateCartBuyItem(resData.id, data);
        console.log(resItem);

        const resCartItems = await useUpdateCartItemsStatus(data, 5);
        console.log(resCartItems);

        const resArticlesChangeQuantity = await useChangeArticleQuantity(data, "subtract");
        console.log(resArticlesChangeQuantity);
        const resPushNotifications = await useSendPushNotificationsForNewsOrders(resData.id);
        refetch();
        setPriceArticles({});

        if (status && resItem && resCartItems && resArticlesChangeQuantity && resPushNotifications)
            toast.success("Compra realizada", { id: loadingToast });
        else toast.error("Error al realizar la compra", { id: loadingToast });
        router.push("/usuario/pedidos");
    };

    const setUserAddressPreferred = async (address) => {
        // setUserWantUseAddress(0);
        setShowUserAddresses(!showUserAddresses);
        setUserAddressSelected(address);
        // userAddresRefetch();
        const res = await useSetUserAddressPreferred(id, address.id);
        await useChangeIdUserAdressForCart(id, address.id);
        console.log(res);
    };

    const setOrderPaymentMethod = async (paymentMethod) => {
        setPayMethodSelected(paymentMethod);
        setOpenPaymentMethods(!openPaymentMethods);
        await useChangeIdPayMethodForCart(id, paymentMethod.id);
        // const res = await useSetUserAddressPreferred(id, idAddress);
        // console.log(res);
        // setUserWantUseAddress(0);
        // userAddresRefetch();
    };

    const setCurrencySelectedForCart = async (currency) => {
        setCurrencySelected({ ...currency, _updated: Date.now() });
        // setPriceArticles({});
        setShowCurrencies();
        const res = await useChangeIdCurrencyUser(id, currency.id);
        console.log("----------");
        console.log(res);
        console.log("----------");

        // setPayMethodSelected(paymentMethod);
        // setOpenPaymentMethods(!openPaymentMethods);
        // await useChangeIdPayMethodForCart(id, paymentMethod.id);
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

    const setUserShopForCart = async (shop) => {
        setOpen(!open);
        setShopSelectedForAddress(shop);
        setOpen(!open);
        const res = await useChangeIdShopForCart(id, shop.id);
    };

    const [openPreference, setOpenPreference] = useState(false);

    const [preferenciasEntrega, setPreferenciasEntrega] = useState([]);

    useEffect(() => {
        if (!hasData) return;
        const preferencias = [
            {
                value: 1,
                name: "Envio a domicilio",
                description: "Recibir mi pedido en la direccion",
                isSelected: wantUseAddress,
            },
            {
                value: 0,
                name: "Recoger en tienda",
                description: "Recoger mi pedido en la tienda",
                isSelected: wantUseAddress == null || !wantUseAddress,
            },
        ];
        setPreferenciasEntrega(preferencias);
        const seleccionada = preferencias.find((prefence) => prefence.isSelected);
        setDeliveryPreferenceSelected(seleccionada);
    }, [hasData]);

    const setPreferenciaEntrega = async (preferenSelected, changeInDb = true) => {
        if (preferenSelected.value == 1 && userAddresses.length == 0) {
            toast.warning("Desbes de registrar por lo menos una direccion");
            setOpenPreference(false);
            return;
        }

        console.log(preferenSelected);
        setDeliveryPreferenceSelected(preferenSelected);
        // setPreferenciasEntrega((prev) =>
        //     prev.map((preference) =>
        //         preference.value === preferenSelected.value ? { ...preference, isSelected: true } : { ...preference, isSelected: false }
        //     )
        // );
        if (!changeInDb) return;
        setOpenPreference(false);
        await useChangeUserWantUseAddress(id, Number(preferenSelected.value));
        changeUserWantUseAddress(Number(preferenSelected.value));
    };

    const { price, discount, paypalFee, deliveryPrice, totalPrice, setPrice, setDiscount, setPaypalFee, setDeliveryPrice, setTotalPrice } = zusCart();
    useEffect(() => {
        if (!priceArticles || !shopSelectedForAddress || userAddressesIsLoading || !currencySelected) return;

        const currentPrice = parseFloat(
            Object.values(priceArticles)
                .reduce((acc, curr) => acc + parseFloat(curr.priceWithoutDiscount.toFixed(2)), 0)
                .toFixed(2)
        );
        const currenrDiscount = parseFloat(
            Object.values(priceArticles)
                .reduce((acc, curr) => acc + parseFloat(curr.totalDiscount.toFixed(2)), 0.0)
                .toFixed(2)
        );

        const currentDeliveryPrice =
            deliveryPreferenceSelected.value == 1
                ? parseFloat(convertDOP(getDeliveryPrice(shopSelectedForAddress, userAddressSelected).price, currencySelected.iso_code).toFixed(2))
                : 0;

        const subtotal = currentPrice - currenrDiscount + currentDeliveryPrice;

        const currentPaypalFee = payMethodSelected.is_paypal_method ? getPaypalFee(subtotal, currencySelected.iso_code) : 0;

        const currentTotalPrice = parseFloat((subtotal + currentPaypalFee).toFixed(2));

        console.error(shopSelectedForAddress);
        console.error(userAddressSelected);
        console.error(getDeliveryPrice(shopSelectedForAddress, userAddressSelected));

        console.warn(currentPrice, "precio");
        console.warn(currenrDiscount, "Descuento");
        console.warn(currentDeliveryPrice, "Delivery");
        console.warn(currentPaypalFee, "paypal fee");
        console.warn(currentTotalPrice, "Total");

        setPrice(currentPrice);
        setDiscount(currenrDiscount);
        setPaypalFee(currentPaypalFee);
        setDeliveryPrice(currentDeliveryPrice);
        setTotalPrice(currentTotalPrice);
    }, [priceArticles, shopSelectedForAddress, userAddressSelected, currencySelected, payMethodSelected, deliveryPreferenceSelected]);

    if (isLoading || !hasData || isLoadingShopsForUserCart || isLoadingPaymentMethods || !currencySelected) return <LoadingParagraph />;

    if (isLoading || dataUserIsLoadinf) return <LoadingParagraph />;

    return (
        <div className="m-4">
            <Toaster richColors />
            <p className="text-xl font-bold text-center mb-4">Finalizar compra</p>
            {/* <div className="flex gap-4 w-full">
                <Icon icon="solar:arrow-left-outline" width="24" height="24" />
                <p className="text-2xl font-bold text-center">Finalizar compra</p>
            </div> */}
            <Divider h={"0.5px"} />
            <Spacer />
            <div>
                <p className="text-lg font-bold">Preferencia de entrega</p>
                <Spacer />

                <Item
                    name={deliveryPreferenceSelected?.name}
                    description={deliveryPreferenceSelected?.description}
                    onClick={() => setOpenPreference(!openPreference)}
                />

                {/* <div className="bg-white p-4 rounded-3xl">
                    <div className="flex items-center">
                        <div className="size-1/6">
                            <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                <div className="bg-black grid place-items-center rounded-full size-full">
                                    <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                </div>
                            </div>
                        </div>
                        <div className="size-4/6">
                            <p className="text-lg font-bold">{deliveryPreferenceSelected?.name}</p>
                            <p>{deliveryPreferenceSelected?.description}</p>
                        </div>
                        <div className="size-1/6 grid place-items-center" onClick={() => setOpenPreference(!openPreference)}>
                            <Icon icon="iconamoon:edit-fill" width="24" height="24" />
                        </div>
                    </div>
                </div> */}
                {/* {preferenciasEntrega
                    .filter((preference) => preference.isSelected)
                    .map((preference) => (
                        <div key={preference.value} className="bg-white p-4 rounded-3xl">
                            <div className="flex items-center">
                                <div className="size-1/6">
                                    <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                        <div className="bg-black grid place-items-center rounded-full size-full">
                                            <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                        </div>
                                    </div>
                                </div>
                                <div className="size-4/6">
                                    <p className="text-lg font-bold">{preference.name}</p>
                                    <p>{preference.description}</p>
                                </div>
                                <div className="size-1/6 grid place-items-center" onClick={() => setOpenPreference(!openPreference)}>
                                    <Icon icon="iconamoon:edit-fill" width="24" height="24" />
                                </div>
                            </div>
                        </div>
                    ))} */}
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: openPreference ? "auto" : 0,
                        opacity: openPreference ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-2 flex flex-col gap-2 overflow-hidden bg-gray-200_p-4_mt-2_rounded"
                >
                    {preferenciasEntrega
                        .filter((preference) => preference.value != deliveryPreferenceSelected?.value)
                        .map((preference) => (
                            <div key={preference.value} className="bg-white p-4 rounded-3xl" onClick={() => setPreferenciaEntrega(preference)}>
                                <div className="flex items-center">
                                    <div className="size-1/6">
                                        <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                            <div className="bg-black grid place-items-center rounded-full size-full">
                                                <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="size-4/6">
                                        <p className="text-lg font-bold">{preference.name}</p>
                                        <p>{preference.description}</p>
                                    </div>
                                    <div className="size-1/6 grid place-items-center">
                                        <Icon icon="ep:select" width="24" height="24" />
                                    </div>
                                </div>
                            </div>
                        ))}
                </motion.div>
            </div>
            <Divider h={"0.5px"} />
            {wantUseAddress == 1 ? (
                <div>
                    <p className="text-lg font-bold">Dirreccion de entrega</p>
                    <Spacer />
                    {/* setUserAddressSelected */}

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
                                <p className="text-lg font-bold">{showText(userAddressSelected?.location ?? "", 23)}</p>
                                <p>{userAddressSelected?.street}</p>
                            </div>
                            <div className="size-1/6 grid place-items-center" onClick={() => setShowUserAddresses(!showUserAddresses)}>
                                <Icon icon="iconamoon:edit-fill" width="24" height="24" />
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: showUserAddresses ? "auto" : 0,
                            opacity: showUserAddresses ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="mt-2 flex flex-col gap-2 overflow-hidden bg-gray-200_p-4_mt-2_rounded"
                    >
                        {userAddresses
                            ?.filter((address) => address.id != userAddressSelected?.id)
                            .map((address) => (
                                <div key={address.id} className="bg-white p-4 rounded-3xl" onClick={() => setUserAddressPreferred(address)}>
                                    <div className="flex items-center">
                                        <div className="size-1/6">
                                            <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                                <div className="bg-black grid place-items-center rounded-full size-full">
                                                    <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="size-4/6">
                                            <p className="text-lg font-bold">{showText(address.location ?? "", 23)}</p>
                                            <p>{address.street}</p>
                                        </div>
                                        <div className="size-1/6 grid place-items-center">
                                            <Icon icon="ep:select" width="24" height="24" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </motion.div>
                </div>
            ) : (
                <div>
                    <p className="text-lg font-bold">Tienda de entrega</p>
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
                                <p className="text-lg font-bold">{shopSelectedForAddress?.name}</p>
                                <p>{shopSelectedForAddress?.description}</p>
                            </div>
                            <div className="size-1/6 grid place-items-center" onClick={() => setOpen(!open)}>
                                <Icon icon="iconamoon:edit-fill" width="24" height="24" />
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: open ? "auto" : 0,
                            opacity: open ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="mt-2 flex flex-col gap-2 overflow-hidden bg-gray-200_p-4_mt-2_rounded"
                    >
                        {shopsForUserCart
                            ?.filter((shop) => shop.id != shopSelectedForAddress?.id)
                            .map((shop) => (
                                <div key={shop.id} className="bg-white p-4 rounded-3xl" onClick={() => setUserShopForCart(shop)}>
                                    <div className="flex items-center">
                                        <div className="size-1/6">
                                            <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                                <div className="bg-black grid place-items-center rounded-full size-full">
                                                    <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="size-4/6">
                                            <p className="text-lg font-bold">{shop.name}</p>
                                            <p>{shop.description}</p>
                                        </div>
                                        <div className="size-1/6 grid place-items-center">
                                            <Icon icon="ep:select" width="24" height="24" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </motion.div>
                </div>
            )}
            {/* <div>
                <p className="text-xl font-bold">Dirreccion de compra</p>
                <Spacer /> */}
            {/* <div className="p-6"> */}
            {/* <button onClick={() => setOpen(!open)} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Toggle
                    </button> */}
            {/* {dataUser.want_use_address == 1 ? (
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
                    )} */}
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
            {/* </motion.div>
            </div> */}
            <Divider h={"0.5px"} />
            {/* <Spacer /> */}
            <div>
                <p className="text-lg font-bold">Lista de articulos</p>
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
                            isoCode={order.iso_code}
                            exchangeRate={order.exchange_rate}
                            quantity={order.quantity}
                            priceArticles={priceArticles}
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
                <p className="text-lg font-bold">Moneda de pago</p>
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
                            <p className="text-lg font-bold">{currencySelected?.name}</p>
                            <p>{currencySelected?.description}</p>
                        </div>
                        <div className="size-1/6 grid place-items-center" onClick={() => setShowCurrencies()}>
                            <Icon icon="iconamoon:edit-fill" width="24" height="24" />
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: showCurrencies ? "auto" : 0,
                        opacity: showCurrencies ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-2 flex flex-col gap-2 overflow-hidden bg-gray-200_p-4_mt-2_rounded"
                >
                    {currencies
                        .filter((currency) => currency.id != currencySelected?.id)
                        .map((currency) => (
                            <div key={currency.id} className="bg-white p-4 rounded-3xl" onClick={() => setCurrencySelectedForCart(currency)}>
                                <div className="flex items-center">
                                    <div className="size-1/6">
                                        <div className="bg-gray-400 rounded-full size-12" style={{ padding: "6px" }}>
                                            <div className="bg-black grid place-items-center rounded-full size-full">
                                                <Icon className="text-white size-5" icon="mingcute:location-fill" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="size-4/6">
                                        <p className="text-lg font-bold">{currency.name}</p>
                                        <p>{currency.description}</p>
                                    </div>
                                    <div className="size-1/6 grid place-items-center">
                                        <Icon icon="ep:select" width="24" height="24" />
                                    </div>
                                </div>
                            </div>
                        ))}
                </motion.div>
            </div>
            <Divider h={"0.5px"} />
            <div>
                <p className="text-lg font-bold">Metodo de pago</p>
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
            <p className="text-lg font-bold">Precio</p>
            <Spacer />
            <div className="bg-white p-6 rounded-2xl flex flex-col gap-6">
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Total</p>
                    <p className="font-semibold">{showPriceWithCurrency(currencySelected, price, false)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Descuento</p>
                    <p className="font-bold">{showPriceWithCurrency(currencySelected, discount, false)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Comicion de paypal</p>
                    <p className="font-bold">{showPriceWithCurrency(currencySelected, paypalFee, false)}</p>
                </div>

                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Costo de envio</p>
                    <p className="font-bold">{showPriceWithCurrency(currencySelected, deliveryPrice, false)}</p>
                </div>
                <Divider mt={0} mb={0} h={"0.5px"} />
                {/* TODO: VALIDAR BIEN CADA CANTIDAD */}
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Total General</p>
                    <p className="font-bold">{showPriceWithCurrency(currencySelected, totalPrice, false)}</p>
                </div>
            </div>
            <Divider h={"0.5px"} />
            {/* <Divider h={"0.5px"} />
            <p className="text-xl font-bold">Precio</p>
            <Spacer />
            <div className="bg-white p-6 rounded-2xl flex flex-col gap-6">
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Total</p>
                    <p className="font-semibold">
                        {showPriceWithCurrency(
                            currencySelected,
                            Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithoutDiscount, 0),
                            false
                        )}
                    </p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Descuento</p>
                    <p className="font-bold">
                        {showPriceWithCurrency(
                            currencySelected,
                            Object.values(priceArticles).reduce((acc, curr) => acc + curr.totalDiscount, 0.0),
                            false
                        )}
                    </p>
                </div>

                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Comicion</p>
                    <p className="font-bold">
                        {payMethodSelected.is_paypal_method == 1
                            ? showPriceWithCurrency(
                                  currencySelected,
                                  calculateTotalWithPaypalFee(
                                      Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0),
                                      currencySelected.iso_code
                                  ) - Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0),
                                  false
                              )
                            : showPriceWithCurrency(currencySelected, 0, false)}
                    </p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Costo de envio</p>
                    <p className="font-bold">
                        {deliveryPreferenceSelected.value == 1
                            ? showPriceWithCurrency(
                                  currencySelected,
                                  convertDOP(getDeliveryPrice(shopSelectedForAddress, userAddressSelected).price, currencySelected.iso_code),
                                  false
                              )
                            : showPriceWithCurrency(currencySelected, 0, false)}
                    </p>
                </div>
                <Divider mt={0} mb={0} h={"0.5px"} />
                TODO: VALIDAR BIEN CADA CANTIDAD
                <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Total General</p>
                    <p className="font-bold">
                        {price - discount + paypalFee + deliveryPrice}
                        preccion sin descuento
                        {Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithoutDiscount, 0)}
                        <br />
                        descuento{Object.values(priceArticles).reduce((acc, curr) => acc + curr.totalDiscount, 0.0)}
                        <br />
                        costo delivery
                        {convertDOP(getDeliveryPrice(shopSelectedForAddress, userAddressSelected).price, currencySelected.iso_code)}
                        <br />
                        comision paypal
                        {calculateTotalWithPaypalFee(
                            Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0),
                            currencySelected.iso_code
                        ) - Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0)}
                        {getDeliveryPrice(shopSelectedForAddress, userAddressSelected).price}
                        {convertDOP(getDeliveryPrice(shopSelectedForAddress, userAddressSelected).price, currencySelected.iso_code)}
                        <br />
                        {showPriceWithCurrency(
                            currencySelected,
                            calculateTotalWithPaypalFee(
                                Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0) +
                                    (deliveryPreferenceSelected.value == 1
                                        ? convertDOP(getDeliveryPrice(shopSelectedForAddress, userAddressSelected).price, currencySelected.iso_code)
                                        : 0),
                                currencySelected.iso_code
                            ),
                            false
                        )}
                        {calculateTotalWithPaypalFee(
                            Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0) +
                                convertDOP(getDeliveryPrice(shopSelectedForAddress, userAddressSelected).price, currencySelected.iso_code),
                            currencySelected.iso_code
                        )}
                    </p>
                </div> */}
            {/* <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Total General</p>
                    <p className="font-bold">
                        {payMethodSelected.is_paypal_method == 1
                            ? showPriceWithCurrency(
                                  currencySelected,
                                  calculateTotalWithPaypalFee(
                                      Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0) +
                                          (deliveryPreferenceSelected.value == 1
                                              ? convertDOP(
                                                    getDeliveryPrice(shopSelectedForAddress, userAddressSelected).price,
                                                    currencySelected.iso_code
                                                )
                                              : 0),
                                      currencySelected.iso_code
                                  ),
                                  false
                              )
                            : showPriceWithCurrency(
                                  currencySelected,
                                  Object.values(priceArticles).reduce((acc, curr) => acc + curr.priceWithDiscount, 0.0) +
                                      (deliveryPreferenceSelected.value == 1
                                          ? convertDOP(getDeliveryPrice(shopSelectedForAddress, userAddressSelected).price, currencySelected.iso_code)
                                          : 0),
                                  false
                              )}
                    </p>
                </div> */}
            {/* </div> */}
            {/* <Divider h={"0.5px"} /> */}
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

const Item = ({ name, description, onClick = () => {} }) => {
    return (
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
                    <p className="text-base font-bold line-clamp-1">{name}</p>
                    <p className="text-sm line-clamp-2">{description}</p>
                </div>
                <div className="size-1/6 grid place-items-center" onClick={onClick}>
                    <Icon icon="iconamoon:edit-fill" width="24" height="24" />
                </div>
            </div>
        </div>
    );
};
