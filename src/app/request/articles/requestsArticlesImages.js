// Axios
import api from "@/app/api/api";

const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
// const url = "http://192.168.16.63:8081";

export const createArticleImage = async (articleImage) => {
    const res = await fetch(`${url}/articles/images`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(articleImage),
    });
    const data = await res.json();
    return { res, data };
};

// export const updateArticleImage = async (articleImage) => {
//     const res = await fetch(`${url}/api/articles/images/${articleImage.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(articleImage),
//     });
//     const data = await res.json();
//     return { res, data };
// };

export const deleteArticleImage = async (id) => {
    try {
        const res = await api.delete(`/articles/images/${id}`);
        return { status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
    }
};

export const updateArticleImage = async (id, image) => {
    try {
        const res = await api.patch(`/articles/images/${id}`, { image });
        return { status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
    }
};
