import api from "@/app/api/api";

const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
// const url = "http://192.168.16.63:8081";

export const createArticleOption = async (articleOption) => {
    const res = await fetch(`${url}/articles/options`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(articleOption),
    });
    const data = await res.json();
    return { res, data };
};

// export const updateArticleOption = async (articleOption) => {
//     const res = await fetch(`${url}/api/articles/options/${articleOption.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(articleOption),
//     });
//     const data = await res.json();
//     return { res, data };
// };

export const getArticleOptions = async (idArticle) => {
    try {
        const res = await api.get(`/api/articles/options/${idArticle}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteArticleOption = async (idArticleOption) => {
    try {
        const res = await api.delete(`/api/articles/options/${idArticleOption}`);
        return { status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
    }
};

export const updateArticleOption = async (idArticleOption, articleOption) => {
    try {
        const res = await api.put(`/api/articles/options/${idArticleOption}`, articleOption);
        console.log(res);
        return { status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
    }
};
