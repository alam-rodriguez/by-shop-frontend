"use client";

import createCategorySchema from "@/app/schemas/category.schema";
import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";
// import { useUploadThing } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import useRequestCategories from "@/app/hooks/request/categories/useRequestCategories";
import useUploadThing from "@/app/hooks/upload-thing/useUploadThing";
import useRequestsGeneralCategoriesGroups from "@/app/hooks/request/categories/useRequestsGeneralCategoriesGroups";
import generalCategoryGroupSchema from "@/app/schemas/generalCategoryGroup.schema";

import SelectMultiple from "react-select";
import { useParams } from "next/navigation";
import {
    useDeleteGeneralCategoryGroupCategory,
    useGetGeneralCategoryGroupById,
} from "@/app/hooks/request/categories/requestsGeneralCategoriesGroups";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import { getDataSelectMultiForAddAndDelete, getDefaultsValuesForSelectMulti } from "@/app/hooks/app/app";

const page = () => {
    const { ["grupo-categoria-generales"]: idGeneralCategoryGroup } = useParams();

    const wantCreate = idGeneralCategoryGroup == 0 ? true : false;

    // return <></>;

    const {
        useGetGeneralCategoriesGroups,
        useCreateGeneralCategoryGroup,
        useUseUpdateGeneralCategoryGroup,
        useCreateGeneralCategoriesGroupsCategories,
    } = useRequestsGeneralCategoriesGroups();

    const { uploadImage, deleteImages, deleteImage } = useUploadThing();
    const { useCreateCategory, useUpdateCategory } = useRequestCategories();
    const { categorySelected, usingCategory, generalCategoryGroupSelected, generalCategories } = zusAdminCategories();

    // const wanCreate = Object.keys(generalCategoryGroupSelected).length == 0 ? true : false;

    const [schemaIsRequired, setSchemaIsRequired] = useState(wantCreate);

    // const categorySchema = createCategorySchema(schemaIsRequired);
    const defaultValues = wantCreate
        ? {
              // type: usingCategory,
          }
        : {
              ...generalCategoryGroupSelected,
          };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        reset,
        setValue,
    } = useForm({
        defaultValues,
        resolver: zodResolver(generalCategoryGroupSchema),
    });

    const { data: generalCategoryGroup, isLoading } = useGetGeneralCategoryGroupById(idGeneralCategoryGroup);

    useEffect(() => {
        if (isLoading || wantCreate) return;
        // if (isLoading || (!data && !data.id)) return;
        reset(generalCategoryGroup);
        const generalCategoriesDefaultValues = getDefaultsValuesForSelectMulti(generalCategoryGroup.categories, generalCategories, "id");
        setValue("general_categories", generalCategoriesDefaultValues);
    }, [generalCategoryGroup, generalCategories]);

    const { useGetGeneralCategories } = useRequestCategories();

    useEffect(() => {
        useGetGeneralCategories();
    }, []);

    // useEffect(() => {
    //     console.log(wanCreate);
    //     console.log(errors);
    // }, [errors]);

    const create = async (data) => {
        // const resImage = await uploadImage(data.image[0], "folder", "nombre.png");
        // const imageUrl = resImage[0].url;
        // data.image = imageUrl;

        const resGeneralCategories = await useCreateGeneralCategoriesGroupsCategories(data.id, data.general_categories);
        console.log(resGeneralCategories);

        const res = await useCreateGeneralCategoryGroup(data);
        console.log(res);
    };
    const edit = async (data) => {
        console.log(generalCategories);
        console.log(data.general_categories);
        // if (typeof data.image[0] == "object") {
        //     const resDeleteIMages = await deleteImages([shopSelected.image]);
        //     const resImage = await uploadImage(data.image[0], "folder", "nombre.png");
        //     data.image = resImage[0].url;
        // }

        const res = await useUseUpdateGeneralCategoryGroup(data);

        const { dataAgregar, dataBorrar } = getDataSelectMultiForAddAndDelete(
            generalCategoryGroup.categories,
            data.general_categories,
            "id",
            "value"
        );
        let dataAdded = true;
        let dataDeleted = true;
        console.log(dataAgregar);
        if (dataAgregar.length > 0) {
            dataAdded = await useCreateGeneralCategoriesGroupsCategories(data.id, dataAgregar);
        }
        if (dataBorrar.length > 0) dataDeleted = await useDeleteGeneralCategoryGroupCategory(data.id, dataBorrar);

        console.log(res);
        console.log(dataAdded);
        console.log(dataDeleted);
        console.log("tienda actualizada");
    };

    const onSubmit = async (data) => {
        if (wantCreate) create(data);
        else edit(data);
    };

    // useEffect(() => {
    //     console.log(categorySelected);
    // }, [categorySelected]);
    // CREATE TABLE general_categories_groups (
    //             id CHAR(36) NOT NULL PRIMARY KEY,
    //             name VARCHAR(255) NOT NULL,
    //             slug VARCHAR(255) NOT NULL,
    //             description TEXT NOT NULL,
    //             status TINYINT NOT NULL
    //         );
    const getOptions = () => {
        const categoriesForSelect = [];
        generalCategories.forEach((category) => {
            categoriesForSelect.push({ value: category.id, label: category.name });
        });
        return categoriesForSelect;
    };

    if (isLoading) return <LoadingParagraph />;
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="m-4">
                <p className="text-center mb-3 font-bold text-xl">Grupo de Categorias</p>

                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="name"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Nombre del grupo de categorias"
                />
                <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="description"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-40 min-h-40 max-h-40"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripción del grupo de categorias"
                />

                {/* <Select
                    register={register}
                    errors={errors}
                    type="number"
                    name="general_categories"
                    items={[
                        { id: 1, name: "Activo" },
                        { id: 0, name: "Inactivo" },
                    ]}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Estado"
                    isMulti={true}
                /> */}

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

                <ButtonGrayDown>{wantCreate ? "Crear" : "Editar"} grupo de categorias</ButtonGrayDown>

                {/* <input type="text" {...register("name")} placeholder="Nombre categoria..." />
                {errors.name?.message && <p className="text-red-700">{errors.name?.message}</p>}
                {errors.slug?.message && <p className="text-red-700">{errors.slug?.message}</p>} */}

                {/* <textarea name="" id="" {...register("description")} placeholder="Descripcion categoria..."></textarea>
                {errors.description?.message && <p className="text-red-700">{errors.description?.message}</p>} */}
                {/* <input type="color" {...register("color")} /> */}
                {/* {errors.color?.message && <p className="text-red-700">{errors.color?.message}</p>} */}
                {/* <input type="file" {...register("image")} onChange={() => setSchemaIsRequired(true)} /> */}
                {/* {errors.image?.message && <p className="text-red-700">{errors.image?.message}</p>} */}
                {/* <select {...register("status", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}>
                    <option value={1}>Activo</option>
                    <option value={0}>Inactivo</option>
                </select>
                {errors.view?.message && <p className="text-red-700">{errors.view?.message}</p>} */}

                {/* <Controller
                    name="general_categories"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                        <SelectMultiple
                            {...field}
                            options={getOptions()}
                            isMulti
                            placeholder="Selecciona tus frutas favoritas"
                            // onChange={handleChangeGeneralCategories}
                            // onChange={(selectedOptions) => field.onChange(selectedOptions ? selectedOptions.map((option) => option.value) : [])}
                        />
                    )}
                /> */}

                {/* <br /> */}
                {/* <button>Crear categoria directa</button> */}
            </form>
        </div>
    );
};

export default page;
