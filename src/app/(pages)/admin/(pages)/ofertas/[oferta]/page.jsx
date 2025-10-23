"use client";

// Sonner
import { Toaster, toast } from "sonner";

import createCategorySchema from "@/app/schemas/category.schema";
import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";
// import { useUploadThing } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import useRequestCategories from "@/app/hooks/request/categories/useRequestCategories";
import useUploadThing from "@/app/hooks/upload-thing/useUploadThing";
import { useParams, useSearchParams } from "next/navigation";
import createDepartmentSchema from "@/app/schemas/departments.schema";
import {
    useCreateDepartment,
    useCreateDirectCategoryDepartment,
    useGetDirectsCategories,
    useGetIndirectsCategories,
    useGetGeneralCategories,
} from "@/app/hooks/request/categories/requestsCategories";
// import { useParams } from "next/navigation";

import SelectRact from "react-select";
// import Input from "@/app/components/app/Input";

// Hooks
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import createOfferSchema from "@/app/schemas/offers.schema";
import { useGetArticles } from "@/app/hooks/request/articles/requestsArticles";
import {
    useCreateOffer,
    useCreateOfferCategory,
    useCreateOfferArticle,
    useGetOffer,
    useUpdateOffer,
    useDeleteOfferCategory,
    useDeleteOfferArticle,
} from "@/app/hooks/request/offers/requestsOffers";
import { getDataSelectMultiForAddAndDelete, getDefaultsValuesForSelectMulti } from "@/app/hooks/app/app";
import InputFile from "@/app/components/inputs/InputFile";
const page = () => {
    const { oferta } = useParams();

    console.log(oferta);

    const wanCreate = oferta == 0 ? true : false;

    console.log(wanCreate);

    const { data: offer, isLoading: isLoadingOffer } = useGetOffer(oferta);

    useEffect(() => {
        console.log(offer);
    }, [offer]);

    // const { data, isLoading } = useGetDirectsCategories();

    // useEffect(() => {
    //     const ff = data?.map((directCategory) => {
    //         return {
    //             value: directCategory.id,
    //             label: directCategory.name,
    //         };
    //     });
    //     console.log(ff);
    // }, [data]);

    // useEffect(() => {
    //     console.log(data);
    //     console.log(wanCreate);
    //     console.log(idDepartamento);
    // }, [idDepartamento]);

    // const searchParams = useSearchParams();

    // Obtener un parámetro específico
    // const tipo = searchParams.get("tipo");

    // const [type, setType] = useState(0);

    // useEffect(() => {
    //     if (tipo == "departamentos") setType(4);
    // }, []);

    // console.log();

    const { uploadImage, deleteImages, deleteImage } = useUploadThing();
    // const { useCreateCategory, useUpdateCategory } = useRequestCategories();
    // const { categorySelected, usingCategory } = zusAdminCategories();

    // const wanCreate = Object.keys(categorySelected).length == 0 ? true : false;

    const [schemaIsRequired, setSchemaIsRequired] = useState(wanCreate);

    const offerSchema = createOfferSchema(schemaIsRequired);
    const defaultValues = wanCreate
        ? {}
        : {
              offer,
          };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        reset,
    } = useForm({
        // defaultValues: { },
        resolver: zodResolver(offerSchema),
    });

    const { data: directsCategories, isLoading: isLoadingDirectsCategories } = useGetDirectsCategories();
    const { data: indirectsCategories, isLoading: isLoadingIndirectsCategories } = useGetIndirectsCategories();
    const { data: generalCategories, isLoading: isLoadingGeneralCategories } = useGetGeneralCategories();
    const { data: articles, isLoading: isLoadingArticles } = useGetArticles();

    // function getDefaultsSelected(itemsSelected, allItems) {
    //     return allItems
    //         .filter(item => itemsSelected.includes(item.id))
    //         .map(item => ({
    //             value: item.id,
    //             label: item.name,
    //         }));
    // }

    useEffect(() => {
        if (
            wanCreate ||
            isLoadingOffer ||
            isLoadingDirectsCategories ||
            isLoadingIndirectsCategories ||
            isLoadingGeneralCategories ||
            isLoadingArticles
        )
            return;
        if (offer) {
            const formattedOffer = {
                ...offer,
                date_start: offer.date_start?.slice(0, 10),
                date_end: offer.date_end?.slice(0, 10),
            };

            const directCategoriesDefaultValues = getDefaultsValuesForSelectMulti(offer.direct_categories, directsCategories, "id_category");
            const indirectCategoriesDefaultValues = getDefaultsValuesForSelectMulti(offer.indirect_categories, indirectsCategories, "id_category");
            const generalCategoriesDefaultValues = getDefaultsValuesForSelectMulti(offer.general_categories, generalCategories, "id_category");
            const articlesDefaultValues = getDefaultsValuesForSelectMulti(offer.articles, articles, "id_article");

            reset({
                ...formattedOffer,
                directs_categories: directCategoriesDefaultValues,
                indirects_categories: indirectCategoriesDefaultValues,
                general_categories: generalCategoriesDefaultValues,
                articles: articlesDefaultValues,
            });
        }
    }, [offer, directsCategories]);

    const create = async (data) => {
        const loadingToast = toast.loading("Creando oferta...");

        if (typeof data.image == "object" && data.image) {
            const resImage = await uploadImage(data.image, "offers", data.name);
            const imageUrl = resImage[0].ufsUrl;
            console.log(imageUrl);
            data.image = imageUrl;
        }

        const { data: resData, status } = await useCreateOffer(data);
        console.log(resData);
        console.log(status);

        const resOfferDirectsCategories = await useCreateOfferCategory(
            resData.id,
            1,
            resData.percent_discount,
            resData.status,
            data.directs_categories
        );
        console.log(resOfferDirectsCategories);

        const resOfferIndirectsCategories = await useCreateOfferCategory(
            resData.id,
            2,
            resData.percent_discount,
            resData.status,
            data.indirects_categories
        );
        console.log(resOfferIndirectsCategories);

        const resOfferGeneralCategories = await useCreateOfferCategory(
            resData.id,
            3,
            resData.percent_discount,
            resData.status,
            data.general_categories
        );
        console.log(resOfferGeneralCategories);

        const resOfferArticles = await useCreateOfferArticle(resData.id, resData.percent_discount, 0, resData.status, data.articles);
        console.log(resOfferArticles);

        if (resData == 201 && resOfferDirectsCategories && resOfferIndirectsCategories && resOfferGeneralCategories && resOfferArticles) {
            toast.success("Oferta creada correctamente", {
                id: loadingToast,
            });
        } else {
            toast.error("Error al crear la oferta", {
                id: loadingToast,
            });
        }
    };
    const edit = async (data) => {
        const loadingToast = toast.loading("Actualizando oferta...");
        // if (typeof data.image == "object") {
        //     const resDeleteIMages = await deleteImages([offer.image]);
        //     const resImage = await uploadImage(data.image, "folder", "nombre.png");
        //     data.image = resImage[0].url;
        // }

        if (typeof data.image == "object" && data.image) {
            const resImage = await uploadImage(data.image, "offers", data.name);
            const imageUrl = resImage[0].ufsUrl;
            data.image = imageUrl;
        }

        const resOffer = await useUpdateOffer(data);

        const { dataAgregar: dataAgregarDirectsCategories, dataBorrar: dataBorrarDirectsCategories } = getDataSelectMultiForAddAndDelete(
            offer.direct_categories,
            data.directs_categories,
            "id_category",
            "value"
        );
        let resOfferDirectsCategoriesAdd = true;
        if (dataAgregarDirectsCategories.length > 0)
            resOfferDirectsCategoriesAdd = await useCreateOfferCategory(data.id, 1, data.percent_discount, data.status, dataAgregarDirectsCategories);
        let resOfferDirectsCategoriesDelete = true;
        if (dataBorrarDirectsCategories.length > 0)
            resOfferDirectsCategoriesDelete = await useDeleteOfferCategory(data.id, dataBorrarDirectsCategories);

        const { dataAgregar: dataAgregarIndirectsCategories, dataBorrar: dataBorrarIndirectsCategories } = getDataSelectMultiForAddAndDelete(
            offer.indirect_categories,
            data.indirects_categories,
            "id_category",
            "value"
        );
        let resOfferIndirectsCategoriesAdd = true;
        if (dataAgregarIndirectsCategories.length > 0)
            resOfferIndirectsCategoriesAdd = await useCreateOfferCategory(
                data.id,
                2,
                data.percent_discount,
                data.status,
                dataAgregarIndirectsCategories
            );
        let resOfferIndirectsCategoriesDelete = true;
        if (dataBorrarIndirectsCategories.length > 0)
            resOfferIndirectsCategoriesDelete = await useDeleteOfferCategory(data.id, dataBorrarIndirectsCategories);

        const { dataAgregar: dataAgregarGeneralCategories, dataBorrar: dataBorrarGeneralCategories } = getDataSelectMultiForAddAndDelete(
            offer.general_categories,
            data.general_categories,
            "id_category",
            "value"
        );
        let resOfferGeneralCategoriesAdd = true;
        if (dataAgregarGeneralCategories.length > 0)
            resOfferGeneralCategoriesAdd = await useCreateOfferCategory(data.id, 3, data.percent_discount, data.status, dataAgregarGeneralCategories);

        let resOfferGeneralCategoriesDelete = true;
        if (dataBorrarGeneralCategories.length > 0)
            resOfferGeneralCategoriesDelete = await useDeleteOfferCategory(data.id, dataBorrarGeneralCategories);

        const { dataAgregar: dataAgregarArticles, dataBorrar: dataBorrarArticles } = getDataSelectMultiForAddAndDelete(
            offer.articles,
            data.articles,
            "id_article",
            "value"
        );
        let resOfferArticlesAdd = true;
        if (dataAgregarArticles.length > 0)
            resOfferArticlesAdd = await useCreateOfferArticle(data.id, data.percent_discount, 0, data.status, dataAgregarArticles);
        let resOfferArticlesDelete = true;
        if (dataBorrarArticles.length > 0) resOfferArticlesDelete = await useDeleteOfferArticle(data.id, dataBorrarArticles);

        if (
            resOffer &&
            resOfferDirectsCategoriesAdd &&
            resOfferDirectsCategoriesDelete &&
            resOfferIndirectsCategoriesAdd &&
            resOfferIndirectsCategoriesDelete &&
            resOfferGeneralCategoriesAdd &&
            resOfferGeneralCategoriesDelete &&
            resOfferArticlesAdd &&
            resOfferArticlesDelete
        ) {
            toast.success("Oferta actualizada correctamente", {
                id: loadingToast,
            });
        } else {
            toast.error("Error al actualizar oferta", {
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

    if (isLoadingOffer) return <p>Cargando...</p>;

    return (
        <div className="m-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="name"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Nombre de la oferta"
                />

                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="description"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-20 min-h-20 max-h-20"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripción de la oferta"
                />

                <Input
                    register={register}
                    errors={errors}
                    type="number"
                    name="percent_discount"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Porcentaje de descuento"
                />

                <div className="flex gap-2">
                    <Input
                        register={register}
                        errors={errors}
                        type="date"
                        name="date_start"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Fecha de inicio"
                        width="50%"
                    />

                    <Input
                        register={register}
                        errors={errors}
                        type="date"
                        name="date_end"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Fecha de fin"
                        width="50%"
                    />
                </div>

                <InputFile
                    imgLink={offer?.image}
                    control={control}
                    errors={errors}
                    name="image"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Imagen de la oferta"
                />

                <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="directs_categories"
                    items={directsCategories ? directsCategories : []}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Categorias directas"
                    control={control}
                    isMulti={true}
                />

                <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="indirects_categories"
                    items={indirectsCategories ? indirectsCategories : []}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Categorias indirectas"
                    control={control}
                    isMulti={true}
                />

                <Select
                    register={register}
                    errors={errors}
                    type="number"
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
                    name="articles"
                    items={articles ? articles : []}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Articulos"
                    control={control}
                    isMulti={true}
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

                {/* <input type="text" {...register("name")} placeholder="Nombre categoria..." />
                {errors.name?.message && <p className="text-red-700">{errors.name?.message}</p>}
                {errors.slug?.message && <p className="text-red-700">{errors.slug?.message}</p>}

                <input type="text" {...register("short_name")} placeholder="Nombre categoria..." />
                {errors.name?.message && <p className="text-red-700">{errors.name?.message}</p>}

                <textarea name="" id="" {...register("description")} placeholder="Descripcion categoria..."></textarea>
                {errors.description?.message && <p className="text-red-700">{errors.description?.message}</p>}
                <input type="color" {...register("color")} />
                {errors.color?.message && <p className="text-red-700">{errors.color?.message}</p>}
                <input type="file" {...register("image")} onChange={() => setSchemaIsRequired(true)} />
                {errors.image?.message && <p className="text-red-700">{errors.image?.message}</p>}

                <div>
                    <p>categorias generales</p>
                    <Controller
                        name="directs_categories"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <SelectRact
                                {...field}
                                options={data?.map((directCategory) => {
                                    return {
                                        value: directCategory.id,
                                        label: directCategory.name,
                                    };
                                })}
                                isMulti
                                placeholder="Selecciona tus frutas favoritas"
                                // onChange={handleChangeGeneralCategories}
                                // onChange={(selectedOptions) => field.onChange(selectedOptions ? selectedOptions.map((option) => option.value) : [])}
                            />
                        )}
                    />
                </div>

                <select
                    name=""
                    id=""
                    {...register("view", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}
                >
                    <option value={1}>Mostrar</option>
                    <option value={0}>No mostrar</option>
                </select>
                {errors.view?.message && <p className="text-red-700">{errors.view?.message}</p>} */}

                <br />
                <button>Crear departamento</button>
            </form>
        </div>
    );
};

export default page;
