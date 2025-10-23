// "use client";

// import createCategorySchema from "@/app/schemas/category.schema";
// import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";
// // import { useUploadThing } from "@/utils/uploadthing";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React, { use, useEffect, useState } from "react";
// import { Controller, useFieldArray, useForm } from "react-hook-form";
// import SelectRact from "react-select";

// import useRequestCategories from "@/app/hooks/request/categories/useRequestCategories";
// import useUploadThing from "@/app/hooks/upload-thing/useUploadThing";
// import createArticleSchema from "@/app/schemas/article.schema";
// import Divider from "@/app/components/home/Divider";
// import Input from "@/app/components/inputs/Input";
// import Select from "@/app/components/inputs/Select";
// import useRequestsModels from "@/app/hooks/request/models/useRequetsModels";
// import { zusAdminModels } from "@/app/zustand/admin/models/zusAdminModels";
// import useRequestsPaymentMethods from "@/app/hooks/request/payment-methods/usePaymentMethods";
// import { zusAdminPaymentMethods } from "@/app/zustand/admin/payment-methods/zusPaymentMethods";
// import useRequestsOptions from "@/app/hooks/request/options/useRequestsOptions";
// import { zusAdminOptions } from "@/app/zustand/admin/options/zusAdminOptions";
// import useRequestsArticles from "@/app/hooks/request/articles/useRequestsArticles";
// import { zusAdminArticles } from "@/app/zustand/admin/articles/zusAdminArticles";
// import { useCreateArticleHighlightedParagraphs } from "@/app/hooks/request/articles/requestsArticles";
// // import { Input } from "postcss";

// const page = () => {
//     const { uploadImage, uploadImages, deleteImages, deleteImage } = useUploadThing();
//     const { useCreateCategory, useUpdateCategory } = useRequestCategories();
//     const { categorySelected, usingCategory } = zusAdminCategories();

//     const wanCreate = Object.keys({}).length == 0 ? true : false;

//     const [schemaIsRequired, setSchemaIsRequired] = useState(wanCreate);

//     const articleSchema = createArticleSchema(schemaIsRequired);

//     const defaultValues = wanCreate
//         ? {
//               id_shop: "345678ytfrt-fgtyuhjygt",
//               general_categories: [],
//           }
//         : {
//               //   id_shop: "345678ytfrt-fgtyuhjygt",
//               //   ...categorySelected,
//           };
//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//         control,
//         setValue,
//         getValues,
//     } = useForm({
//         defaultValues,
//         resolver: zodResolver(articleSchema),
//     });

//     const {
//         fields: imagesFields,
//         append: imageAppend,
//         prependFields,
//         removeFields,
//         swapFields,
//         moveFields,
//         insertFields,
//     } = useFieldArray({
//         control, // control props comes from useForm (optional: if you are using FormContext)
//         name: "images", // unique name for your Field Array
//     });

//     const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
//         control, // control props comes from useForm (optional: if you are using FormContext)
//         name: "specs", // unique name for your Field Array
//     });

//     const { fields: highlightedParagraphsfields, append: highlightedParagraphsAppend } = useFieldArray({
//         control, // control props comes from useForm (optional: if you are using FormContext)
//         name: "highlighted_paragraphs", // unique name for your Field Array
//     });

//     // const { fields: measurementsFields, append: measurementsAppend } = useFieldArray({
//     //     control, // control props comes from useForm (optional: if you are using FormContext)
//     //     name: "measurements", // unique name for your Field Array
//     // });

//     const {
//         fields: optionsFields,
//         append: optionsAppend,
//         prepend: optionsPrepend,
//         remove: optionRemove,
//         swap: optionSwap,
//         move: optionMove,
//         insert: optionInsert,
//     } = useFieldArray({
//         control, // control props comes from useForm (optional: if you are using FormContext)
//         name: "options", // unique name for your Field Array
//     });

//     const [images, setImages] = useState([]);

//     // const addImage = (e) => {
//     //     const newFiles = Array.from(e.target.files); // Convertir FileList a array
//     //     console.log(...newFiles);

//     //     if (newFiles.length > 0) {
//     //         // Actualizar estado local
//     //         setImages((prev) => {
//     //             const updatedImages = [...prev, ...newFiles];
//     //             // setValue("images", updatedImages); // Sincronizar con React Hook Form
//     //             return updatedImages; // Actualizar el estado local
//     //         });
//     //     }
//     // };

//     const { useGetDirectsCategories, useGetIndirectsCategories, useGetGeneralCategories } = useRequestCategories();

//     const { directCategories, indirectCategories, generalCategories } = zusAdminCategories();

//     const { useGetModels, useCreateModel, useUpdateModel } = useRequestsModels();

//     const { models, setModelSelected } = zusAdminModels();

//     const { useGetPaymentMethods } = useRequestsPaymentMethods();

//     const { paymentMethods } = zusAdminPaymentMethods();

//     const { useGetOptions, useGetOptionsValues } = useRequestsOptions();

//     const { options, valuesOptions } = zusAdminOptions();

//     const {} = useRequestCategories();

//     // const { useGetArticles } = useRequestsArticles();

//     const { articles } = zusAdminArticles();

//     useEffect(() => {
//         console.log(directCategories);
//     }, [directCategories]);

//     useEffect(() => {
//         useGetDirectsCategories();
//         useGetIndirectsCategories();
//         useGetModels();
//         useGetPaymentMethods();
//         useGetOptions();
//         useGetOptionsValues();
//         useGetGeneralCategories();
//         useGetArticles();
//     }, []);

//     useEffect(() => {
//         console.log(generalCategories);
//     }, [generalCategories]);

//     // const addImage = (e) => {
//     //     // const newImages = e.target.files;
//     //     const newImages = Array.from(e.target.files);
//     //     console.log(...newImages);
//     //     // console.log(e.target.files);
//     //     // return;
//     //     // const newImage = getValues("newImage"); // Obtener el valor del input
//     //     // if (newImage) {
//     //     // setImages((prev) => [...prev, ...newImages]); // Añadir al array local
//     //     // setValue("images", [...images, ...newImages]); // Sincronizar con React Hook Form
//     //     // setValue("newImage", ""); // Limpiar el input
//     //     // }
//     //     if (newImages.length > 0) {
//     //         // Actualizar estado local
//     //         setImages((prev) => {
//     //             const updatedImages = [...prev, ...newImages];
//     //             setValue("images", updatedImages); // Sincronizar con React Hook Form
//     //             return updatedImages; // Actualizar el estado local
//     //         });
//     //     }
//     // };

//     const removeImage = (index) => {
//         const updatedImages = images.filter((_, i) => i !== index); // Eliminar del array local
//         setImages(updatedImages);
//         setValue("images", updatedImages); // Actualizar React Hook Form
//     };

//     const addImage = () => {
//         setImages((state) => [
//             ...state,
//             <input type="file" key={state.length} {...register(`image-${state.length}`)} onChange={() => setSchemaIsRequired(true)} />,
//         ]);
//     };

//     useEffect(() => {
//         // console.log(wanCreate);
//         console.log(errors);
//     }, [errors]);

//     const { useGetArticles, useCreateArticle, useUpdateArticle } = useRequestsArticles();
//     const { useCreateArticleGeneralCategories, useUpdateArticleGeneralCategories } = useRequestsArticles();
//     const { useCreateArticleBoxContents } = useRequestsArticles();
//     const { usecreateArticleImages } = useRequestsArticles();
//     const { useCreateArticleOption } = useRequestsArticles();
//     const { useCreateArticleSpecs } = useRequestsArticles();

//     const create = async (data) => {
//         console.log(data);
//         const resImage = await uploadImage(data.main_image[0], "folder", "nombre.png");
//         const imageUrl = resImage[0].ufsUrl;
//         data.main_image = imageUrl;
//         console.log(imageUrl);

//         await useCreateArticleGeneralCategories(data.id, data.general_categories);
//         await useCreateArticleBoxContents(data.id, data.box_content);

//         const optionsImagesFile = [];
//         data.options.forEach((optionImage) => {
//             optionsImagesFile.push({ imageFile: optionImage.image[0], folder: "folder", fileName: "nombre.png" });
//         });
//         const optionsImagesForDB = [...data.options];
//         console.log(optionsImagesForDB);
//         console.log(optionsImagesFile);
//         const optionsImagesUrl = await uploadImages(optionsImagesFile);
//         console.log(optionsImagesUrl);
//         optionsImagesUrl.forEach((imageUrl, index) => {
//             data.options.some((option, i) => {
//                 // if (optionsImagesForDB[i].imageUrl) return true;
//                 if (!optionsImagesForDB[i].imageUrl && optionsImagesForDB[i].image.length > 0) {
//                     optionsImagesForDB[i].imageUrl = imageUrl.ufsUrl;
//                     return true;
//                 }
//             });
//         });
//         console.log(optionsImagesForDB);
//         await useCreateArticleOption(data.id, optionsImagesForDB);

//         // const options = [];
//         // data.options.forEach((option) => {
//         //     const image = { imageFile: option.image, folder: "folder", fileName: "nombre.png" };
//         //     options.push({ image: image, id_option: option.id_option, id_value_option: option.id_value_option, price: option.price });
//         // });

//         // id_option: "c28f9191-2a8c-4241-bfc2-75672caead5d";
//         // id_value_option: "549bc5ec-6ced-4ddf-a467-ce0ac7a51bab";
//         // image: {}
//         // name_option: "Tamano";
//         // price: "3000";
//         // type: 1;
//         // type_option: 1;

//         console.log(data.images);
//         const imagesFile = [];
//         data.images.forEach((fileList) => {
//             Array.from(fileList).forEach((image) => {
//                 imagesFile.push({ imageFile: image, folder: "folder", fileName: "nombre.png" });
//             });
//         });

//         console.log(imagesFile);
//         const imagesUrl = await uploadImages(imagesFile);
//         console.log(imagesUrl);

//         // const imagesUrlArray = [];
//         // imagesUrl.forEach((image) => {
//         //     imagesUrlArray.push(image.url);
//         // });
//         // console.log(imagesUrlArray);
//         const resImages = await usecreateArticleImages(data.id, imagesUrl);
//         console.log(resImages);

//         const res = await useCreateArticle(data);
//         console.log(res);
//         console.log("Creado");

//         console.log(data.specs);

//         const resSpecs = await useCreateArticleSpecs(data.id, data.specs);
//         console.log(resSpecs);

//         const resHighlightedParagraphs = await useCreateArticleHighlightedParagraphs(data.id, data.highlighted_paragraphs);
//         console.log(resHighlightedParagraphs);
//     };

//     useEffect(() => {
//         console.log(errors);
//     }, [errors]);

//     const edit = async (data) => {
//         if (typeof data.main_image[0] == "object") {
//             const resDeleteIMages = await deleteImages([shopSelected.image]);
//             const resImage = await uploadImage(data.image[0], "folder", "nombre.png");
//             data.image = resImage[0].url;
//         }
//         const res = await useUpdateArticle(data);
//         await useUpdateArticleGeneralCategories();
//         console.log(res);
//         console.log("Articulo actualizado");
//     };

//     const onSubmit = async (data) => {
//         // console.log(data);
//         // return;
//         // TODO: subir a bbdd id, id_article, id_option, id_value, image_url, price
//         // id_option: "c28f9191-2a8c-4241-bfc2-75672caead5d";
//         // id_value_option: "448b2a0a-86db-43f4-91bd-6e5f7d565129";
//         // image: { }
//         // name_option: "Tamano";
//         // price: "900";
//         // type: 1;
//         // type_option: 1;

//         // console.log(data);
//         // console.log(data.general_categories);
//         // return;
//         // console.log(watch("especificaciones"));
//         // return;
//         // console.log(watch("options"));
//         // return;
//         // console.log(images);
//         // console.log(data);
//         // return;
//         if (wanCreate) create(data);
//         else edit(data);
//     };

//     // useEffect(() => {
//     //     console.log(watch);
//     // }, [watch("general_categories")]);

//     useEffect(() => {
//         console.log(categorySelected);
//     }, [categorySelected]);

//     const handleClickAddOption = () => {
//         // const idOptionSelected = watch("id_option_selected");
//         const option = watch("id_option_selected").split("||+||");
//         // console.log(option);
//         const idOption = option[0];
//         const nameOption = option[1];
//         const typeOption = Number(option[2]);

//         // console.log(typeOption);

//         optionsAppend({
//             id_option: idOption,
//             name_option: nameOption,
//             type_option: typeOption,
//             price: 0,
//             image: {},
//             type: 1,
//             id_value_option: "",
//             color: "",
//         });
//     };

//     const getOptions = () => {
//         const categoriesForSelect = [];
//         generalCategories.forEach((category) => {
//             categoriesForSelect.push({ value: category.id, label: category.name });
//         });
//         return categoriesForSelect;
//     };

//     const getBoxContent = () => {
//         const articlesForSelect = [];
//         articles.forEach((article) => {
//             articlesForSelect.push({ value: article.id, label: article.name });
//         });
//         return articlesForSelect;
//     };

//     useEffect(() => {
//         console.log(options);
//     }, [options]);

//     return (
//         <div className="m-4">
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <p className="text-center">Datos del articulo</p>
//                 <div>
//                     <label htmlFor="">Nombre Articulo: </label>
//                     <Input
//                         register={register}
//                         errors={errors}
//                         type="text"
//                         name="name"
//                         inputClassName=""
//                         errorClassName="text-red-700"
//                         placeholder="Nombre del producto..."
//                     />
//                 </div>
//                 <br />
//                 <Input
//                     register={register}
//                     errors={errors}
//                     type="textarea"
//                     name="description"
//                     inputClassName=""
//                     errorClassName="text-red-700"
//                     placeholder="Descripcion categoria..."
//                 />
//                 <br />
//                 <div>
//                     <p>Imagen principal:</p>
//                     <input type="file" {...register("main_image")} onChange={() => setSchemaIsRequired(true)} />
//                     {errors.main_image?.message && <p className="text-red-700">{errors.main_image?.message}</p>}
//                 </div>
//                 <br />
//                 <div>
//                     <p>categoria directa</p>
//                     <Select
//                         register={register}
//                         errors={errors}
//                         name="id_direct_category"
//                         items={directCategories}
//                         type="text"
//                         selectClassName=""
//                         errorClassName="text-red-700"
//                         optionNameForShow="name"
//                     />
//                 </div>
//                 <br />
//                 <div>
//                     <p>categoria indirecta</p>
//                     <Select
//                         register={register}
//                         errors={errors}
//                         name="id_indirect_category"
//                         items={indirectCategories}
//                         type="text"
//                         selectClassName=""
//                         errorClassName="text-red-700"
//                         optionNameForShow="name"
//                     />
//                 </div>
//                 <br />
//                 <div>
//                     <p>Modelo</p>
//                     <Select
//                         register={register}
//                         errors={errors}
//                         name="id_model"
//                         items={models}
//                         type="text"
//                         selectClassName=""
//                         errorClassName="text-red-700"
//                         optionNameForShow="name"
//                     />
//                 </div>
//                 <br />
//                 <div>
//                     <p>Precio del producto</p>
//                     <input
//                         type="text"
//                         {...register("price", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}
//                         placeholder="precio articulo..."
//                     />
//                 </div>
//                 <div>
//                     <p>Estado</p>
//                     <Select
//                         register={register}
//                         errors={errors}
//                         name="status"
//                         items={[
//                             { id: 1, name: "Activo" },
//                             { id: 0, name: "Inactivo" },
//                         ]}
//                         type="number"
//                         selectClassName=""
//                         errorClassName="text-red-700"
//                         optionNameForShow="name"
//                     />
//                 </div>
//                 <Divider h={2.5} />
//                 <p className="text-center">Datos adicionales del articulo</p>
//                 //! esto tiene que funcionar dinamicamente para todos los filtros
//                 {imagesFields.map((field, index) => (
//                     <input key={field.id} {...register(`images.${index}`)} type="file" multiple />
//                 ))}
//                 <button type="button" onClick={() => imageAppend({ image: {} })}>
//                     append image
//                 </button>
//                 <br />
//                 <div>
//                     <p>categorias generales</p>
//                     <Controller
//                         name="general_categories"
//                         control={control}
//                         defaultValue={[]}
//                         render={({ field }) => (
//                             <SelectRact
//                                 {...field}
//                                 options={getOptions()}
//                                 isMulti
//                                 placeholder="Selecciona tus frutas favoritas"
//                                 // onChange={handleChangeGeneralCategories}
//                                 // onChange={(selectedOptions) => field.onChange(selectedOptions ? selectedOptions.map((option) => option.value) : [])}
//                             />
//                         )}
//                     />
//                     {/* {errors.general_categories?.message && <p className="text-red-700">{errors.general_categories?.message}</p>} */}
//                 </div>
//                 <br />
//                 <div>
//                     <p>Vista</p>
//                     <select {...register("view", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}>
//                         <option value={1}>Mostrar</option>
//                         <option value={0}>No mostrar</option>
//                     </select>
//                     {errors.view?.message && <p className="text-red-700">{errors.view?.message}</p>}
//                 </div>
//                 <br />
//                 <div>
//                     <p>Cantidad disponible</p>
//                     <input
//                         {...register("quantity", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}
//                         placeholder="cantidad articulo..."
//                     />
//                     {errors.quantity?.message && <p className="text-red-700">{errors.quantity?.message}</p>}
//                     <button type="button">Dismonuir</button>
//                     <button type="button">Aumentar</button>
//                 </div>
//                 <br />
//                 <div>
//                     <p>metodo de pago</p>
//                     <Select
//                         register={register}
//                         errors={errors}
//                         name="id_payment_method"
//                         items={paymentMethods}
//                         type="text"
//                         selectClassName=""
//                         errorClassName="text-red-700"
//                         optionNameForShow="name"
//                     />
//                 </div>
//                 <br />
//                 {/* //!todo: */}
//                 {/* <Select
//                     register={register}
//                     errors={errors}
//                     name="box_context"
//                     items={paymentMethods}
//                     type="text"
//                     selectClassName=""
//                     errorClassName="text-red-700"
//                     optionNameForShow="name"
//                 /> */}
//                 <div>
//                     contenido caja
//                     <Controller
//                         name="box_content"
//                         control={control}
//                         defaultValue={[]}
//                         render={({ field }) => (
//                             <SelectRact
//                                 {...field}
//                                 options={getBoxContent()}
//                                 isMulti
//                                 placeholder="Selecciona tus frutas favoritas"
//                                 // onChange={handleChangeGeneralCategories}
//                                 // onChange={(selectedOptions) => field.onChange(selectedOptions ? selectedOptions.map((option) => option.value) : [])}
//                             />
//                         )}
//                     />
//                     <input type="text" name="" id="" />
//                     {/* <button>Agregar contenido</button>
//                     <button>eliminar contenido</button> */}
//                 </div>
//                 <h1>Opciones</h1>
//                 <select {...register("id_option_selected")}>
//                     {options.map((option) => (
//                         <option key={option.id} value={`${option.id}||+||${option.name}||+||${option.type}`}>
//                             {option.name}
//                         </option>
//                     ))}
//                 </select>
//                 <button onClick={handleClickAddOption}>Agregar opcion</button>
//                 {optionsFields.map((field, index) => (
//                     <div key={field.id}>
//                         <p>{watch("options")?.[index]?.name_option}</p>
//                         <select {...register(`options.${index}.id_value_option`)}>
//                             {valuesOptions.map((valueOption) => (
//                                 <option key={valueOption.id} value={valueOption.id}>
//                                     {valueOption.value}
//                                 </option>
//                             ))}
//                         </select>
//                         <input {...register(`options.${index}.price`)} />
//                         <input {...register(`options.${index}.quantity`)} />

//                         {(watch("options")?.[index]?.type_option == 2 || watch("options")?.[index]?.type_option == 3) && (
//                             <input type="file" {...register(`options.${index}.image`)} />
//                         )}
//                         {watch("options")?.[index]?.type_option == 3 && <input type="color" {...register(`options.${index}.color`)} />}
//                         <hr />
//                     </div>
//                 ))}
//                 {/* if (options.some(option => option.id === 1)) {
//                     console.log("Existe una opción con id 1");
//                 } */}
//                 <button onClick={handleClickAddOption}>Agregar opcion</button>
//                 <br />
//                 <br />
//                 <br />
//                 <br />
//                 {/* {measurementsFields.map((field, index) => (
//                     <div key={field.id}>
//                         <select {...register(`measurements.${index}.key`)}>
//                             {options.map((option) => (
//                                 <option key={option.id} value={option.id}>
//                                     {option.name}
//                                 </option>
//                             ))}
//                         </select>
//                         <select {...register(`measurements.${index}.value`)}>
//                             {valuesOptions.map((valueOption) => (
//                                 <option key={valueOption.id} value={valueOption.id}>
//                                     {valueOption.value}
//                                 </option>
//                             ))}
//                         </select>
//                         <input type="checkbox" {...register(`measurements.${index}.type`)} />
//                     </div>
//                 ))}
//                 <button type="button" onClick={() => measurementsAppend({ key: "", value: "", type: false })}>
//                     append
//                 </button> */}
//                 <br />
//                 <br />
//                 <br />
//                 <br />
//                 {fields.map((field, index) => (
//                     <div key={field.id}>
//                         <select {...register(`specs.${index}.key`)}>
//                             {options.map((option) => (
//                                 <option key={option.id} value={option.id}>
//                                     {option.name}
//                                 </option>
//                             ))}
//                         </select>
//                         <select {...register(`specs.${index}.value`)}>
//                             {valuesOptions.map((valueOption) => (
//                                 <option key={valueOption.id} value={valueOption.id}>
//                                     {valueOption.value}
//                                 </option>
//                             ))}
//                         </select>
//                         <input type="checkbox" {...register(`specs.${index}.is_spec`)} />
//                         <input type="checkbox" {...register(`specs.${index}.is_measurement`)} />
//                         <input type="checkbox" {...register(`specs.${index}.is_highlight`)} />
//                     </div>
//                 ))}
//                 <button type="button" onClick={() => append({ key: "", value: "" })}>
//                     append
//                 </button>
//                 <br />
//                 {highlightedParagraphsfields.map((field, index) => (
//                     <Input
//                         key={field.id}
//                         register={register}
//                         errors={errors}
//                         type="textarea"
//                         name={`highlighted_paragraphs.${index}`}
//                         inputClassName=""
//                         errorClassName="text-red-700"
//                         placeholder="Descripcion categoria..."
//                     />
//                 ))}
//                 <button type="button" onClick={() => highlightedParagraphsAppend()}>
//                     append
//                 </button>
//                 <br />
//                 <Input
//                     register={register}
//                     errors={errors}
//                     type="textarea"
//                     name="additional_details"
//                     inputClassName=""
//                     errorClassName="text-red-700"
//                     placeholder="Descripcion categoria..."
//                 />
//                 <br />
//                 <br />
//                 <button>Crear categoria directa</button>
//             </form>
//         </div>
//     );
// };

// export default page;
