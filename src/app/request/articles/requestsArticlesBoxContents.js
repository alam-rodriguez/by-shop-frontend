import api from "@/app/api/api";

const url = "http://localhost:3001";
// const url = "http://192.168.16.63:8081";

export const createArticleBoxContent = async (articleBoxContent) => {
    const res = await fetch(`${url}/api/articles/box-contents`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(articleBoxContent),
    });
    const data = await res.json();
    return { res, data };
};

export const updateArticleBoxContent = async (articleBoxContent) => {
    const res = await fetch(`${url}/api/articles/box-contents/${articleBoxContent.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(articleBoxContent),
    });
    const data = await res.json();
    return { res, data };
};

export const deleteArticleBoxContent = async (idArticle, idArticleBoxContent) => {
    try {
        const res = await api.delete(`/api/articles/box-contents/${idArticle}/${idArticleBoxContent}`);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getArticlesForBoxContent = async (idShop, idArticle) => {
    try {
        const response = await api.get(`/api/articles/box-contents/${idShop}/${idArticle}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener los articulos.");
    }
};
