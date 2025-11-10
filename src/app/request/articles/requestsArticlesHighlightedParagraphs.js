import api from "@/app/api/api";

const url = process.env.BACKEND_BASE_URL;
// const url = "http://192.168.16.63:8081";

export const createArticleHighlightedParagraph = async (articleHighlightedParagraph) => {
    const res = await fetch(`${url}/articles/highlighted-paragraphs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(articleHighlightedParagraph),
    });
    const data = await res.json();
    return { res, data };
};

// export const updateArticleHighlightedParagraph = async (articleHighlightedParagraph) => {
//     const res = await fetch(`${url}/api/articles/highlighted-paragraphs/${articleHighlightedParagraph.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(articleHighlightedParagraph),
//     });
//     const data = await res.json();
//     return { res, data };
// };

export const updateArticleHighlightedParagraph = async (idArticleHighlightedParagraph, articleHighlightedParagraph) => {
    try {
        const res = await api.put(`/api/articles/highlighted-paragraphs/${idArticleHighlightedParagraph}`, {
            paragraph: articleHighlightedParagraph,
        });
        return { status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
    }
};

export const deleteArticleHighlightedParagraph = async (idHighlightedParagraph) => {
    try {
        const res = await api.delete(`/api/articles/highlighted-paragraphs/${idHighlightedParagraph}`);
        return { status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
    }
};

export const getArticleHighlightedParagraphs = async (idArticle) => {
    try {
        const res = await api.get(`/api/articles/highlighted-paragraphs/${idArticle}`);
        // console.log(res);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};
