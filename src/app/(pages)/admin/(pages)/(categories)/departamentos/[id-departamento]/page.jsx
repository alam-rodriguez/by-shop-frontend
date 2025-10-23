"use client";

import createCategorySchema from "@/app/schemas/category.schema";
import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";
// import { useUploadThing } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { use, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import useRequestCategories from "@/app/hooks/request/categories/useRequestCategories";
import useUploadThing from "@/app/hooks/upload-thing/useUploadThing";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import createDepartmentSchema from "@/app/schemas/departments.schema";
import {
    useCreateDepartment,
    useCreateDirectCategoryDepartment,
    useDeleteDepartmentDirectsCategories,
    useGetDirectsCategories,
    useGetDirectsCategoriesByIdDepartment,
} from "@/app/hooks/request/categories/requestsCategories";
// import { useParams } from "next/navigation";

import SelectRact from "react-select";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import InputFile from "@/app/components/inputs/InputFile";
import { ButtonGrayDown } from "@/app/components/others/Buttons";
import {
    getDataForAddDeleteAndUpdateOptions,
    getDataSelectMultiForAddAndDelete,
    getDataSelectMultiForAddAndDelete2,
    getDefaultsValuesForSelectMulti,
    isUUID,
} from "@/app/hooks/app/app";
import { toast } from "sonner";
import { useGetDepartmentById, useUpdateDepartment } from "@/app/hooks/request/categories/requestsDepartments";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";

const page = () => {
    const { ["id-departamento"]: idDepartment } = useParams();

    const wantCreate = !isUUID(idDepartment);

    // console.log(wantCreate);

    const router = useRouter();

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
    //     // console.log(data);
    //     // console.log(wanCreate);
    //     // console.log(idDepartment);
    // }, [idDepartment]);

    // const searchParams = useSearchParams();

    // Obtener un parámetro específico
    // const tipo = searchParams.get("tipo");

    // const [type, setType] = useState(0);

    // useEffect(() => {
    //     if (tipo == "departamentos") setType(4);
    // }, []);

    // console.log();

    const { uploadImage, deleteImages, deleteImage } = useUploadThing();
    const { useCreateCategory, useUpdateCategory } = useRequestCategories();
    const { categorySelected, usingCategory } = zusAdminCategories();

    // const wanCreate = Object.keys(categorySelected).length == 0 ? true : false;

    const [schemaIsRequired, setSchemaIsRequired] = useState(wantCreate);

    const departmentSchema = createDepartmentSchema(schemaIsRequired);
    const defaultValues = wantCreate
        ? {}
        : {
              ...categorySelected,
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
        resolver: zodResolver(departmentSchema),
    });

    const { data, isLoading } = useGetDepartmentById(idDepartment);

    useEffect(() => {
        if (isLoading && !data) return;
        reset(data);
    }, [data]);

    const { data: directsCategories, isLoading: isLoadingDirectsCategories } = useGetDirectsCategories();

    const { data: directsCategoriesDepartment, isLoading: isLoadingDirectsCategoriesDepartment } =
        useGetDirectsCategoriesByIdDepartment(idDepartment);

    useEffect(() => {
        if (isLoadingDirectsCategories || isLoadingDirectsCategoriesDepartment) return;
        const directsCategoriesDefaultValues = getDefaultsValuesForSelectMulti(directsCategoriesDepartment, directsCategories, "id");
        setValue("directs_categories", directsCategoriesDefaultValues);
    }, [directsCategories, directsCategoriesDepartment]);

    // const getOptions = () => {
    //     const categoriesForSelect = [];
    //     generalCategories.forEach((category) => {
    //         categoriesForSelect.push({ value: category.id, label: category.name });
    //     });
    //     return categoriesForSelect;
    // };

    // useEffect(() => {
    //     console.log(wanCreate);
    //     console.log(errors);
    // }, [errors]);

    const create = async (data) => {
        const loadingToast = toast.loading("creando departamento...");

        const resImage = await uploadImage(data.image, "departments", data.short_name);
        const imageUrl = resImage[0].ufsUrl;
        data.image = imageUrl;

        const resDirectsCategoriesDepartment = await useCreateDirectCategoryDepartment(data.id, data.directs_categories);
        console.log(resDirectsCategoriesDepartment);

        const res = await useCreateDepartment(data);
        console.log(res);
        if (res && resDirectsCategoriesDepartment) {
            toast.success("Departamento creado correctamente", {
                id: loadingToast,
            });
            router.replace(`/admin/departamentos/${data.id}`);
        } else
            toast.error("Error al crear el departamento", {
                id: loadingToast,
            });
    };
    const edit = async (data) => {
        const loadingToast = toast.loading("actualizando departamento...");

        if (typeof data.image == "object" && data.image) {
            const resDeleteIMages = await deleteImages([categorySelected.image]);
            const resImage = await uploadImage(data.image, "departments", data.short_name);
            data.image = resImage[0].ufsUrl;
        }
        const res = await useUpdateDepartment(data);

        // const { dataAgregar, dataBorrar } = getDataSelectMultiForAddAndDelete(directsCategoriesDepartment, data.directs_categories, "id", "value");
        const { dataAgregar, dataBorrar } = getDataSelectMultiForAddAndDelete2(directsCategoriesDepartment, data.directs_categories, "id", "value");

        if (dataAgregar.length > 0) {
            const resDirectsCategoriesDepartment = await useCreateDirectCategoryDepartment(data.id, dataAgregar);
            console.log(resDirectsCategoriesDepartment);
        }

        console.log(dataBorrar);

        // TODO: EN EL BACKEND DEBO DE TERMINAR PARA QUE SE ELIMINE BIEN
        if (dataBorrar.length > 0) {
            const res = await useDeleteDepartmentDirectsCategories(data.id, dataBorrar);
            console.log(res);
        }
        //  console.log(dataAgregar);
        // console.log(dataBorrar);

        if (res)
            toast.success("Departamento actualizado correctamente", {
                id: loadingToast,
            });
        else
            toast.error("Error al actualizar el departamento", {
                id: loadingToast,
            });
    };

    const onSubmit = async (data) => {
        console.log(data);
        console.log(wantCreate);
        if (wantCreate) create(data);
        else edit(data);
    };

    // useEffect(() => {
    //     console.log(categorySelected);
    // }, [categorySelected]);

    if (isLoading) return <LoadingParagraph />;
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
                    placeholder="Departamento..."
                    label="Nombre del departamento"
                />
                {/* <input type="text" {...register("name")} placeholder="Nombre categoria..." />
                {errors.name?.message && <p className="text-red-700">{errors.name?.message}</p>}
                {errors.slug?.message && <p className="text-red-700">{errors.slug?.message}</p>} */}

                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="short_name"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Nombre corto"
                />

                {/* <input type="text" {...register("short_name")} placeholder="Nombre categoria..." /> */}
                {/* {errors.name?.message && <p className="text-red-700">{errors.name?.message}</p>} */}

                <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="description"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-20 min-h-20 max-h-20"
                    errorClassName="text-red-700"
                    placeholder="Descripción del departamento..."
                    label="Descripción del departamento..."
                />

                {/* <textarea name="" id="" {...register("description")} placeholder="Descripcion categoria..."></textarea> */}
                {/* {errors.description?.message && <p className="text-red-700">{errors.description?.message}</p>} */}

                <Input
                    register={register}
                    errors={errors}
                    type="color"
                    name="color"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 w-full"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Descripción del departamento"
                />

                {/* <input type="color" {...register("color")} /> */}
                {/* {errors.color?.message && <p className="text-red-700">{errors.color?.message}</p>} */}
                <InputFile
                    imgLink={data?.image}
                    control={control}
                    errors={errors}
                    name="image"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                    label="Imagen del departamento"
                />
                {/* <input type="file" {...register("image")} onChange={() => setSchemaIsRequired(true)} /> */}
                {/* {errors.image?.message && <p className="text-red-700">{errors.image?.message}</p>} */}

                <Select
                    register={register}
                    control={control}
                    errors={errors}
                    type="number"
                    name="directs_categories"
                    items={!isLoadingDirectsCategories ? directsCategories : []}
                    selectClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    optionNameForShow="name"
                    label="Categorias directas"
                    isMulti={true}
                />

                {/* <div>
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
                </div> */}

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

                {/* <select
                    name=""
                    id=""
                    {...register("view", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}
                >
                    <option value={1}>Mostrar</option>
                    <option value={0}>No mostrar</option>
                </select>
                {errors.view?.message && <p className="text-red-700">{errors.view?.message}</p>} */}

                <ButtonGrayDown>{wantCreate ? "Crear" : "Editar"} Departamento</ButtonGrayDown>

                {/* <br /> */}
                {/* <button>Crear departamento</button> */}
            </form>
        </div>
    );
};

export default page;
