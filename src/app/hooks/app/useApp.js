import React from "react";

const useApp = () => {
    const showText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };
    const showPrice = (price, integer = true) => {
        const priceNumberFormat = new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price);
        if (integer == null) return priceNumberFormat;
        if (integer) return priceNumberFormat.split(".")[0];
        else return priceNumberFormat.split(".")[1];
    };

    const discountPercentage = (priceWithOffer, price) => {
        const porcentaje = (priceWithOffer / price) * 100;
        return porcentaje - 100;
    };

    const getParamValue = async (promise, nameParam) => {
        return (await promise)[nameParam];
    };

    const calcAvailableQuantities = (availableQuantities) => {
        return availableQuantities <= 20
            ? availableQuantities > 0
                ? `Solo queda(n) ${availableQuantities} en stock (hay mas unidades en camino).`
                : "Noy hay unidades disponibles"
            : "";
    };

    const getDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
        // return `${year}-${month}-${day}`;
    };

    const getDateForDB = () => new Date().toISOString().slice(0, 19).replace("T", " ");

    const changeFileName = (file, newName) => {
        return new File([file], newName, {
            type: file.type,
            lastModified: file.lastModified,
        });
    };

    const calcPriceInCurrency = (price, currencyOperator, currencyValue) =>
        currencyOperator == "multiply" ? price * currencyValue : currencyOperator == "divide" ? price / currencyValue : 0;

    const getDateInSpanish = (date) => {
        const dateObject = new Date(date);

        // Obtener el día, el mes (en texto) y el año
        const day = dateObject.getDate();
        const month = dateObject.toLocaleString('es-ES', { month: 'long' });  // 'long' para obtener el nombre completo del mes
        const year = dateObject.getFullYear();

        // Formatear la fecha
        return `${day} de ${month} del ${year}`;
    };

    return {
        showText,
        discountPercentage,
        getParamValue,
        showPrice,
        calcAvailableQuantities,
        getDate,
        changeFileName,
        getDateForDB,
        calcPriceInCurrency,
        getDateInSpanish
    };
};

export default useApp;
