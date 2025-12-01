import api from "@/app/api/api";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
// const url = "http://192.168.16.63:8081";

export const createCartItem = async (article) => {
    try {
        const res = await axios.post(`${url}/carts`, article);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
    }
};

export const updateCartItem = async (article) => {
    const res = await axios.put(`${url}/carts`, article);
    console.log(res);
    return { res, data: res.data };
};

export const createCartItemOption = async (article) => {
    try {
        const res = await axios.post(`${url}/carts/items-options`, article);
        console.log(res);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
    }
};

export const getCartItemOption = async (idCart) => {
    console.log(idCart);
    try {
        const res = await axios.get(`${url}/carts/items-options/${idCart}`);
        console.log(res);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCartUser = async (id) => {
    try {
        const res = await axios.get(`${url}/carts/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getCartUserCannotBuy = async (id) => {
    try {
        const res = await axios.get(`${url}/carts/${id}/cannot-buy`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const updateCartItemStatus = async (id, cartStatus) => {
    console.log(cartStatus);
    try {
        const res = await axios.put(`${url}/carts/set-item-status/${id}`, cartStatus);
        console.log(res);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
    }
};

export const updateCartItemQuantity = async (id, cartQuantity) => {
    try {
        const res = await axios.put(`${url}/carts/set-item-quantity/${id}`, cartQuantity);
        console.log(res);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
    }
};

export const getCartUserSavedForLater = async (id) => {
    try {
        const res = await axios.get(`${url}/carts/saved-for-later/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getCartUserReadyToBuy = async (id) => {
    try {
        const res = await axios.get(`${url}/carts/ready-to-buy/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const createCartBuy = async (article) => {
    try {
        const res = await axios.post(`${url}/carts/buy`, article);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
    }
};

export const createCartBuyItem = async (article) => {
    try {
        const res = await axios.post(`${url}/carts/buy-item`, article);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
    }
};

export const getCartUserBought = async (id) => {
    try {
        const res = await axios.get(`${url}/carts/boughts/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getLasCartItemUserOfArticle = async (iduser, id_article) => {
    try {
        const res = await api.get(`${url}/carts/boughts/last-cart-item/${iduser}/${id_article}`);
        console.log(res);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener el último carrito del usuario.");
    }
};

export const getOrders = async (status) => {
    try {
        const res = await api.get(`${url}/carts/orders?status=${status}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener el último carrito del usuario.");
    }
};

export const getOrdersByResponsibleShop = async (idShop, status) => {
    try {
        const res = await api.get(`${url}/carts/orders?status=${status}/responsible-shop/${idShop}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener el último carrito del usuario.");
    }
};

export const getOrdersFromShop = async (idShop, status) => {
    try {
        const res = await api.get(`${url}/carts/orders/shop/${idShop}?status=${status}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener el último carrito del usuario.");
    }
};

export const getOrdersFromShopAndOrder = async (idShop, idOrder) => {
    try {
        const res = await api.get(`${url}/carts/orders/shop/${idShop}/${idOrder}`);
        // console.log(res.data);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener el último carrito del usuario.");
    }
};

export const updateCartBoughtItemStatus = async (id, cartBoughtStatus) => {
    console.log(id, cartBoughtStatus);
    alert(id, cartBoughtStatus);
    try {
        const res = await axios.put(`${url}/carts/boughts/set-item-status/${id}`, { status: cartBoughtStatus });
        // console.log(res);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener el último carrito del usuario.");
    }
};

export const getOrderById = async (idOrder) => {
    try {
        const res = await api.get(`${url}/carts/orders/${idOrder}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener el último carrito del usuario.");
    }
};

export const updateCartBoughtItemStatusImage = async (id, cartBoughtStatusImage) => {
    try {
        const res = await api.patch(`/carts/boughts/set-status-image/${id}`, { status: cartBoughtStatusImage });
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener el último carrito del usuario.");
    }
};

export const updateCartBoughtStatus = async (id, cartBoughtStatus) => {
    try {
        const res = await api.patch(`/carts/boughts/set-status/${id}`, { status: cartBoughtStatus });
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener el último carrito del usuario.");
    }
};

export const getOrderByIdCart = async (idCart) => {
    try {
        const res = await api.get(`/carts/order-by-id-cart/${idCart}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener el último carrito del usuario.");
    }
};

export const searchArticlesOrderedUserByWord = async (idUser, word) => {
    try {
        const res = await api.get(`${url}/carts/boughts/search-articles/${idUser}/${word}`);
        return { data: res.data.data, status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al buscar artículos ordenados por palabra.");
    }
};
