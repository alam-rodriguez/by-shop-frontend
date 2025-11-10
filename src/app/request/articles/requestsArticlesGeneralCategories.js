import api from "@/app/api/api";

// const url = "http://localhost:3001";
const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
// const url = "http://192.168.16.63:8081";

export const createArticleGeneralCategory = async (articleGeneralCategory) => {
    const res = await fetch(`${url}/articles/general-categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(articleGeneralCategory),
    });
    const data = await res.json();
    return { res, data };
};

export const updateArticleGeneralCategory = async (articleGeneralCategory) => {
    const res = await fetch(`${url}/articles/general-categories/${articleGeneralCategory.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(articleGeneralCategory),
    });
    const data = await res.json();
    return { res, data };
};

export const deleteArticleGeneralCategory = async (idArticle, idGeneralCategory) => {
    try {
        const res = await api.delete(`/api/articles/general-categories/${idArticle}/${idGeneralCategory}`);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
    }
};
