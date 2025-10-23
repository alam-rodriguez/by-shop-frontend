import React from "react";

// uuid
import { v4 as uuidv4 } from "uuid";

// Request
import { createArticle, getArticles, getArticlesOfGroupCategory, updateArticle } from "@/app/request/articles/requestsArticles";
import { createArticleGeneralCategory, updateArticleGeneralCategory } from "@/app/request/articles/requestsArticlesGeneralCategories";
import { createArticleBoxContent, updateArticleBoxContent } from "@/app/request/articles/requestsArticlesBoxContents";

// Zustand
import { zusAdminArticles } from "@/app/zustand/admin/articles/zusAdminArticles";
import { createArticleImage } from "@/app/request/articles/requestsArticlesImages";
import { createOption } from "@/app/request/options/requestsOptions";
import { createArticleOption } from "@/app/request/articles/requestsArticlesOptions";
import { createArticleSpec } from "@/app/request/articles/requestsArticlesSpecs";
import { useQuery } from "@tanstack/react-query";

const useRequestsArticles = () => {
    const { setArticles } = zusAdminArticles();

    const useGetArticles = async () => {
        const { res, data } = await getArticles();
        console.log(data);
        if (data.length > 0) setArticles(data.data, 1);
        else setArticles(data.data, 2);
    };

    const useCreateArticle = async (article) => {
        const { res, data } = await createArticle(article);
        console.log(res);
        console.log(data);
        return res.status == 201;
    };

    const useUpdateArticle = async (article) => {
        const { res, data } = await updateArticle(article);
        return res.status == 200;
    };

    const useCreateArticleGeneralCategories = async (id_article, articleGeneralCategory) => {
        let status = 201;
        console.log(articleGeneralCategory);
        for (const category of articleGeneralCategory) {
            const categotyObject = {
                id: uuidv4(),
                id_article: id_article,
                status: 1,
                id_general_category: category.value,
            };
            const { res, data } = await createArticleGeneralCategory(categotyObject);
            if (res.status != 201) status = res.status;
        }
        return status == 201;
    };

    const useUpdateArticleGeneralCategories = async (articleGeneralCategory) => {
        const { res, data } = await updateArticleGeneralCategory(articleGeneralCategory);
        return res.status == 201;
    };

    const useCreateArticleBoxContents = async (id_article, articleBoxContents) => {
        let status = 201;
        for (const boxContent of articleBoxContents) {
            const boxContentObject = {
                id: uuidv4(),
                id_article: id_article,
                status: 1,
                id_article_content: boxContent.value,
            };
            const { res, data } = await createArticleBoxContent(boxContentObject);
            if (res.status != 201) status = res.status;
        }
        return status == 201;
    };

    const useUpdateArticleBoxContents = async (articleGeneralCategory) => {
        const { res, data } = await updateArticleBoxContent(articleGeneralCategory);
        return res.status == 201;
    };

    const usecreateArticleImages = async (id_article, articleImages) => {
        console.log(articleImages);
        let status = 201;
        for (const articleImage of articleImages) {
            const imageObject = {
                id: uuidv4(),
                id_article: id_article,
                status: 1,
                image: articleImage.url,
            };
            const { res, data } = await createArticleImage(imageObject);
            if (res.status != 201) status = res.status;
        }
        return status == 201;
    };

    const useCreateArticleOption = async (id_article, options) => {
        // let status = true;
        let status = 201;
        for (const option of options) {
            // const imageUrl = option.imageUrl != "" ? ;
            const optionObject = {
                id: uuidv4(),
                id_article: id_article,
                id_option: option.id_option,
                id_value: option.id_value,
                image: option.imageUrl ?? "",
                color: option.color ?? "",
                price: option.price,
                quantity: option.quantity,
                status: 1,
            };
            console.log(optionObject);
            // id, id_article, id_option, id_value, image, price, quantity, color, status;
            // id, id_article, id_option, id_value, image, price, status;
            const { res, data } = await createArticleOption(optionObject);
            console.log(res);
            console.log(data);
            if (res.status != 201) status = res.status;
        }
        return status == 201;
    };

    // CREATE TABLE articles_specs (
    //             id CHAR(36) NOT NULL PRIMARY KEY,
    //             id_article CHAR(36) NOT NULL,
    //             id_option CHAR(36) NOT NULL,
    //             id_value CHAR(36) NOT NULL,
    //             type TINYINT NOT NULL,
    //             status TINYINT NOT NULL
    //         );

    // const useCreateArticleSpecs = async (id_article, specs) => {
    //     let status = true;
    //     for (const spec of specs) {
    //         const specObject = {
    //             id: uuidv4(),
    //             id_article: id_article,
    //             id_option: spec.key,
    //             id_value: spec.value,
    //             type: !spec.type ? 1 : 2,
    //             status: 1,
    //         };
    //         const { res, data } = await createArticleSpec(specObject);
    //         console.log(res);
    //         console.log(data);
    //         if (res.status != 201) status = res.status;
    //     }
    //     return status == 201;
    // };

    const useCreateArticleSpecs = async (id_article, specs) => {
        // let status = true;
        let status = 201;
        for (const spec of specs) {
            const specObject = {
                id: uuidv4(),
                id_article: id_article,
                id_option: spec.id_option,
                id_value: spec.id_value,
                // type: !spec.type ? 1 : 2,
                is_spec: spec.is_spec,
                is_measurement: spec.is_measurement,
                is_highlight: spec.is_highlight,
                status: 1,
            };
            const { res, data } = await createArticleSpec(specObject);
            console.log(res);
            console.log(data);
            if (res.status != 201) status = res.status;
        }
        return status == 201;
    };

    const useGetArticlesOfGroupCategory = (id_group_category) => {
        return useQuery({
            queryKey: [`articlesOfCategoryGroup-${id_group_category}`],
            staleTime: Infinity,
            queryFn: () => getArticlesOfGroupCategory(id_group_category),
        });
    };

    return {
        useGetArticles,
        useCreateArticle,
        useUpdateArticle,
        useCreateArticleGeneralCategories,
        useUpdateArticleGeneralCategories,
        useCreateArticleBoxContents,
        useUpdateArticleBoxContents,
        usecreateArticleImages,
        useCreateArticleOption,
        useCreateArticleSpecs,
        useGetArticlesOfGroupCategory,
    };
};

export default useRequestsArticles;
