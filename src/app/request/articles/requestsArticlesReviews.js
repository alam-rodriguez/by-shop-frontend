import api from "@/app/api/api";

export const createArticleReview = async (articleReview) => {
    try {
        const res = await api.post(`/articles/reviews`, articleReview);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la opinión.");
    }
};

export const updateArticleReview = async (articleReview) => {
    try {
        const res = await api.put(`/articles/reviews/${articleReview.id}`, articleReview);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la opinión.");
    }
};

export const createArticleReviewImage = async (articleReviewImage) => {
    try {
        const res = await api.post(`/articles/reviews-images`, articleReviewImage);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la imagen de la opinión.");
    }
};

export const deleteArticleReviewImages = async (ids) => {
    try {
        const res = await api.delete(`/articles/reviews-images/${ids}`);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la opinión.");
    }
};

export const createArticleReviewOption = async (articleReviewOption) => {
    try {
        const res = await api.post(`/articles/reviews-article-options`, articleReviewOption);
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la opción de la opinión.");
    }
};

export const getArticleReviews = async (idArticle) => {
    try {
        const res = await api.get(`/articles/reviews/${idArticle}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las opiniones.");
    }
};

export const getArticleReviewsData = async (idArticle) => {
    try {
        const res = await api.get(`/articles/reviews-article-data/${idArticle}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener los datos de las opiniones.");
    }
};

export const getRequestsReviews = async () => {
    try {
        const response = await api.get(`/articles/requests-reviews-articles`);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las solicitudes de comentarios.");
    }
};

export const getRequestsReviewsByShop = async (idShop) => {
    try {
        const response = await api.get(`/articles/requests-reviews-articles/${idShop}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las solicitudes de comentarios.");
    }
};

export const getReviewArticle = async (id) => {
    try {
        const response = await api.get(`/articles/review-article/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la opinión del artículo.");
    }
};

export const changeReviewStatus = async (id, status) => {
    console.log(id, status);
    try {
        const res = await api.patch(`/articles/change-review-status/${id}`, { status });
        return { status: res.status, data: res.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al cambiar el estado de la opinión.");
    }
};

export const getReviewArticleUser = async (userId, articleId) => {
    try {
        const response = await api.get(`articles/review-user/${userId}/${articleId}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la opinión del artículo.");
    }
};
