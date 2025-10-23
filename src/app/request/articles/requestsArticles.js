import api from "@/app/api/api";
import axios from "axios";

const url = "http://localhost:3001";
// const url = "http://192.168.16.63:8081";

export const getArticles = async () => {
    const res = await fetch(`${url}/api/articles`);
    const data = await res.json();
    return { res, data };
};

export const createArticle = async (article) => {
    const res = await fetch(`${url}/api/articles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
    });
    const data = await res.json();
    return { res, data };
};

export const updateArticle = async (article) => {
    const res = await fetch(`${url}/api/articles/${article.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
    });
    const data = await res.json();
    return { res, data };
};

export const getArticlesOfGroupCategory = async (id) => {
    try {
        const response = await axios.get(`${url}/api/articles/get-articles-group-category/${id}`);
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getArticle = async (id) => {
    try {
        const response = await axios.get(`${url}/api/articles/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getArticleOffer = async (id) => {
    try {
        const response = await axios.get(`${url}/api/articles/${id}/offer`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getArticleOfferByIdCartAndIdOffer = async (idCarttem, idOffer) => {
    try {
        const response = await axios.get(`${url}/api/articles/${idCarttem}/offer/${idOffer}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getArticleOptions = async (id) => {
    try {
        const response = await axios.get(`${url}/api/articles/options/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getArticleBoxContents = async (id) => {
    try {
        const response = await axios.get(`${url}/api/articles/box-contents/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getArticleSpecs = async (id) => {
    try {
        const response = await axios.get(`${url}/api/articles/specs/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getArticleFeaturesSpecs = async (id) => {
    try {
        const response = await axios.get(`${url}/api/articles/featured-specs/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getArticleMeasurements = async (id) => {
    try {
        const response = await axios.get(`${url}/api/articles/measurements/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const addArticleToList = async (article) => {
    console.log(article);
    try {
        const res = await axios.post(`${url}/api/articles/list`, article);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
    }
};

export const articleIsInList = async (article) => {
    try {
        const res = await axios.get(`${url}/api/articles/is-in-list`, {
            params: article,
        });
        console.log(res.data.data);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateArticleInListStatus = async (article) => {
    try {
        const res = await axios.patch(`${url}/api/articles/set-list-status/${article.id}`, article);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
    }
};

export const listArticlesUser = async (id_user) => {
    try {
        const res = await axios.get(`${url}/api/articles/list-user/${id_user}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getArticlesFromDirectCategory = async (id_direct_category) => {
    console.log(id_direct_category);
    try {
        const res = await axios.get(`${url}/api/articles/get-articles-from-direct-category/${id_direct_category}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const createUserArticleView = async (articleView) => {
    try {
        const res = await axios.post(`${url}/api/articles/user-views`, articleView);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
    }
};

export const getUserArticlesViews = async (id_user) => {
    try {
        const res = await axios.get(`${url}/api/articles/user-views/${id_user}`);
        console.log(res.data.data);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getArticles2 = async () => {
    try {
        const response = await api.get(`/api/articles`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener los articulos.");
    }
};

// export const finder = async (word) => {
//     try {
//         const response = await api.get(`/api/articles/buscardor/${word}`);
//         return { status: response.status, data: response.data };
//     } catch (error) {
//         console.log(error);
//         throw new Error("Error al obtener los articulos.");
//     }
// };

export const finder = async (word) => {
    try {
        const response = await api.get(`/api/articles/buscardor/${word}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener los articulos.");
    }
};

export const getArticlesFromShop = async (idShop) => {
    try {
        const response = await api.get(`/api/articles/shop/${idShop}`);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener los articulos.");
    }
};

// export const getArticlesFromGeneralCategory = async (id_general_category) => {
//     console.log(id_direct_category);
//     try {
//         const res = await axios.get(`${url}/api/articles/get-articles-from-direct-category/${id_direct_category}`);
//         return res.data.data;
//     } catch (error) {
//         console.log(error);
//     }
// };

export const getArticlesFromGeneralCategory = async (id_general_category) => {
    try {
        const res = await api.get(`/api/articles/get-articles-from-general-category/${id_general_category}`);
        console.log(res);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

// export const getArticlesFromGeneralCategoryWithoutArticle = async (id_general_category, id_article) => {
//     try {
//         const res = await api.get(`/api/articles/get-articles-from-general-category-without-article/${id_general_category}/${id_article}`);
//         return res.data.data;
//     } catch (error) {
//         console.log(error);
//     }
// };

export const getArticlesCanBeInterested = async (id_article) => {
    try {
        const res = await api.get(`/api/articles/get-articles-can-be-interested/${id_article}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getArticlesSimilar = async (id_article) => {
    try {
        const res = await api.get(`/api/articles/get-articles-similar/${id_article}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getArticleOtherImages = async (id_article) => {
    try {
        const res = await api.get(`/api/articles/articles-other-images/${id_article}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getArticleByIdCart = async (idCart) => {
    try {
        const response = await api.get(`/api/articles/id-cart/${idCart}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const changeArticleQuantity = async (idArticle, quantity, action = "add") => {
    try {
        const response = await api.patch(`/api/articles/change-quantity/${idArticle}?action=${action}`, { quantity });
        return { status: response.status, message: response.data.message, data: response.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getArticlesByIdShop = async (idShop) => {
    try {
        const response = await api.get(`/api/articles/by-id-shop/${idShop}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};
