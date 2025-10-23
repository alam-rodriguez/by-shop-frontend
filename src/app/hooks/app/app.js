export function getDefaultsValuesForSelectMulti(itemsSelected, allItems, primaryKeyItemsSelected = "id") {
    const idsItemsSelected = itemsSelected.map((item) => item[primaryKeyItemsSelected]);
    return allItems
        .filter((item) => idsItemsSelected.includes(item.id))
        .map((item) => ({
            value: item.id,
            label: item.name,
        }));
}

export const getDataSelectMultiForAddAndDelete = (oldData, newData, primaryKeyOldData = "id_category", primaryKeyNewData = "value") => {
    const oldDataIds = oldData.map((item) => item[primaryKeyOldData]);
    const dataAgregar = [];
    console.log(newData);
    newData.forEach((item) => {
        if (!oldDataIds.includes(item[primaryKeyNewData])) dataAgregar.push({ [primaryKeyNewData]: item[primaryKeyNewData] });
    });

    const dataBorrar = [];
    const idsDataNew = newData.map((item) => item[primaryKeyNewData]);
    oldData.forEach((item) => {
        if (!idsDataNew.includes(item[primaryKeyOldData])) dataBorrar.push({ [primaryKeyOldData]: item[primaryKeyOldData] });
    });

    return { dataAgregar, dataBorrar };
};

export const getDataSelectMultiForAddAndDelete2 = (oldData, newData, primaryKeyOldData = "id", primaryKeyNewData = "value") => {
    const oldDataIds = oldData.map((item) => item[primaryKeyOldData]);
    const dataAgregar = [];
    console.log(newData);
    newData.forEach((item) => {
        if (!oldDataIds.includes(item[primaryKeyNewData])) dataAgregar.push({ [primaryKeyNewData]: item[primaryKeyNewData] });
    });

    const dataBorrar = [];
    const idsDataNew = newData.map((item) => item[primaryKeyNewData]);
    oldData.forEach((item) => {
        // NOTE: Realice este cambio, si explota volver atras
        // if (!idsDataNew.includes(item[primaryKeyOldData])) dataBorrar.push({ [primaryKeyOldData]: item[primaryKeyOldData] });
        if (!idsDataNew.includes(item[primaryKeyOldData])) dataBorrar.push(item);
    });

    return { dataAgregar, dataBorrar };
};

export const getDataSelectMultiForAddAndDeleteImages = (oldImages = [], newImages = [], primaryKeyOldImage = "id", primaryKeyNewImage = "id") => {
    const imagesAgregar = [];
    const imagesBorrar = [];
    const imagesUpdate = [];
    const oldImagesIds = oldImages.map((image) => image[primaryKeyOldImage]);

    console.log(newImages);

    newImages.forEach((newImage) => {
        if (!oldImagesIds.includes(newImage[primaryKeyNewImage])) imagesAgregar.push(newImage);
        else {
            if (newImage.image.name) {
                imagesUpdate.push(newImage);
            }
            // const oldImage = oldImages.find((image) => image[primaryKeyOldImage] === newImage[primaryKeyNewImage]);
            // if (oldImage.name !== newImage.name) ImagesAgregar.push(newImage);
        }
    });
    const newImagesIds = newImages.map((image) => image[primaryKeyNewImage]);

    oldImages.forEach((oldImage) => {
        if (!newImagesIds.includes(oldImage[primaryKeyOldImage])) imagesBorrar.push(oldImage);
    });

    return { imagesAgregar, imagesUpdate, imagesBorrar };

    // newImages.forEach((image) => {
    //     if(image.name)
    // });
    const oldDataIds = oldData.map((item) => item[primaryKeyOldData]);
    newData.forEach((item) => {
        if (!oldDataIds.includes(item[primaryKeyNewData])) dataAgregar.push({ [primaryKeyNewData]: item[primaryKeyNewData] });
    });

    const idsDataNew = newData.map((item) => item[primaryKeyNewData]);
    oldData.forEach((item) => {
        if (!idsDataNew.includes(item[primaryKeyOldData])) dataBorrar.push({ [primaryKeyOldData]: item[primaryKeyOldData] });
    });

    return { dataAgregar, dataBorrar };
};

export const calcPriceWithOffer = (price, discountPercent) => {
    return price - (price * discountPercent) / 100;
};

export const showOrderStatusForClient = (status, wantUseAddress) => {
    console.log(status);
    console.log(wantUseAddress);
    // if (!status) return "ERROR";
    let statusMessage = "";
    if (status == 1) statusMessage = "Comprando...";
    // else if (status == 2 && wantUseAddress) statusMessage = "Preparando...";
    else if (status == 2) statusMessage = "Preparando...";
    else if (status == 3 && !wantUseAddress) statusMessage = "Listo para retirar";
    else if (status == 3 && wantUseAddress) statusMessage = "Enviando...";
    else if (status == 4 && !wantUseAddress) statusMessage = "Retirado";
    else if (status == 4 && wantUseAddress) statusMessage = "Recibido";
    else if (status == 0) statusMessage = "Cancelado";
    else {
        if (wantUseAddress) statusMessage = "Recibido";
        else statusMessage = "Retirado";
    }
    return statusMessage;
};

export const getDataForAddDeleteAndUpdateOptions = (oldOptions, newOptions, primaryKeyOldOptions = "id", primaryKeyNewOptions = "id") => {
    // console.log(oldOptions);
    // console.log(newOptions);
    // return;
    const optionsAdd = [];
    const optionsDelete = [];
    const optionsUpdate = [];
    const oldOptionsIds = oldOptions.map((option) => option[primaryKeyOldOptions]);

    newOptions.forEach((newOption, index) => {
        if (!oldOptionsIds.includes(newOption[primaryKeyNewOptions])) optionsAdd.push(newOption);
        else {
            if (newOption.image && newOption.image.name) optionsUpdate.push(newOption);
            else {
                if (
                    newOption.color != oldOptions[index].color ||
                    newOption.quantity != oldOptions[index].quantity ||
                    newOption.price != oldOptions[index].price
                )
                    optionsUpdate.push(newOption);
            }
        }
    });
    const newOptionsIds = newOptions.map((option) => option[primaryKeyNewOptions]);

    oldOptions.forEach((oldOption) => {
        if (!newOptionsIds.includes(oldOption[primaryKeyOldOptions])) optionsDelete.push(oldOption);
    });

    return { optionsAdd, optionsDelete, optionsUpdate };
};

export const getDataForAddDeleteAndUpdateSpecs = (oldSpecs, newSpecs, primaryKeyOldSpecs = "id", primaryKeyNewSpecs = "id") => {
    const specsAdd = [];
    const specsUpdate = [];
    const specsDelete = [];
    const oldSpecsIds = oldSpecs.map((spec) => spec[primaryKeyOldSpecs]);

    newSpecs.forEach((newSpec, index) => {
        if (!oldSpecsIds.includes(newSpec[primaryKeyNewSpecs])) specsAdd.push(newSpec);
        else {
            if (
                newSpec.id_option != oldSpecs[index].id_option ||
                newSpec.id_value != oldSpecs[index].id_value ||
                newSpec.is_highlight != oldSpecs[index].is_highlight ||
                newSpec.is_measurement != oldSpecs[index].is_measurement ||
                newSpec.is_spec != oldSpecs[index].is_spec
            )
                specsUpdate.push(newSpec);
        }
    });
    const newSpecsIds = newSpecs.map((specs) => specs[primaryKeyNewSpecs]);

    oldSpecs.forEach((oldSpec) => {
        if (!newSpecsIds.includes(oldSpec[primaryKeyOldSpecs])) specsDelete.push(oldSpec);
    });

    return { specsAdd, specsDelete, specsUpdate };
};

export const getDataForAddDeleteAndUpdate = ({ oldData, newData, primaryKeyOldData = "id", primaryKeyNewData = "id", keysToValidate = [] }) => {
    const dataAdd = [];
    const dataUpdate = [];
    const dataDelete = [];
    const oldDataIds = oldData.map((data) => data[primaryKeyOldData]);

    newData.forEach((data, index) => {
        if (!oldDataIds.includes(data[primaryKeyNewData])) dataAdd.push(data);
        else {
            if (keysToValidate.some((key) => data[key] != oldData[index][key])) dataUpdate.push(data);
        }
    });
    const newDataIds = newData.map((data) => data[primaryKeyNewData]);

    oldData.forEach((data) => {
        if (!newDataIds.includes(data[primaryKeyOldData])) dataDelete.push(data);
    });

    return { dataAdd, dataUpdate, dataDelete };
};

export const showText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
};

export const showDate = (date, divider = "-", joiner = "/") => {
    return date.split("T")[0].split(divider).reverse().join(joiner);
};

export const showPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
};

export const calcPriceCurrency = (currency, price) => {
    if (currency.main_currency == 1) return price;
    else return price * Number(currency.exchange_rate);
};

export function isUUID(str) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
}

export function isValidURL(str) {
    try {
        new URL(str);
        return true;
    } catch (_) {
        return false;
    }
}

export const getDateInSpanish = (date) => {
    const dateObject = new Date(date);

    // Obtener el día, el mes (en texto) y el año
    const day = dateObject.getDate();
    const month = dateObject.toLocaleString("es-ES", { month: "long" }); // 'long' para obtener el nombre completo del mes
    const year = dateObject.getFullYear();

    // Formatear la fecha
    return `${day} de ${month} del ${year}`;
};
