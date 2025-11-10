import api from "@/app/api/api";

const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
// const url = "http://192.168.16.63:8081";

export const createArticleSpec = async (articleSpec) => {
    const res = await fetch(`${url}/articles/specs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(articleSpec),
    });
    const data = await res.json();
    return { res, data };
};

export const updateArticleSpec = async (articleSpec) => {
    const res = await fetch(`${url}/articles/specs/${articleSpec.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(articleSpec),
    });
    const data = await res.json();
    return { res, data };
};

export const deleteArticleSpec = async (idArticleSpec) => {
    try {
        const res = await api.delete(`/api/articles/specs/${idArticleSpec}`);
        return { status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
    }
};

export const getArticleSpecs = async (idArticle) => {
    try {
        const res = await api.get(`/api/articles/specs/${idArticle}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateArticleSpec2 = async (idArticleSpec, articleSpec) => {
    try {
        const res = await api.put(`/api/articles/specs/${idArticleSpec}`, articleSpec);
        return { status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
    }
};
