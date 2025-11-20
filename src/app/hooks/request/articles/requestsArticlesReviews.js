// React Query
import { useQuery } from "@tanstack/react-query";

// uuid
import { v4 as uuidv4 } from "uuid";

// Requests
import {
    createArticleReview,
    createArticleReviewImage,
    createArticleReviewOption,
    getArticleReviews,
    getArticleReviewsData,
    getRequestsReviews,
    getReviewArticle,
    changeReviewStatus,
    getRequestsReviewsByShop,
    getReviewArticleUser,
} from "@/app/request/articles/requestsArticlesReviews";
import { getLasCartItemUserOfArticle } from "@/app/request/carts/requestsCarts";
import { isUUID } from "../../app/app";

export const useCreateArticleReview = async (idUser, idArticle, articleReview) => {
    const articleReviewObj = {
        id: uuidv4(),
        id_user: idUser,
        id_article: idArticle,
        user_public_name: articleReview.user_public_name,
        title: articleReview.title,
        rating: articleReview.rating,
        comment: articleReview.comment,
        status: 1,
    };

    const { status, data } = await createArticleReview(articleReviewObj);
    return { resStatus: status, resData: data };
};

// CREATE TABLE articles_reviews_images(
//     id char(36) NOT NULL PRIMARY KEY,
//     id_review char(36) NOT NULL,
//     image id_option char(36) NOT NULL,
//     status TINYINT NOT NULL
// );

export const useCreateArticleReviewImage = async (idReview, images) => {
    const promises = images.map(async (image) => {
        const imageObj = {};
        imageObj.id = uuidv4();
        imageObj.id_review = idReview;
        imageObj.image = image.ufsUrl;
        imageObj.status = 1;

        const { data, status } = await createArticleReviewImage(imageObj);
        return status;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status === 201);
};

// CREATE TABLE articles_reviews_options(
//     id char(36) NOT NULL PRIMARY KEY,
//     id_review char(36) NOT NULL,
//     id_option char(36) NOT NULL,
//     id_value char(36) NOT NULL,
//     status TINYINT NOT NULL
// );

export const useCreateArticleReviewOption = async (idReview, articleOptions) => {
    const promises = articleOptions.map(async (articleOption) => {
        const articleReviewOptionObj = {};
        articleReviewOptionObj.id = uuidv4();
        articleReviewOptionObj.id_review = idReview;
        articleReviewOptionObj.id_option = articleOption.id_option;
        articleReviewOptionObj.id_value = articleOption.id_value;
        articleReviewOptionObj.status = 1;

        const { data, status } = await createArticleReviewOption(articleReviewOptionObj);
        return status;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status === 201);
};

export const useGetLasCartItemUserOfArticle = (idUser, idArticle) =>
    useQuery({
        queryKey: [`article-reviews-${idUser}-${idArticle}`],
        staleTime: Infinity,
        enabled: !!idUser && !!idArticle,
        queryFn: () => getLasCartItemUserOfArticle(idUser, idArticle),
    });

export const useGetArticleReviews = (idArticle) =>
    useQuery({
        queryKey: [`article-reviews-${idArticle}`],
        // staleTime: Infinity,
        staleTime: 5 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
        queryFn: () => getArticleReviews(idArticle),
    });

export const useGetArticleReviewsData = (idArticle) =>
    useQuery({
        queryKey: [`article-reviews-data-${idArticle}`],
        // staleTime: Infinity,
        staleTime: 5 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
        enabled: !!idArticle,
        queryFn: () => getArticleReviewsData(idArticle),
    });

export const useGetRequestsReviews = () =>
    useQuery({
        queryKey: [`requests-reviews`],
        queryFn: () => getRequestsReviews(),
    });

export const useGetRequestsReviewsByShop = (idShop) =>
    useQuery({
        queryKey: [`requests-reviews-by-shop-${idShop}`],
        enabled: !!idShop && idShop !== "",
        queryFn: () => getRequestsReviewsByShop(idShop),
    });

export const useGetReviewArticle = (id) =>
    useQuery({
        queryKey: [`review-${id}`],
        queryFn: () => getReviewArticle(id),
    });

export const useChangeReviewStatus = async (id, status) => {
    const { status: resStatus, data } = await changeReviewStatus(id, status);
    console.log(resStatus);
    return resStatus == 200;
};

export const useGetReviewArticleUser = (userId, articleId) =>
    useQuery({
        queryKey: [`article-${articleId}-review-user-${userId}`],
        enabled: isUUID(userId) && isUUID(articleId),
        queryFn: () => getReviewArticleUser(userId, articleId),
    });
