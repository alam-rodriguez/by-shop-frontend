// Axios
import api from "@/app/api/api";

export const getArticlesOrderByIdCart = async (idCart) => {
    try {
        const response = await api.get(`/articles/articles-order-by-id-cart/${idCart}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};
