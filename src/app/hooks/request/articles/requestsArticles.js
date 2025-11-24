import { useQuery } from "@tanstack/react-query";

// uuid
import { v4 as uuidv4 } from "uuid";

// Requests
import {
    articleIsInList,
    createUserArticleView,
    getArticle,
    getArticleBoxContents,
    getArticleFeaturesSpecs,
    getArticleMeasurements,
    getArticleOptions,
    getArticlesFromDirectCategory,
    getArticleSpecs,
    getUserArticlesViews,
    listArticlesUser,
    getArticles2,
    getArticleOffer,
    finder,
    getArticlesFromShop,
    getArticlesOfGroupCategory,
    getArticlesFromGeneralCategory,
    getArticlesFromGeneralCategoryWithoutArticle,
    getArticlesCanBeInterested,
    getArticlesSimilar,
    getArticleOtherImages,
    getArticleByIdCart,
    changeArticleQuantity,
    getArticleOfferByIdCartAndIdOffer,
    getArticlesByIdShop,
    getArticlesFromHomeCategory,
} from "@/app/request/articles/requestsArticles";

import { createArticleHighlightedParagraph, updateArticleHighlightedParagraph } from "@/app/request/articles/requestsArticlesHighlightedParagraphs";
import { deleteArticleBoxContent } from "@/app/request/articles/requestsArticlesBoxContents";

export const useGetArticle = (id) =>
    useQuery({
        queryKey: [`article-${id}`],
        // staleTime: Infinity,
        queryFn: () => getArticle(id),
    });

export const useGetArticleOffer = (id) =>
    useQuery({
        queryKey: [`article-${id}-offer`],
        // staleTime: Infinity,
        queryFn: () => getArticleOffer(id),
    });

export const useGetArticleOfferByIdCartAndIdOffer = (idCarttem, idOffer) =>
    useQuery({
        queryKey: [`article-${idCarttem}-offer-${idOffer}`],
        enabled: !!idCarttem && !!idOffer,
        // staleTime: Infinity,
        queryFn: () => getArticleOfferByIdCartAndIdOffer(idCarttem, idOffer),
    });

export const useGetArticleBoxContents = (id) =>
    useQuery({
        queryKey: [`article-box-contents-${id}`],
        // staleTime: Infinity,
        queryFn: () => getArticleBoxContents(id),
    });

export const useGetArticleOptions = (id) =>
    useQuery({
        queryKey: [`article-options-${id}`],
        staleTime: Infinity,
        queryFn: () => getArticleOptions(id),
    });

export const useGetArticleSpecs = (id) =>
    useQuery({
        queryKey: [`article-specs-${id}`],
        staleTime: Infinity,
        queryFn: () => getArticleSpecs(id),
    });

export const useGetArticleFeaturesSpecs = (id) =>
    useQuery({
        queryKey: [`article-features-specs-${id}`],
        staleTime: Infinity,
        queryFn: () => getArticleFeaturesSpecs(id),
    });

export const useGetArticleMeasurements = (id) =>
    useQuery({
        queryKey: [`article-measurements-${id}`],
        staleTime: Infinity,
        queryFn: () => getArticleMeasurements(id),
    });

export const useCreateArticleHighlightedParagraphs = async (id_article, highlightedParagraphs) => {
    // let status = true;
    let status = 201;
    for (const highlightedParagraph of highlightedParagraphs) {
        const highlightedParagraphObject = {
            id: uuidv4(),
            id_article: id_article,
            paragraph: highlightedParagraph.paragraph,
            status: 1,
        };
        const { res, data } = await createArticleHighlightedParagraph(highlightedParagraphObject);
        console.log(res);
        console.log(data);
        if (res.status != 201) status = res.status;
    }
    return status == 201;
};

export const useArticleIsInList = (id_user, id_article) => {
    const data = { id_user: id_user, id_article: id_article };
    return useQuery({
        queryKey: [`article-${id_article}-is-in-list`],
        staleTime: Infinity,
        enabled: !!id_user && !!id_article,
        queryFn: () => articleIsInList(data),
    });
};

export const useListArticlesUser = (id_user) =>
    useQuery({
        queryKey: [`list-articles-${id_user}`],
        staleTime: Infinity,
        queryFn: () => listArticlesUser(id_user),
    });

export const useGetArticlesFromDirectCategory = (id_direct_category) => {
    console.log(id_direct_category);
    return useQuery({
        queryKey: [`articles-from-direct-category-${id_direct_category}`],
        staleTime: Infinity,
        queryFn: () => getArticlesFromDirectCategory(id_direct_category),
    });
};

export const useGetArticles2 = (type, id) => {
    return useQuery({
        queryKey: [`articles-from-direct-category-${id}`],
        staleTime: Infinity,
        queryFn: () => {
            if (type == "category-group") return getArticlesOfGroupCategory(id);
            if (type == "direct-category") return getArticlesFromDirectCategory(id);
            if (type == "general-category") return getArticlesFromGeneralCategory(id);
            if (type == "home-category") return getArticlesFromHomeCategory(id);
        },
    });
};

export const useCreateUserArticleView = async (idUser, idArticle, id_article_direct_category) => {
    const articleView = {
        id: uuidv4(),
        id_user: idUser,
        id_article: idArticle,
        id_article_direct_category: id_article_direct_category,
    };

    const { status, data } = await createUserArticleView(articleView);
    return status == 201;
};

export const useGetUserArticlesViews = (id_user) => {
    return useQuery({
        queryKey: [`user-${id_user}-articles-views`],
        queryFn: () => getUserArticlesViews(id_user),
    });
};
export const useGetArticles = () =>
    useQuery({
        queryKey: [`articles`],
        staleTime: Infinity,
        queryFn: () => getArticles2(),
    });

export const useDeleteArticleBoxContent = async (idArticle, articlesBoxContent) => {
    const promises = articlesBoxContent.map(async (articleBoxContent) => {
        const { data, status } = await deleteArticleBoxContent(idArticle, articleBoxContent.id);
        return status === 200;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status);
};

export const useFinder = (word) =>
    useQuery({
        queryKey: [`finder`],
        queryFn: () => finder(word),
    });

// export const useFinder = async (word) => {
//     const { status, data } = await finder(word);
//     console.log(data.data);
//     return data.data;
// };

export const useGetArticlesFromShop = (idShop) =>
    useQuery({
        queryKey: [`articles-from-shop-${idShop}`],
        enabled: !!idShop && idShop !== "",
        queryFn: () => getArticlesFromShop(idShop),
    });

// export const useGetArticlesFromGeneralCategoryWithoutArticle = (idGeneralCategory, idArticle) =>
//     useQuery({
//         queryKey: [`articles-from-general-category-${idGeneralCategory}-without-article-${idArticle}`],
//         // enabled: !!idShop && idShop !== "",
//         queryFn: () => getArticlesFromGeneralCategoryWithoutArticle(idGeneralCategory, idArticle),
//     });

export const useGetArticlesCanBeInterested = (idArticle) =>
    useQuery({
        queryKey: [`articles-can-be-interested-${idArticle}`],
        // enabled: !!idShop && idShop !== "",
        queryFn: () => getArticlesCanBeInterested(idArticle),
    });

export const useGetArticlesSimilar = (idArticle) =>
    useQuery({
        queryKey: [`articles-similar-${idArticle}`],
        // enabled: !!idShop && idShop !== "",
        queryFn: () => getArticlesSimilar(idArticle),
    });

export const useGetArticleOtherImages = (idArticle) =>
    useQuery({
        queryKey: [`article-other-images-${idArticle}`],
        queryFn: () => getArticleOtherImages(idArticle),
    });

export const useGetArticleByIdCart = (idCart) =>
    useQuery({
        queryKey: [`article-by-id-cart-${idCart}`],
        queryFn: () => getArticleByIdCart(idCart),
    });

export const useChangeArticleQuantity = async (cart, action = "add") => {
    const promises = cart.map(async (cartItem) => {
        const { status, message, data } = await changeArticleQuantity(cartItem.id_article, cartItem.quantity, action);
        return status === 200;
    });

    const results = await Promise.all(promises);
    return results.every((status) => status);
};

export const useGetArticlesByIdShop = (id) =>
    useQuery({
        queryKey: [`articles-by-id-shop-${id}`],
        // staleTime: Infinity,
        queryFn: () => getArticlesByIdShop(id),
    });
