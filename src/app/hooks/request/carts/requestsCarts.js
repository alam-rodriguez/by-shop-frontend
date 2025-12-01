import { v4 as uuidv4 } from "uuid";
import {
    createCartBuy,
    createCartBuyItem,
    createCartItem,
    createCartItemOption,
    getCartItemOption,
    getCartUser,
    getCartUserBought,
    getCartUserCannotBuy,
    getCartUserReadyToBuy,
    getCartUserSavedForLater,
    getOrderById,
    getOrderByIdCart,
    getOrders,
    getOrdersByResponsibleShop,
    getOrdersFromShop,
    getOrdersFromShopAndOrder,
    searchArticlesOrderedUserByWord,
    updateCartBoughtItemStatus,
    updateCartBoughtItemStatusImage,
    updateCartBoughtStatus,
    updateCartItemQuantity,
    updateCartItemStatus,
} from "@/app/request/carts/requestsCarts";
import { useQuery } from "@tanstack/react-query";
import { promise } from "zod";
import { addArticleToList, articleIsInList, getArticleOffer, updateArticleInListStatus } from "@/app/request/articles/requestsArticles";
import { useGetArticleOffer } from "../articles/requestsArticles";

// CREATE TABLE carts(
//   id char(36) NOT NULL PRIMARY KEY,
//   id_article char(36) NOT NULL,
//   id_user char(36) NOT NULL,
//   status TINYINT NOT NULL,
//   quantity INT UNSIGNED NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// id, id_article, id_user, status, quantity;

// export const useCreateCartItem = async (cartItem, quantity, id_user) => {
//     const cartItemObj = {};
//     cartItemObj.id_user = id_user;
//     cartItemObj.quantity = quantity;
//     cartItemObj.id_article = cartItem.id;
//     cartItemObj.status = 1;
//     cartItemObj.id = uuidv4();

//     const { data, status } = await createCartItem(cartItemObj);
//     return data.data;
// };

export const useCreateCartItem = async (idArticle, quantity, id_user) => {
    const cartItemObj = {};
    cartItemObj.id_user = id_user;
    cartItemObj.quantity = quantity;
    cartItemObj.id_article = idArticle;
    cartItemObj.status = 1;
    cartItemObj.id = uuidv4();

    const { data, status } = await createCartItem(cartItemObj);
    return data.data;
};

// CREATE TABLE cart_item_options(
//     id char(36) NOT NULL PRIMARY KEY,
//     id_article char(36) NOT NULL,
//     id_user char(36) NOT NULL,
//     id_cart char(36) NOT NULL,
//     status TINYINT NOT NULL,
//     id_option char(36) NOT NULL,
//     id_value char(36) NOT NULL
// );

export const useCreateCartItemOption = async (cart, options, id_user) => {
    const promises = Object.values(options).map(async (option) => {
        const cartItemOption = {};
        cartItemOption.id = uuidv4();
        cartItemOption.id_article = cart.id_article;
        cartItemOption.id_article_option = option.id;
        cartItemOption.id_user = id_user;
        cartItemOption.id_cart = cart.id;
        cartItemOption.status = 1;
        cartItemOption.id_option = option.id_option;
        cartItemOption.id_value = option.id_value;
        // console.log(cartItemOption);

        const { data, status } = await createCartItemOption(cartItemOption);
        return status;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status === 201);
};

export const useGetCartItemOption = (idCart) =>
    useQuery({
        queryKey: [`cart-item-option-${idCart}`],
        enabled: !!idCart,
        staleTime: Infinity,
        queryFn: () => getCartItemOption(idCart),
    });

export const useGetCartUser = (id) =>
    useQuery({
        enabled: !!id,
        queryKey: [`cart-user-${id}`],
        // staleTime: Infinity,
        queryFn: () => getCartUser(id),
    });

export const useGetCartUserCannotBuy = (id) =>
    useQuery({
        enabled: !!id,
        queryKey: [`cart-user-${id}-cannot-buy`],
        // staleTime: Infinity,
        queryFn: () => getCartUserCannotBuy(id),
    });

export const useUpdateCartItemStatus = async (id, status) => {
    const cartItem = {
        status: status,
    };
    const { data, status: resStatus } = await updateCartItemStatus(id, cartItem);
    return resStatus == 200;
};

export const useUpdateCartItemQuantity = async (id, quantity) => {
    const cartItem = {
        quantity: quantity,
    };
    const { data, status: resStatus } = await updateCartItemQuantity(id, cartItem);
    return resStatus == 200;
};

export const useGetCartUserSavedForLater = (id) =>
    useQuery({
        queryKey: [`cart-user-saved-for-later-${id}`],
        staleTime: Infinity,
        queryFn: () => getCartUserSavedForLater(id),
    });

export const useGetCartUserReadyToBuy = (id) =>
    useQuery({
        queryKey: [`cart-user-ready-to-buy-${id}`],
        // staleTime: Infinity,
        queryFn: () => getCartUserReadyToBuy(id),
    });

// CREATE TABLE carts_bought(
//     id char(36) NOT NULL PRIMARY KEY,
//     id_user char(36) NOT NULL,
//     status TINYINT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

export const useCreateCartBuy = async (
    id_user,
    id_pay_method,
    total,
    total_discount,
    paypal_fee,
    paypal_payment_id,
    delivery_cost,
    delivery_distance,
    image,
    id_currency,
    wantUseAddress,
    idAddressUser,
    idShopForAddress
) => {
    const cart = {
        id: uuidv4(),
        id_user: id_user,
        status: 1,
        id_pay_method: id_pay_method,
        total: total ?? 0,
        total_discount,
        paypal_fee: paypal_fee ?? 0,
        paypal_payment_id,
        delivery_cost,
        delivery_distance,
        image: image,
        id_currency: id_currency,
        want_use_address: wantUseAddress ?? 0,
        // id_address: idAddress ?? null,
        id_address_user: idAddressUser,
        id_shop_for_address: idShopForAddress,
    };

    console.log(cart);

    const { data, status } = await createCartBuy(cart);
    return { data: data.data, status };
};

// CREATE TABLE carts_bought_items(
//                 id char(36) NOT NULL PRIMARY KEY,
//                 id_cart_bought char(36) NOT NULL,
//                 id_cart char(36) NOT NULL,
//                 price_item DECIMAL(10,2) NOT NULL,
//                 price_options DECIMAL(10,2) NOT NULL,
//                 quantity INT UNSIGNED NOT NULL,
//                 total_price DECIMAL(10,2) NOT NULL,
//                 id_offer char(36) DEFAULT NULL,
//                 percent_discount DECIMAL(5,2) DEFAULT 0.00,
//                 total_price_with_discount DECIMAL(10,2) NOT NULL,
//                 status TINYINT NOT NULL,
//                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             );

export const useCreateCartBuyItem = async (id_cart, cartItems) => {
    const promises = cartItems.map(async (cartItem) => {
        const offerArticle = await getArticleOffer(cartItem.id_article);
        console.log(offerArticle);
        const cartItemObj = {};
        cartItemObj.id = uuidv4();
        cartItemObj.id_cart_bought = id_cart;
        cartItemObj.id_cart = cartItem.id;

        cartItemObj.price_item = cartItem.price;
        cartItemObj.price_options = cartItem.price_options;
        cartItemObj.quantity = cartItem.quantity;

        const totalPrice = (cartItem.price + cartItem.price_options) * cartItem.quantity;

        cartItemObj.total_price = totalPrice;

        const percentDiscount = offerArticle.id ? offerArticle.percent_discount : 0.0;

        cartItemObj.id_offer = offerArticle.id ? offerArticle.id : null;
        cartItemObj.percent_discount = percentDiscount;

        cartItemObj.total_price_with_discount = totalPrice * (1 - percentDiscount / 100);

        cartItemObj.status = 1;

        const { data, status } = await createCartBuyItem(cartItemObj);
        return status;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status === 201);
};

export const useUpdateCartItemsStatus = async (cartItems, status) => {
    const promises = cartItems.map(async (cartItem) => {
        const cartItemObj = {
            status: status,
        };

        const { data, status: responseStatus } = await updateCartItemStatus(cartItem.id, cartItemObj);
        return responseStatus;
    });

    const results = await Promise.all(promises);
    return results.every((responseStatus) => responseStatus === 200);
};

export const useGetCartUserBought = (id) =>
    useQuery({
        queryKey: [`cart-user-bought-${id}`],
        // staleTime: Infinity,
        queryFn: () => getCartUserBought(id),
    });

export const useAddArticleToList = async (id_user, id_article) => {
    const articleToListObj = {
        id: uuidv4(),
        id_user: id_user,
        id_article: id_article,
        status: 1,
    };

    console.log(articleToListObj);

    const { data, status } = await addArticleToList(articleToListObj);
    return status == 201;
};

export const useUpdateArticleInListStatus = async (id, status) => {
    const articleToListObj = {
        id: id,
        status: status,
    };

    console.log(articleToListObj);

    const { data, status: resStatus } = await updateArticleInListStatus(articleToListObj);
    return resStatus == 200;
};

// export const useCreateCartItemOption = async (cart, options) => {
//     console.log(article);
//     console.log(options);
//     let status = 201;
//     Object.values(options).forEach( async (option) => {
//         const cartItemOption = {};
//         cartItemOption.id = uuidv4();
//         cartItemOption.id_article = cart.id_article;
//         cartItemOption.id_user = "";
//         cartItemOption.id_cart = cart.id;
//         cartItemOption.status = 1;
//         cartItemOption.id_option = option.id_option;
//         cartItemOption.id_value = option.id_value;

//         const { data, status } = await createCartItemOption(cartItemOption);
//         status = status;
//     });
//     return status == 201;
// };

// CREATE TABLE cart_item_options(
//   id char(36) NOT NULL PRIMARY KEY,
//   id_article char(36) NOT NULL,
//   id_user char(36) NOT NULL,
//   id_cart char(36) NOT NULL,
//   status TINYINT NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// export const useCreateArticleHighlightedParagraphs = async (id_article, highlightedParagraphs) => {
//     let status = true;
//     for (const highlightedParagraph of highlightedParagraphs) {
//         const highlightedParagraphObject = {
//             id: uuidv4(),
//             id_article: id_article,
//             paragraph: highlightedParagraph,
//             status: 1,
//         };
//         const { res, data } = await createArticleHighlightedParagraph(highlightedParagraphObject);
//         console.log(res);
//         console.log(data);
//         if (res.status != 201) status = res.status;
//     }
//     return status == 201;
// };

export const useGetOrders = (status) =>
    useQuery({
        queryKey: [`orders`],
        // staleTime: Infinity,
        queryFn: () => getOrders(status),
    });

export const useGetOrdersByResponsibleShop = (idShop, status) =>
    useQuery({
        queryKey: [`orders-responsible-shop-${idShop}`],
        // staleTime: Infinity,
        queryFn: () => getOrdersByResponsibleShop(idShop, status),
    });

export const useGetOrdersFromShop = (idShop, status) =>
    useQuery({
        queryKey: [`orders-from-shop-${idShop}`],
        // staleTime: Infinity,
        enabled: !!idShop && idShop !== "",
        queryFn: () => getOrdersFromShop(idShop, status),
    });

export const useGetOrdersFromShopAndOrder = (idShop, idOrder) =>
    useQuery({
        queryKey: [`orders-from-shop-${idShop}-${idOrder}`],
        // staleTime: Infinity,
        enabled: !!idShop && idShop !== "",
        queryFn: () => getOrdersFromShopAndOrder(idShop, idOrder),
    });

export const useUpdateCartBoughtItemStatus = async (id, status) => {
    const { data, status: resStatus } = await updateCartBoughtItemStatus(id, status);
    return resStatus == 200;
};

export const useUpdateCartsBoughtItemStatus = async (ids, status) => {
    const promises = ids.map(async (id) => {
        const { data, status: resStatus } = await updateCartBoughtItemStatus(id, status);
        return resStatus;
    });

    const results = await Promise.all(promises);
    return results.every((resStatus) => resStatus === 200);
};

export const useGetOrderById = (idOrder) =>
    useQuery({
        queryKey: [`order-${idOrder}`],
        // staleTime: Infinity,
        enabled: !!idOrder && idOrder !== "",
        queryFn: () => getOrderById(idOrder),
    });

export const useUpdateCartBoughtItemStatusImage = async (id, status) => {
    const { data, status: resStatus } = await updateCartBoughtItemStatusImage(id, status);
    return resStatus == 200;
};

export const useUpdateCartBoughtStatus = async (id, status) => {
    const { data, status: resStatus } = await updateCartBoughtStatus(id, status);
    return resStatus == 200;
};

export const useGetOrderByIdCart = (idCart) =>
    useQuery({
        queryKey: [`order-by-id-cart-${idCart}`],
        queryFn: () => getOrderByIdCart(idCart),
    });

export const useSearchArticlesOrderedUserByWord = async (idUser, word) => {
    const { data, status, message } = await searchArticlesOrderedUserByWord(idUser, word);
    return data;
};
