import { isUUID, showPriceWithCurrencyUser } from "@/app/hooks/app/app";
import { useGetCartUser } from "@/app/hooks/request/carts/requestsCarts";
import { useGetCurrenciesForCustomers } from "@/app/hooks/request/currencies/requestsCurrencies";
import { zusCart } from "@/app/zustand/user/zusCart";
import { zusUser } from "@/app/zustand/user/zusUser";
import React, { useEffect } from "react";

const useUserCartData = () => {
    const { id: idUser, hasData, idCurrency: idCurrencyUser } = zusUser();

    const { data: articlesCart, isLoading: isLoadingArticlesCart, refetch: refetchArticlesCart } = useGetCartUser(idUser);

    const {
        price,
        discount,
        paypalFee,
        deliveryPrice,
        totalPrice,
        setPrice,
        setDiscount,
        setPaypalFee,
        setDeliveryPrice,
        setTotalPrice,
        quantity,
        setQuantity,
    } = zusCart();

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

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    useEffect(() => {
        console.log(articlesCart);
        // if (!priceArticles || !shopSelectedForAddress || userAddressesIsLoading || !currencySelected) return;
        if (!articlesCart || !currencySelected) return;

        let currentPrice = 0;

        articlesCart.forEach((article) => {
            const currencyArticle = { iso_code: article.iso_code, exchange_rate: article.exchange_rate };
            // const offerDiscount = Number(article?.offer?.percent_discount);
            // const articlePrice =
            //     (((parseFloat(article.price) + parseFloat(article.price_options)) * Number(article.quantity)) / 100) * (100 - offerDiscount);
            // const articlePrice =
            // (parseFloat(article.price) + parseFloat(article.price_options)) * Number(article.quantity) * ((100 - offerDiscount) / 100);

            const basePrice = (parseFloat(article.price) + parseFloat(article.price_options)) * Number(article.quantity);

            const discount = Number(article?.offer?.percent_discount || 0);

            // Fórmula profesional
            const priceWithDiscount = basePrice * (1 - discount / 100);

            console.log(article);
            const articlePriceInUserCurrency = showPriceWithCurrencyUser(priceWithDiscount, currencyArticle, currencySelected, false);
            currentPrice += articlePriceInUserCurrency;
        });

        // const currentPrice = parseFloat(
        //     Object.values(articlesCart)
        //         .reduce((acc, curr) => acc + (parseFloat(curr.price) + parseFloat(curr.price_options)) * Number(curr.quantity), 0)
        //         .toFixed(2)
        // );
        // const currenrDiscount = parseFloat(
        //     Object.values(priceArticles)
        //         .reduce((acc, curr) => acc + parseFloat(curr.totalDiscount.toFixed(2)), 0.0)
        //         .toFixed(2)
        // );
        // const currentDeliveryPrice =
        //     deliveryPreferenceSelected.value == 1
        //         ? parseFloat(convertDOP(getDeliveryPrice(shopSelectedForAddress, userAddressSelected).price, currencySelected.iso_code).toFixed(2))
        //         : 0;
        // const subtotal = currentPrice - currenrDiscount + currentDeliveryPrice;
        // const currentPaypalFee = payMethodSelected.is_paypal_method ? getPaypalFee(subtotal, currencySelected.iso_code) : 0;
        // const currentTotalPrice = parseFloat((subtotal + currentPaypalFee).toFixed(2));
        // console.error(shopSelectedForAddress);
        // console.error(userAddressSelected);
        // console.error(getDeliveryPrice(shopSelectedForAddress, userAddressSelected));
        console.warn(currentPrice, "precio");
        // console.warn(currenrDiscount, "Descuento");
        // console.warn(currentDeliveryPrice, "Delivery");
        // console.warn(currentPaypalFee, "paypal fee");
        // console.warn(currentTotalPrice, "Total");
        setPrice(currentPrice);
        // setDiscount(currenrDiscount);
        // setPaypalFee(currentPaypalFee);
        // setDeliveryPrice(currentDeliveryPrice);
        // setTotalPrice(currentTotalPrice);
    }, [shopSelectedForAddress, userAddressSelected, currencySelected, payMethodSelected, deliveryPreferenceSelected, articlesCart]);

    return { price, discount, paypalFee, deliveryPrice, totalPrice, articlesCart, isLoadingArticlesCart, refetchArticlesCart };
};

export default useUserCartData;
