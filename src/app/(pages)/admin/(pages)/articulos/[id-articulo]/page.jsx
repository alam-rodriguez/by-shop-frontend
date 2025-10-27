"use client";

import createCategorySchema from "@/app/schemas/category.schema";
import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";
// import { useUploadThing } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { use, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import SelectRact from "react-select";

import useRequestCategories from "@/app/hooks/request/categories/useRequestCategories";
import useUploadThing from "@/app/hooks/upload-thing/useUploadThing";
import createArticleSchema from "@/app/schemas/article.schema";
import Divider from "@/app/components/home/Divider";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import useRequestsModels from "@/app/hooks/request/models/useRequetsModels";
import { zusAdminModels } from "@/app/zustand/admin/models/zusAdminModels";
import useRequestsPaymentMethods from "@/app/hooks/request/payment-methods/usePaymentMethods";
import { zusAdminPaymentMethods } from "@/app/zustand/admin/payment-methods/zusPaymentMethods";
import useRequestsOptions from "@/app/hooks/request/options/useRequestsOptions";
import { zusAdminOptions } from "@/app/zustand/admin/options/zusAdminOptions";
import useRequestsArticles from "@/app/hooks/request/articles/useRequestsArticles";
import { zusAdminArticles } from "@/app/zustand/admin/articles/zusAdminArticles";
import {
    useCreateArticleHighlightedParagraphs,
    useDeleteArticleBoxContent,
    useGetArticle,
    useGetArticleBoxContents,
    useGetArticleOtherImages,
    useGetArticlesFromShop,
    useGetArticleSpecs,
} from "@/app/hooks/request/articles/requestsArticles";
import InputFile from "@/app/components/inputs/InputFile";
import { useParams, useRouter } from "next/navigation";
import {
    getDataForAddDeleteAndUpdate,
    getDataForAddDeleteAndUpdateOptions,
    getDataForAddDeleteAndUpdateSpecs,
    getDataSelectMultiForAddAndDelete,
    getDataSelectMultiForAddAndDelete2,
    getDataSelectMultiForAddAndDeleteImages,
    getDefaultsValuesForSelectMulti,
} from "@/app/hooks/app/app";
import { useGetGeneralCategories, useGetGeneralCategoriesOfArticle } from "@/app/hooks/request/categories/requestsCategories";
import { toast } from "sonner";
import { useDeleteArticleGeneralCategory } from "@/app/hooks/request/articles/requestsArticlesGeneralCategories";
import { zusUser } from "@/app/zustand/user/zusUser";
import { useDeleteArticleImages, useUpdateArticleImage } from "@/app/hooks/request/articles/requestsArticlesImages";
import { useDeleteArticleOption, useGetArticleOptions, useUpdateArticleOption } from "@/app/hooks/request/articles/requestsArticlesOptions";
import { useDeleteArticleSpec, useUpdateArticleSpec2 } from "@/app/hooks/request/articles/requestsArticlesSpecs";
import {
    useDeleteArticleHighlightedParagraphs,
    useGetArticleHighlightedParagraphs,
    useUpdateArticleHighlightedParagraphs,
} from "@/app/hooks/request/articles/requestsArticlesHighlightedParagraphs";
import { useGetArticlesForBoxContent } from "@/app/hooks/request/articles/requestsArticlesBoxContent";
import ButtonGray from "@/app/components/others/ButtonGray";
import useRequestsBrands from "@/app/hooks/request/brands/useRequestsBrands";
import { zusAdminBrands } from "@/app/zustand/admin/brands/zusAdminbrands";
import { useGetCurrencies } from "@/app/hooks/request/currencies/requestsCurrencies";
// import { Input } from "postcss";

const page = () => {
    const router = useRouter();

    const { id_shop, name_shop } = zusUser();

    const { ["id-articulo"]: idArticle } = useParams();

    const wanCreate = idArticle == 0 ? true : false;

    console.log(idArticle);

    const { data: article, isLoading: isLoadingArticle } = useGetArticle(idArticle);

    useEffect(() => {
        console.warn(article);
    }, [article]);

    const { uploadImage, uploadImages, deleteImages, deleteImage } = useUploadThing();
    const { useCreateCategory, useUpdateCategory } = useRequestCategories();
    const { categorySelected, usingCategory } = zusAdminCategories();

    // const wanCreate = Object.keys({}).length == 0 ? true : false;

    const [schemaIsRequired, setSchemaIsRequired] = useState(wanCreate);

    const articleSchema = createArticleSchema(schemaIsRequired);

    const defaultValues = wanCreate
        ? {
              //   id_shop: "",
              general_categories: [],
          }
        : {
              //   id_shop: "345678ytfrt-fgtyuhjygt",
              //   ...categorySelected,
          };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        setValue,
        getValues,
        reset,
    } = useForm({
        defaultValues,
        resolver: zodResolver(articleSchema),
    });

    useEffect(() => {
        if (article && article.id) reset(article);
    }, [article]);

    const { data: generalCategories, isLoading: isLoadingGeneralCategories } = useGetGeneralCategories();

    useEffect(() => {
        console.log(generalCategories);
    }, [generalCategories]);

    const { data: generalCategoriesArticle, isLoading: isLoadingGeneralCategoriesArticle } = useGetGeneralCategoriesOfArticle(idArticle);

    const { data: dataArticleBoxContents, isLoading: isLoadingArticleBoxContent } = useGetArticleBoxContents(idArticle);

    useEffect(() => {
        console.log(dataArticleBoxContents);
    }, [dataArticleBoxContents]);

    useEffect(() => {
        console.log(generalCategoriesArticle);
    }, [generalCategoriesArticle]);

    const { articles } = zusAdminArticles();

    const { data: articlesFromShop, isLoading: isLoadingArticlesFromShop } = useGetArticlesFromShop(id_shop);

    // useEffect(() => {
    //     setValue("id_shop", "55");
    // }, []); // se ejecuta solo al montar

    // useEffect(() => {
    //     if (!id_shop) return;
    //     setValue("id_shop", id_shop);
    // }, [id_shop]);

    useEffect(() => {
        if (id_shop == "") return;
        setValue("id_shop", id_shop);
    }, [id_shop, setValue]);

    // useEffect(() => {
    //     console.log(watch("id_shop"));
    // }, [watch("id_shop")]);

    useEffect(() => {
        if (isLoadingGeneralCategoriesArticle || isLoadingGeneralCategories || !generalCategoriesArticle || !generalCategories) return;
        const generalCategoriesDefaultValues = getDefaultsValuesForSelectMulti(generalCategoriesArticle, generalCategories, "id");
        setValue("general_categories", generalCategoriesDefaultValues);
    }, [generalCategoriesArticle, generalCategories]);

    const { data: articlesForBoxContent, isLoading: isLoadingArticlesForBoxContent } = useGetArticlesForBoxContent(id_shop, idArticle);

    useEffect(() => {
        if (isLoadingArticleBoxContent || isLoadingArticlesForBoxContent || !dataArticleBoxContents || !articlesForBoxContent) return;
        const articleBoxContentDefaultValues = getDefaultsValuesForSelectMulti(dataArticleBoxContents, articlesForBoxContent, "id");
        setValue("box_content", articleBoxContentDefaultValues);
    }, [dataArticleBoxContents, articlesForBoxContent]);

    // useEffect(() => {
    //     if (isLoadingArticleBoxContent || isLoadingArticlesFromShop || !dataArticleBoxContents || !articlesFromShop) return;
    //     const articleBoxContentDefaultValues = getDefaultsValuesForSelectMulti(dataArticleBoxContents, articlesFromShop, "id");
    //     setValue("box_content", articleBoxContentDefaultValues);
    // }, [dataArticleBoxContents, articlesFromShop]);

    // useEffect(() => {
    //     if (isLoadingArticle || articles.length == 0) return;
    //     console.log(article);
    //     // reset(article);

    //     console.log(generalCategoriesArticle);
    //     console.log(generalCategories);
    //     const generalCategoriesDefaultValues = getDefaultsValuesForSelectMulti(generalCategoriesArticle, generalCategories, "id");
    //     console.log(dataArticleBoxContents);
    //     console.log(articles);
    //     const articleBoxContentDefaultValues = getDefaultsValuesForSelectMulti(dataArticleBoxContents, articles, "id");
    //     console.log(articleBoxContentDefaultValues);

    //     console.log(generalCategoriesDefaultValues);
    //     setValue("general_categories", generalCategoriesDefaultValues);
    //     setValue("box_content", articleBoxContentDefaultValues);
    // }, [article, articles]);

    const { data: otherImages, isLoading: isLoadingOtherImages } = useGetArticleOtherImages(idArticle);

    const {
        fields: imagesFields,
        append: imageAppend,
        prependFields,
        remove: imageRemove,
        swapFields,
        moveFields,
        insertFields,
    } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "images", // unique name for your Field Array
    });

    useEffect(() => {
        if (isLoadingOtherImages || !otherImages) return;
        // console.error(otherImages);
        otherImages.forEach((image) => {
            imageAppend({ image: {}, id: image.id, imageUrl: image.image });
        });
    }, [otherImages]);

    const {
        fields,
        append,
        prepend,
        remove: removeSpec,
        swap,
        move,
        insert,
    } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "specs", // unique name for your Field Array
    });
    const { data: articleSpecs, isLoading: isLoadingArticleSpecs } = useGetArticleSpecs(idArticle);

    useEffect(() => {
        if (isLoadingArticleSpecs || !articleSpecs) return;
        articleSpecs.forEach((articleSpec) => {
            append({
                id: articleSpec.id,
                id_option: articleSpec.id_option,
                id_value: articleSpec.id_value,
                is_spec: articleSpec.is_spec,
                is_measurement: articleSpec.is_measurement,
                is_highlight: articleSpec.is_highlight,
            });
        });
    }, [articleSpecs]);

    const {
        fields: highlightedParagraphsfields,
        append: highlightedParagraphsAppend,
        remove: highlightedParagraphsRemove,
    } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "highlighted_paragraphs", // unique name for your Field Array
    });

    const { data: articleHighlightedParagraphs, isLoading: isLoadingArticleHighlightedParagraphs } = useGetArticleHighlightedParagraphs(idArticle);
    useEffect(() => {
        if (isLoadingArticleHighlightedParagraphs || !articleHighlightedParagraphs) return;
        // console.error(articleHighlightedParagraphs);
        articleHighlightedParagraphs.forEach((articleHighlightedParagraph) => {
            highlightedParagraphsAppend({
                id: articleHighlightedParagraph.id,
                paragraph: articleHighlightedParagraph.paragraph,
            });
        });
    }, [articleHighlightedParagraphs]);

    // const { fields: measurementsFields, append: measurementsAppend } = useFieldArray({
    //     control, // control props comes from useForm (optional: if you are using FormContext)
    //     name: "measurements", // unique name for your Field Array
    // });

    const {
        fields: optionsFields,
        append: optionsAppend,
        prepend: optionsPrepend,
        remove: optionRemove,
        swap: optionSwap,
        move: optionMove,
        insert: optionInsert,
    } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "options", // unique name for your Field Array
    });

    const { data: optionsArticle, isLoading: isLoadingOptions } = useGetArticleOptions(idArticle);

    useEffect(() => {
        if (isLoadingOptions || !optionsArticle) return;
        // options id_value_option name_option price quantity type_option color image

        optionsArticle.forEach((option) => {
            // console.error(option);
            optionsAppend({
                id: option.id,
                // name: option.name,
                // value: option.value,
                // options: option.id_option,
                id_value: option.id_value,
                name_option: option.option,
                price: option.price,
                quantity: option.quantity,
                type_option: option.type,
                require_image: option.require_image,
                require_color: option.require_color,
                require_quantity: option.require_quantity,
                require_price: option.require_price,
                color: option.color,
                image_url: option.image,
            });
        });
    }, [optionsArticle]);

    const [images, setImages] = useState([]);

    // const addImage = (e) => {
    //     const newFiles = Array.from(e.target.files); // Convertir FileList a array
    //     console.log(...newFiles);

    //     if (newFiles.length > 0) {
    //         // Actualizar estado local
    //         setImages((prev) => {
    //             const updatedImages = [...prev, ...newFiles];
    //             // setValue("images", updatedImages); // Sincronizar con React Hook Form
    //             return updatedImages; // Actualizar el estado local
    //         });
    //     }
    // };

    const { useGetDirectsCategories, useGetIndirectsCategories } = useRequestCategories();

    const { directCategories, indirectCategories } = zusAdminCategories();

    const { useGetModels, useCreateModel, useUpdateModel } = useRequestsModels();

    const { brands, setBrandSelected } = zusAdminBrands();

    const { useGetBrands } = useRequestsBrands();

    useEffect(() => {
        useGetBrands();
    }, []);

    useEffect(() => {
        console.log(brands);
    }, [brands]);

    const { models, setModelSelected } = zusAdminModels();

    const [modelsWidthFilter, setModelsWidthFilter] = useState([]);

    useEffect(() => {
        const idBrand = watch("id_brand");
        if (idBrand == "all") setModelsWidthFilter(models);
        else setModelsWidthFilter(models.filter((model) => model.id_brand === idBrand));
    }, [watch("id_brand"), models]);

    const { useGetPaymentMethods } = useRequestsPaymentMethods();

    const { paymentMethods } = zusAdminPaymentMethods();

    const { useGetOptions, useGetOptionsValues } = useRequestsOptions();

    const { options, valuesOptions } = zusAdminOptions();

    // useEffect(() => {
    //     console.error(valuesOptions);
    // }, [valuesOptions]);

    const {} = useRequestCategories();

    // const { useGetArticles } = useRequestsArticles();

    useEffect(() => {
        console.log(directCategories);
    }, [directCategories]);

    useEffect(() => {
        useGetDirectsCategories();
        useGetIndirectsCategories();
        useGetModels();
        useGetPaymentMethods();
        useGetOptions();
        useGetOptionsValues();
        // useGetGeneralCategories();
        useGetArticles();
    }, []);

    useEffect(() => {
        console.log(generalCategories);
    }, [generalCategories]);

    // const addImage = (e) => {
    //     // const newImages = e.target.files;
    //     const newImages = Array.from(e.target.files);
    //     console.log(...newImages);
    //     // console.log(e.target.files);
    //     // return;
    //     // const newImage = getValues("newImage"); // Obtener el valor del input
    //     // if (newImage) {
    //     // setImages((prev) => [...prev, ...newImages]); // Añadir al array local
    //     // setValue("images", [...images, ...newImages]); // Sincronizar con React Hook Form
    //     // setValue("newImage", ""); // Limpiar el input
    //     // }
    //     if (newImages.length > 0) {
    //         // Actualizar estado local
    //         setImages((prev) => {
    //             const updatedImages = [...prev, ...newImages];
    //             setValue("images", updatedImages); // Sincronizar con React Hook Form
    //             return updatedImages; // Actualizar el estado local
    //         });
    //     }
    // };

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index); // Eliminar del array local
        setImages(updatedImages);
        setValue("images", updatedImages); // Actualizar React Hook Form
    };

    const addImage = () => {
        setImages((state) => [
            ...state,
            <input type="file" key={state.length} {...register(`image-${state.length}`)} onChange={() => setSchemaIsRequired(true)} />,
        ]);
    };

    useEffect(() => {
        // console.log(wanCreate);
        console.log(errors);
    }, [errors]);

    const { useGetArticles, useCreateArticle, useUpdateArticle } = useRequestsArticles();
    const { useCreateArticleGeneralCategories, useUpdateArticleGeneralCategories } = useRequestsArticles();
    const { useCreateArticleBoxContents } = useRequestsArticles();
    const { usecreateArticleImages } = useRequestsArticles();
    const { useCreateArticleOption } = useRequestsArticles();
    const { useCreateArticleSpecs } = useRequestsArticles();

    const create = async (data) => {
        const loadingToast = toast.loading("Creando articulo...");

        console.log(data);
        const resImage = await uploadImage(data.main_image, "articles", data.name);
        const imageUrl = resImage[0].ufsUrl;
        data.main_image = imageUrl;
        console.log(imageUrl);

        const resGeneralCategories = await useCreateArticleGeneralCategories(data.id, data.general_categories);
        console.log(resGeneralCategories);

        const resBoxContents = await useCreateArticleBoxContents(data.id, data.box_content);
        console.log(resBoxContents);

        const optionsImagesFile = [];
        data.options.forEach((optionImage) => {
            optionsImagesFile.push({ imageFile: optionImage.image, folder: "articles/options", fileName: data.name });
        });
        const optionsImagesForDB = [...data.options];
        console.log(optionsImagesForDB);
        console.log(optionsImagesFile);
        const optionsImagesUrl = await uploadImages(optionsImagesFile);
        console.log(optionsImagesUrl);
        // optionsImagesUrl.forEach((imageUrl, index) => {
        //     data.options.some((option, i) => {
        //         // if (optionsImagesForDB[i].imageUrl) return true;
        //         if (!optionsImagesForDB[i].imageUrl && optionsImagesForDB[i].image.length > 0) {
        //             optionsImagesForDB[i].imageUrl = imageUrl.ufsUrl;
        //             return true;
        //         }
        //     });
        // });

        optionsImagesUrl.forEach((imageUrl, index) => {
            optionsImagesForDB[index].imageUrl = imageUrl.ufsUrl;
        });

        console.log(optionsImagesForDB);
        const resOptions = await useCreateArticleOption(data.id, optionsImagesForDB);
        console.log(resOptions);

        // const options = [];
        // data.options.forEach((option) => {
        //     const image = { imageFile: option.image, folder: "folder", fileName: "nombre.png" };
        //     options.push({ image: image, id_option: option.id_option, id_value_option: option.id_value_option, price: option.price });
        // });

        // id_option: "c28f9191-2a8c-4241-bfc2-75672caead5d";
        // id_value_option: "549bc5ec-6ced-4ddf-a467-ce0ac7a51bab";
        // image: {}
        // name_option: "Tamano";
        // price: "3000";
        // type: 1;
        // type_option: 1;

        console.log(data.images);
        const imagesFile = [];
        data.images.forEach((fileList) => {
            Array.from(fileList).forEach((image) => {
                imagesFile.push({ imageFile: image, folder: "articles", fileName: data.name });
            });
        });

        console.log(imagesFile);
        const imagesUrl = await uploadImages(imagesFile);
        console.log(imagesUrl);

        // const imagesUrlArray = [];
        // imagesUrl.forEach((image) => {
        //     imagesUrlArray.push(image.url);
        // });
        // console.log(imagesUrlArray);
        const resImages = await usecreateArticleImages(data.id, imagesUrl);
        console.log(resImages);

        const res = await useCreateArticle(data);
        console.log(res);
        console.log("Creado");

        console.log(data.specs);

        // otherImages;

        const resSpecs = await useCreateArticleSpecs(data.id, data.specs);
        console.log(resSpecs);

        const resHighlightedParagraphs = await useCreateArticleHighlightedParagraphs(data.id, data.highlighted_paragraphs);
        console.log(resHighlightedParagraphs);

        if (resGeneralCategories && resBoxContents && resOptions && resImages && res && resSpecs && resHighlightedParagraphs) {
            toast.success("Articulo creado correctamente", {
                id: loadingToast,
            });
            router.replace(`/admin/articulos/${data.id}`);
        } else {
            toast.error("Error al crear articulo", {
                id: loadingToast,
            });
        }
    };

    // useEffect(() => {
    //     console.log(errors);
    // }, [errors]);

    const edit = async (data) => {
        console.log(data);

        console.log(otherImages);

        console.log(data.images);

        // return;
        const loadingToast = toast.loading("Actualizando oferta...");
        if (typeof data.main_image == "object") {
            const resDeleteIMages = await deleteImages([article.main_image]);
            const resImage = await uploadImage(data.main_image, "articles", data.name);
            data.main_image = resImage[0].ufsUrl;
        }
        const res = await useUpdateArticle(data);
        // await useUpdateArticleGeneralCategories();
        console.log(res);
        console.log("Articulo actualizado");

        console.log(generalCategoriesArticle);
        console.log(data.general_categories);

        const { dataAgregar: dataAgregarGeneralCategories, dataBorrar: dataBorrarGeneralCategories } = getDataSelectMultiForAddAndDelete2(
            generalCategoriesArticle,
            data.general_categories,
            "id",
            "value"
        );

        let resGeneralCategoriesAdd = true;
        if (dataAgregarGeneralCategories.length > 0)
            resGeneralCategoriesAdd = await useCreateArticleGeneralCategories(article.id, dataAgregarGeneralCategories);
        let resGeneralCategoriesRemove = true;
        console.log(dataBorrarGeneralCategories);
        if (dataBorrarGeneralCategories.length > 0)
            resGeneralCategoriesRemove = await useDeleteArticleGeneralCategory(article.id, dataBorrarGeneralCategories);
        // console.log(dataAgregarGeneralCategories);
        // console.log(dataBorrarGeneralCategories);

        console.log(dataArticleBoxContents);
        console.log(data.box_content);

        const { dataAgregar: dataAgregarBoxContent, dataBorrar: dataBorrarBoxContent } = getDataSelectMultiForAddAndDelete2(
            dataArticleBoxContents,
            data.box_content ?? [],
            "id",
            "value"
        );

        let resBoxContentAdd = true;
        if (dataAgregarBoxContent.length > 0) resBoxContentAdd = await useCreateArticleBoxContents(article.id, dataAgregarBoxContent);
        let resBoxContentRemove = true;
        if (dataBorrarBoxContent.length > 0) resBoxContentRemove = await useDeleteArticleBoxContent(article.id, dataBorrarBoxContent);

        console.log(dataAgregarBoxContent);
        console.log(dataBorrarBoxContent);

        console.log(otherImages);
        console.log(data.images);

        const {
            imagesAgregar: dataAgregarImages,
            imagesBorrar: dataBorrarImages,
            imagesUpdate: dataUpdateImages,
        } = getDataSelectMultiForAddAndDeleteImages(otherImages, data.images || [], "id", "id");

        let resImagesAdd = true;
        let resImagesDelete = true;
        let resImagesUpdated = true;
        if (dataAgregarImages.length > 0) {
            const imagesFile = [];
            dataAgregarImages.forEach((image) => {
                imagesFile.push({ imageFile: image.image, folder: "articles", fileName: data.name });
            });
            const imagesUrl = await uploadImages(imagesFile);
            resImagesAdd = await usecreateArticleImages(idArticle, imagesUrl);
        }
        if (dataBorrarImages.length > 0) resImagesDelete = await useDeleteArticleImages(dataBorrarImages);

        if (dataUpdateImages.length > 0) {
            const imagesForDelete = dataUpdateImages.map((image) => image.imageUrl);
            const resDeleteIMages = await deleteImages(imagesForDelete);

            const imagesFile = [];
            dataUpdateImages.forEach((image) => {
                imagesFile.push({ imageFile: image.image, folder: "articles", fileName: data.name, id: image.id });
            });
            const imagesUrl = await uploadImages(imagesFile);

            const updated = dataUpdateImages.map((item, index) => ({
                ...item,
                imageUrl: imagesUrl[index]?.ufsUrl ?? "",
            }));

            resImagesUpdated = await useUpdateArticleImage(updated);
        }

        // console.log(dataAgregarImages);
        // console.log(dataBorrarImages);
        // console.log(dataUpdateImages);

        const { optionsAdd, optionsDelete, optionsUpdate } = getDataForAddDeleteAndUpdateOptions(optionsArticle, data.options ?? [], "id", "id");
        let resOptionsAdd = true;
        let resOptionsDelete = true;
        let resOptionsUpdate = true;

        if (optionsAdd.length > 0) {
            console.log(optionsAdd);
            const optionsImagesFile = [];
            optionsAdd.forEach((option) => {
                if (Object.keys(option.image).length > 0)
                    optionsImagesFile.push({ imageFile: option.image, folder: "articles/options", fileName: data.name });
            });
            // TODO: TRABAJANDO AQUI
            const optionsImagesUrl = await uploadImages(optionsImagesFile);
            optionsImagesUrl.forEach((imageUrl, index) => {
                optionsAdd[index].imageUrl = imageUrl.ufsUrl;
            });
            console.log(optionsAdd);
            resOptionsAdd = await useCreateArticleOption(idArticle, optionsAdd);
        }
        if (optionsDelete.length > 0) {
            const imagesUrlToDelete = optionsDelete.map((option) => option.image);
            const resDeleteIMages = await deleteImages(imagesUrlToDelete);
            resOptionsDelete = await useDeleteArticleOption(optionsDelete);
        }
        if (optionsUpdate.length > 0) {
            const imagesUrlToDelete = optionsDelete.map((option) => option.image);
            const resDeleteIMages = await deleteImages(imagesUrlToDelete);

            const optionsImagesFile = [];
            optionsUpdate.forEach((option) => {
                if (option.image) optionsImagesFile.push({ imageFile: option.image, folder: "articles/options", fileName: data.name });
            });

            console.log(optionsImagesFile);
            const optionsImagesUrl = await uploadImages(optionsImagesFile);
            console.log(optionsImagesUrl);
            optionsImagesUrl.forEach((imageUrl, index) => {
                optionsUpdate[index].image = imageUrl.ufsUrl;
            });
            const optionsUpdated = optionsUpdate.map((item) => ({
                ...item,
                image: item.image == null ? item.image_url : item.image,
            }));
            // id, id_value, image, price, quantity, color;
            console.log(optionsUpdate);
            resOptionsUpdate = await useUpdateArticleOption(optionsUpdated);
            // console.log(optionsUpdate);
            // console.log(optionsImagesUrl);
        }

        const { specsAdd, specsDelete, specsUpdate } = getDataForAddDeleteAndUpdateSpecs(articleSpecs, data.specs || [], "id", "id");

        let resSpecsAdded = true;
        let resSpecsDeleted = true;
        let resSpecsUpdated = true;
        if (specsAdd.length > 0) resSpecsAdded = await useCreateArticleSpecs(data.id, specsAdd);
        if (specsDelete.length > 0) resSpecsDeleted = await useDeleteArticleSpec(specsDelete);
        if (specsUpdate.length > 0) resSpecsUpdated = await useUpdateArticleSpec2(specsUpdate);

        const {
            dataAdd: paragraphsAdd,
            dataUpdate: paragraphsUpdate,
            dataDelete: paragraphsDelete,
        } = getDataForAddDeleteAndUpdate({
            oldData: articleHighlightedParagraphs,
            newData: data.highlighted_paragraphs || [],
            keysToValidate: ["paragraph"],
        });

        let resParagraphsAdded = true;
        let resParagraphsDeleted = true;
        let resParagraphsUpdated = true;
        if (paragraphsAdd.length > 0) resParagraphsAdded = await useCreateArticleHighlightedParagraphs(data.id, paragraphsAdd);
        if (paragraphsUpdate.length > 0) resParagraphsUpdated = await useUpdateArticleHighlightedParagraphs(paragraphsUpdate);
        if (paragraphsDelete.length > 0) resParagraphsDeleted = await useDeleteArticleHighlightedParagraphs(paragraphsDelete);

        if (
            res &&
            resGeneralCategoriesAdd &&
            resGeneralCategoriesRemove &&
            resBoxContentAdd &&
            resBoxContentRemove &&
            resImagesAdd &&
            resImagesDelete &&
            resImagesUpdated &&
            resOptionsAdd &&
            resOptionsDelete &&
            resOptionsUpdate &&
            resSpecsAdded &&
            resSpecsDeleted &&
            resSpecsUpdated &&
            resParagraphsAdded &&
            resParagraphsUpdated &&
            resParagraphsDeleted
        ) {
            toast.success("Articulo actualizado correctamente", {
                id: loadingToast,
            });
            // router.replace(`/admin/articulos/${data.id}`);
        } else {
            toast.error("Error al actualizar articulo", {
                id: loadingToast,
            });
        }
    };

    const onSubmit = async (data) => {
        console.log(wanCreate);
        console.log(data);
        // return;
        if (wanCreate) create(data);
        else edit(data);
    };

    // useEffect(() => {
    //     console.log(watch);
    // }, [watch("general_categories")]);

    useEffect(() => {
        console.log(categorySelected);
    }, [categorySelected]);

    const handleClickAddOption = () => {
        const optionSelected = JSON.parse(watch("id_option_selected"));
        console.log(optionSelected);
        // const idOptionSelected = watch("id_option_selected");
        const option = watch("id_option_selected").split("||+||");
        console.log(option);
        const idOption = option[0];
        const nameOption = option[1];
        const typeOption = Number(option[2]);

        // console.log(typeOption);

        optionsAppend({
            id_option: optionSelected.id,
            name_option: optionSelected.name,
            type_option: optionSelected.type,
            price: 0,
            image: {},
            type: 1,
            require_color: optionSelected.require_color,
            require_image: optionSelected.require_image,
            require_quantity: optionSelected.require_quantity,
            require_price: optionSelected.require_price,
            // id_value_option: "",
            id_value: "",
            color: "",
            quantity: watch("quantity") || 0,
        });
    };

    const getOptions = () => {
        const categoriesForSelect = [];
        generalCategories.forEach((category) => {
            categoriesForSelect.push({ value: category.id, label: category.name });
        });
        return categoriesForSelect;
    };

    const getBoxContent = () => {
        const articlesForSelect = [];
        articles.forEach((article) => {
            articlesForSelect.push({ value: article.id, label: article.name });
        });
        return articlesForSelect;
    };

    const { data: currencies, isLoading: isLoadingCurrencies } = useGetCurrencies();

    useEffect(() => {
        console.log(options);
    }, [options]);

    if (isLoadingArticle) return <div>Cargando...</div>;

    return (
        <div className="m-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-center">Datos del articulo</p>
                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="name"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Nombre del articulo"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="description"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-40 min-h-40 max-h-40"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripción del articulo"
                />
                <InputFile
                    imgLink={article.main_image}
                    control={control}
                    errors={errors}
                    name="main_image"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Imagen del articulo"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="id_direct_category"
                    items={directCategories}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Categoria directa"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="id_indirect_category"
                    items={indirectCategories}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Categoria indirecta"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="id_brand"
                    items={[{ id: "all", name: "Todos" }, ...brands]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Marca"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="id_model"
                    items={modelsWidthFilter}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Modelo"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="id_currency"
                    items={currencies}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Moneda del articulo"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="number"
                    name="price"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder="12,000"
                    label="Precio del articulo"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="status"
                    items={[
                        { id: 1, name: "Activo" },
                        { id: 0, name: "Inactivo" },
                    ]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Estado"
                />
                <p className="text-center">Imagenes</p>
                <div className="flex flex-wrap justify-between">
                    {imagesFields.map((field, index) => (
                        <div key={field.id} style={{ width: "48%" }}>
                            <InputFile
                                imgLink={field.imageUrl}
                                control={control}
                                errors={errors}
                                name={`images.${index}.image`}
                                inputClassName="border-2 border-gray-300 rounded-md p-2"
                                errorClassName="text-red-700"
                                placeholder=""
                                label={`Imagen - #${index + 2}`}
                                width="100%"
                            />
                            <p className="text-red-700" onClick={() => imageRemove(index)}>
                                Borrar imagen
                            </p>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={() => imageAppend({ image: {}, id: "", imageUrl: "" })}>
                    Agregar Nueva imagen
                </button>
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="general_categories"
                    items={generalCategories ? generalCategories : []}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Categorias generales"
                    control={control}
                    isMulti={true}
                />
                <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="view"
                    items={[
                        { id: 1, name: "Mostrar" },
                        { id: 0, name: "No mostrar" },
                    ]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Vista"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="number"
                    name="quantity"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder="12,000"
                    label="cantidad disponible"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="id_payment_method"
                    items={paymentMethods}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Metodo de pago"
                />
                <Select
                    register={register}
                    errors={errors}
                    type="text"
                    name="box_content"
                    items={articlesForBoxContent ? articlesForBoxContent : []}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Contenido de la caja"
                    control={control}
                    isMulti={true}
                />
                {/* <Select
                        register={register}
                        errors={errors}
                        name="id_payment_method"
                        items={paymentMethods}
                        type="text"
                        selectClassName=""
                        errorClassName="text-red-700"
                        optionNameForShow="name"
                    /> */}
                {/* <div>
                    <label htmlFor="">Nombre Articulo: </label>
                    <Input
                        register={register}
                        errors={errors}
                        type="text"
                        name="name"
                        inputClassName=""
                        errorClassName="text-red-700"
                        placeholder="Nombre del producto..."
                    />
                </div> */}
                <br />
                {/* <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="description"
                    inputClassName=""
                    errorClassName="text-red-700"
                    placeholder="Descripcion categoria..."
                /> */}
                <br />
                {/* <div>
                    <p>Imagen principal:</p>
                    <input type="file" {...register("main_image")} onChange={() => setSchemaIsRequired(true)} />
                    {errors.main_image?.message && <p className="text-red-700">{errors.main_image?.message}</p>}
                </div> */}
                <br />
                {/* <div>
                    <p>categoria directa</p>
                    <Select
                        register={register}
                        errors={errors}
                        name="id_direct_category"
                        items={directCategories}
                        type="text"
                        selectClassName=""
                        errorClassName="text-red-700"
                        optionNameForShow="name"
                    />
                </div> */}
                <br />
                {/* <div>
                    <p>categoria indirecta</p>
                    <Select
                        register={register}
                        errors={errors}
                        name="id_indirect_category"
                        items={indirectCategories}
                        type="text"
                        selectClassName=""
                        errorClassName="text-red-700"
                        optionNameForShow="name"
                    />
                </div> */}
                <br />
                {/* <div>
                    <p>Modelo</p>
                    <Select
                        register={register}
                        errors={errors}
                        name="id_model"
                        items={models}
                        type="text"
                        selectClassName=""
                        errorClassName="text-red-700"
                        optionNameForShow="name"
                    />
                </div> */}
                <br />
                {/* <div>
                    <p>Precio del producto</p>
                    <input
                        type="text"
                        {...register("price", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}
                        placeholder="precio articulo..."
                    />
                </div> */}
                {/* <div>
                    <p>Estado</p>
                    <Select
                        register={register}
                        errors={errors}
                        name="status"
                        items={[
                            { id: 1, name: "Activo" },
                            { id: 0, name: "Inactivo" },
                        ]}
                        type="number"
                        selectClassName=""
                        errorClassName="text-red-700"
                        optionNameForShow="name"
                    />
                </div> */}
                <Divider h={2.5} />
                <p className="text-center">Datos adicionales del articulo</p>
                {/* //! esto tiene que funcionar dinamicamente para todos los filtros */}
                {/* {imagesFields.map((field, index) => (
                    <input key={field.id} {...register(`images.${index}`)} type="file" multiple />
                ))} */}
                {/* <button type="button" onClick={() => imageAppend({ image: {} })}>
                    append image
                </button> */}
                <br />
                {/* <div> */}
                {/* <p>categorias generales</p> */}
                {/* <Controller
                        name="general_categories"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <SelectRact
                                {...field}
                                options={getOptions()}
                                isMulti
                                placeholder="Selecciona tus frutas favoritas"
                                // onChange={handleChangeGeneralCategories}
                                // onChange={(selectedOptions) => field.onChange(selectedOptions ? selectedOptions.map((option) => option.value) : [])}
                            />
                        )}
                    /> */}
                {/* {errors.general_categories?.message && <p className="text-red-700">{errors.general_categories?.message}</p>} */}
                {/* </div> */}
                <br />
                {/* <div>
                    <p>Vista</p>
                    <select {...register("view", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}>
                        <option value={1}>Mostrar</option>
                        <option value={0}>No mostrar</option>
                    </select>
                    {errors.view?.message && <p className="text-red-700">{errors.view?.message}</p>}
                </div> */}
                <br />
                {/* <div>
                    <p>Cantidad disponible</p>
                    <input
                        {...register("quantity", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}
                        placeholder="cantidad articulo..."
                    />
                    {errors.quantity?.message && <p className="text-red-700">{errors.quantity?.message}</p>}
                    <button type="button">Dismonuir</button>
                    <button type="button">Aumentar</button>
                </div> */}
                <br />
                {/* <div>
                    <p>metodo de pago</p>
                    <Select
                        register={register}
                        errors={errors}
                        name="id_payment_method"
                        items={paymentMethods}
                        type="text"
                        selectClassName=""
                        errorClassName="text-red-700"
                        optionNameForShow="name"
                    />
                </div> */}
                <br />
                {/* //!todo: */}
                {/* <Select
                    register={register}
                    errors={errors}
                    name="box_context"
                    items={paymentMethods}
                    type="text"
                    selectClassName=""
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                /> */}
                {/* <div>
                    contenido caja
                    <Controller
                        name="box_content"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <SelectRact
                                {...field}
                                options={getBoxContent()}
                                isMulti
                                placeholder="Selecciona tus frutas favoritas"
                                // onChange={handleChangeGeneralCategories}
                                // onChange={(selectedOptions) => field.onChange(selectedOptions ? selectedOptions.map((option) => option.value) : [])}
                            />
                        )}
                    />
                    <input type="text" name="" id="" />
                    <button>Agregar contenido</button>
                    <button>eliminar contenido</button>
                </div> */}
                <h1 className="text-center">Opciones</h1>
                <select {...register("id_option_selected")}>
                    {options.map((option) => (
                        // <option key={option.id} value={`${option.id}||+||${option.name}||+||${option.type}`}>
                        <option key={option.id} value={JSON.stringify(option)}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <br />
                <button type="button" onClick={handleClickAddOption}>
                    Agregar opcion
                </button>
                <br />
                <hr />
                <br />
                {optionsFields.map((field, index) => (
                    <div key={field.id}>
                        <p>{watch("options")?.[index]?.name_option}</p>

                        <Select
                            register={register}
                            errors={errors}
                            type="text"
                            // name={`options.${index}.id_value_option`}
                            name={`options.${index}.id_value`}
                            items={valuesOptions}
                            selectClassName="border-2 border-gray-300 rounded-md p-2"
                            errorClassName="text-red-700"
                            optionNameForShow="value"
                            label={`Valor  ${index + 1} de la opcion ${watch("options")?.[index]?.name_option}`}
                        />

                        {/* <select {...register(`options.${index}.id_value_option`)}>
                            {valuesOptions.map((valueOption) => (
                                <option key={valueOption.id} value={valueOption.id}>
                                    {valueOption.value}
                                </option>
                            ))}
                        </select> */}
                        <div className="flex flex-wrap justify-between">
                            {watch("options")?.[index]?.require_price == 1 && (
                                <Input
                                    register={register}
                                    errors={errors}
                                    type="number"
                                    name={`options.${index}.price`}
                                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                                    errorClassName="text-red-700"
                                    placeholder="12,000"
                                    label="Precio"
                                    width="48%"
                                />
                            )}
                            {/* <Input
                                register={register}
                                errors={errors}
                                type="number"
                                name={`options.${index}.price`}
                                inputClassName="border-2 border-gray-300 rounded-md p-2"
                                errorClassName="text-red-700"
                                placeholder="12,000"
                                label="Precio"
                                width="48%"
                            /> */}

                            {watch("options")?.[index]?.require_quantity == 1 && (
                                <Input
                                    register={register}
                                    errors={errors}
                                    type="number"
                                    name={`options.${index}.quantity`}
                                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                                    errorClassName="text-red-700"
                                    placeholder="12,000"
                                    label="Cantidad disponible"
                                    width="48%"
                                />
                            )}
                            {/* <input {...register(`options.${index}.price`)} /> */}
                            {/* <input {...register(`options.${index}.quantity`)} /> */}
                        </div>

                        <div className="flex flex-wrap justify-between">
                            {/* {(watch("options")?.[index]?.type_option == 2 || watch("options")?.[index]?.type_option == 3) && (
                                // <input type="file" {...register(`options.${index}.image`)} />
                                <InputFile
                                    imgLink={watch("options")?.[index]?.image_url}
                                    control={control}
                                    errors={errors}
                                    name={`options.${index}.image`}
                                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-64"
                                    errorClassName="text-red-700"
                                    placeholder=""
                                    label="Imagen de la opcion"
                                    width="48%"
                                />
                            )} */}
                            {watch("options")?.[index]?.require_image == 1 && (
                                <InputFile
                                    imgLink={watch("options")?.[index]?.image_url}
                                    control={control}
                                    errors={errors}
                                    name={`options.${index}.image`}
                                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-64"
                                    errorClassName="text-red-700"
                                    placeholder=""
                                    label="Imagen de la opcion"
                                    width="48%"
                                />
                            )}

                            {/* {watch("options")?.[index]?.type_option == 3 && (
                                // <input type="color" {...register(`options.${index}.color`)} />
                                <Input
                                    register={register}
                                    errors={errors}
                                    type="color"
                                    name={`options.${index}.color`}
                                    inputClassName="border-2 border-gray-300 rounded-md p-2 w-full h-12"
                                    errorClassName="text-red-700"
                                    placeholder=""
                                    label="Color"
                                    width="48%"
                                />
                            )} */}
                            {watch("options")?.[index]?.require_color == 1 && (
                                <Input
                                    register={register}
                                    errors={errors}
                                    type="color"
                                    name={`options.${index}.color`}
                                    inputClassName="border-2 border-gray-300 rounded-md p-2 w-full h-12"
                                    errorClassName="text-red-700"
                                    placeholder=""
                                    label="Color"
                                    width="48%"
                                />
                            )}
                            <p onClick={() => optionRemove(index)} className="text-red-600">
                                Borrar
                            </p>
                        </div>

                        <hr />
                    </div>
                ))}
                {/* if (options.some(option => option.id === 1)) {
                    console.log("Existe una opción con id 1");
                } */}
                <br />
                <button type="button" onClick={handleClickAddOption}>
                    Agregar opcion
                </button>
                <br />
                <br />
                <br />
                <br />
                {/* {measurementsFields.map((field, index) => (
                    <div key={field.id}>
                        <select {...register(`measurements.${index}.key`)}>
                            {options.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        <select {...register(`measurements.${index}.value`)}>
                            {valuesOptions.map((valueOption) => (
                                <option key={valueOption.id} value={valueOption.id}>
                                    {valueOption.value}
                                </option>
                            ))}
                        </select>
                        <input type="checkbox" {...register(`measurements.${index}.type`)} />
                    </div>
                ))}
                <button type="button" onClick={() => measurementsAppend({ key: "", value: "", type: false })}>
                    append
                </button> */}
                <br />
                <br />
                <br />
                <br />
                {fields.map((field, index) => (
                    <div className="flex" key={field.id}>
                        <div className="flex w-1/2 gap-2">
                            <Select
                                register={register}
                                errors={errors}
                                type="text"
                                name={`specs.${index}.id_option`}
                                items={options}
                                selectClassName="border-2 border-gray-300 rounded-md p-2"
                                errorClassName="text-red-700"
                                optionKeyValue="id"
                                optionNameForShow="name"
                                label={<span className="text-xs">Especificacion {index + 1}</span>}
                                width="50%"
                                itemSelected={watch("specs")?.[index]?.id_option}
                            />
                            {/* <select {...register(`specs.${index}.key`)}>
                            {options.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select> */}

                            <Select
                                register={register}
                                errors={errors}
                                type="text"
                                name={`specs.${index}.id_value`}
                                items={valuesOptions}
                                selectClassName="border-2 border-gray-300 rounded-md p-2"
                                errorClassName="text-red-700"
                                optionKeyValue="id"
                                optionNameForShow="value"
                                // label={`Valor ${index + 1}`}
                                label={<span className="text-xs">Valor {index + 1}</span>}
                                width="50%"
                                itemSelected={watch("specs")?.[index]?.id_value}
                            />
                            {/* <select {...register(`specs.${index}.value`)}>
                            {valuesOptions.map((valueOption) => (
                                <option key={valueOption.id} value={valueOption.id}>
                                    {valueOption.value}
                                </option>
                            ))}
                        </select> */}
                        </div>
                        <div className="flex w-1/2">
                            <Input
                                register={register}
                                errors={errors}
                                type="checkbox"
                                name={`specs.${index}.is_spec`}
                                inputClassName="border-2 border-gray-300 rounded-md p-2 w-full"
                                errorClassName="text-red-700"
                                placeholder=""
                                label={<p className="text-xs text-center w-full">Epecificacion</p>}
                                // width="48%"
                            />
                            {/* <input type="checkbox" {...register(`specs.${index}.is_spec`)} /> */}
                            <Input
                                register={register}
                                errors={errors}
                                type="checkbox"
                                name={`specs.${index}.is_measurement`}
                                inputClassName="border-2 border-gray-300 rounded-md p-2 w-full"
                                errorClassName="text-red-700"
                                placeholder=""
                                label={<p className="text-xs text-center w-full">Medida</p>}
                                // width="48%"
                            />
                            {/* <input type="checkbox" {...register(`specs.${index}.is_measurement`)} /> */}
                            <Input
                                register={register}
                                errors={errors}
                                type="checkbox"
                                name={`specs.${index}.is_highlight`}
                                inputClassName="border-2 border-gray-300 rounded-md p-2 w-full"
                                errorClassName="text-red-700"
                                placeholder=""
                                label={<p className="text-xs text-center">Destacado</p>}
                                // width="48%"
                            />
                            <p onClick={() => removeSpec(index)} className="text-red-700">
                                Borrar
                            </p>
                            {/* <input type="checkbox" {...register(`specs.${index}.is_highlight`)} /> */}
                        </div>
                    </div>
                ))}
                <button type="button" onClick={() => append({ id: 0, id_option: "", id_value: "", is_spec: 0, is_measurement: 0, is_highlight: 0 })}>
                    append
                </button>
                <br />
                <div className="flex flex-wrap justify-between">
                    {highlightedParagraphsfields.map((field, index) => (
                        <Input
                            key={field.id}
                            register={register}
                            errors={errors}
                            type="textarea"
                            name={`highlighted_paragraphs.${index}.paragraph`}
                            inputClassName="border-2 border-gray-300 rounded-md p-2 h-40 min-h-40 max-h-40"
                            errorClassName="text-red-700"
                            placeholder=""
                            label={`Parrafo destacado ${index + 1}`}
                            width="48%"
                        />
                    ))}
                </div>
                <button type="button" onClick={() => highlightedParagraphsAppend({ id: 0, paragraph: "" })}>
                    append
                </button>
                <button type="button" onClick={() => highlightedParagraphsRemove(highlightedParagraphsfields.length - 1)}>
                    borrar
                </button>
                <br />
                <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="additional_details"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-40 min-h-40 max-h-40"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Detalles adicionales"
                />
                {/* <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="additional_details"
                    inputClassName=""
                    errorClassName="text-red-700"
                    placeholder="Descripcion categoria..."
                /> */}
                <br />
                <br />
                {/* <button>Crear categoria directa</button> */}
                {/* <button className="px-4 py-2 rounded bg-gray-200 fixed bottom-4 left-1/2 -translate-x-1/2">
                    {idArticle > 0 ? "Actualizar" : "Crear"} Articulo
                </button> */}
                <ButtonGray>{idArticle > 0 ? "Actualizar" : "Crear"} Articulo</ButtonGray>
            </form>
        </div>
    );
};

export default page;
