// Requests
import { deleteArticleImage, updateArticleImage } from "@/app/request/articles/requestsArticlesImages";

export const useDeleteArticleImages = async (images) => {
    const promises = images.map(async (image) => {
        const { data, status } = await deleteArticleImage(image.id);
        return status;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status === 200);
};

export const useUpdateArticleImage = async (images) => {
    console.log(images);
    const promises = images.map(async (image) => {
        const { data, status } = await updateArticleImage(image.id, image.imageUrl);
        return status;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status === 200);
};
