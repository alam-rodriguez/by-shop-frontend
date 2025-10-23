// "use client";

// import createCategorySchema from "@/app/schemas/category.schema";
// import { zusAdminCategories } from "@/app/zustand/admin/categories/zusAdminCategories";
// // import { useUploadThing } from "@/utils/uploadthing";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React, { useEffect, useState } from "react";
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
// // import { Input } from "postcss";

// const page = () => {
//     const { uploadImage, deleteImages, deleteImage } = useUploadThing();
//     const { useCreateCategory, useUpdateCategory } = useRequestCategories();
//     const { categorySelected, usingCategory } = zusAdminCategories();

//     const wanCreate = Object.keys(categorySelected).length == 0 ? true : false;

//     const [schemaIsRequired, setSchemaIsRequired] = useState(wanCreate);

//     const articleSchema = createArticleSchema(schemaIsRequired);
//     // const articleSchema = createArticleSchema(true);

//     const defaultValues = wanCreate
//         ? {
//               //   type: usingCategory,
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
//         // defaultValues,
//         // resolver: zodResolver(articleSchema),
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

//     const { useGetDirectsCategories, useGetIndirectsCategories } = useRequestCategories();

//     const { directCategories, indirectCategories } = zusAdminCategories();

//     const { useGetModels, useCreateModel, useUpdateModel } = useRequestsModels();

//     const { models, setModelSelected } = zusAdminModels();

//     const { useGetPaymentMethods } = useRequestsPaymentMethods();

//     const { paymentMethods } = zusAdminPaymentMethods();

//     const { useGetOptions, useGetOptionsValues } = useRequestsOptions();

//     const { options, valuesOptions } = zusAdminOptions();

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
//     }, []);

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
//         // console.log(errors);
//     }, [errors]);

//     const create = async (data) => {
//         const resImage = await uploadImage(data.image[0], "folder", "nombre.png");
//         const imageUrl = resImage[0].url;
//         data.image = imageUrl;

//         const res = await useCreateCategory(data);
//         console.log(res);
//     };
//     const edit = async (data) => {
//         if (typeof data.image[0] == "object") {
//             const resDeleteIMages = await deleteImages([shopSelected.image]);
//             const resImage = await uploadImage(data.image[0], "folder", "nombre.png");
//             data.image = resImage[0].url;
//         }
//         const res = await useUpdateCategory(data);
//         console.log(res);
//         console.log("tienda actualizada");
//     };

//     const onSubmit = async (data) => {
//         // console.log(watch("especificaciones"));
//         // return;
//         // console.log(watch("options"));
//         // return;
//         // console.log(images);
//         console.log(data);
//         return;
//         if (wanCreate) create(data);
//         else edit(data);
//     };

//     useEffect(() => {
//         console.log(categorySelected);
//     }, [categorySelected]);

//     const [especificacionSelected, setEspecificacionSelected] = useState(null);
//     const [especificaciones, setEspecificaciones] = useState([]);
//     const [especificacion, setEspecificacion] = useState([]);
//     const addSpecificacion = () => {
//         setEspecificaciones((state) => [
//             ...state,
//             {
//                 nombre: "",
//                 jsx: (
//                     <div key={state.length}>
//                         <select>
//                             <option value="">key especificacion como: provvedor red</option>
//                         </select>
//                         <select>
//                             <option value="">vor especificacion como: todas</option>
//                         </select>
//                         <button>Agregar valor</button>
//                         <button>Eliminar valor</button>
//                     </div>
//                 ),
//             },
//         ]);
//     };

//     const handleClickAddOption = () => {
//         // const idOptionSelected = watch("id_option_selected");
//         const option = watch("id_option_selected").split("||+||");
//         const idOption = option[0];
//         const nameOption = option[1];
//         const typeOption = Number(option[2]);

//         optionsAppend({ id_option: idOption, name_option: nameOption, type_option: typeOption, price: 0, image: {}, type: 1, id_value_option: "" });
//     };

//     const optionsRHF = watch("options") || [];

//     const [generalCategoires, setGeneralCategoires] = useState([]);
//     const handleChangeGeneralCategories = (category) => {
//         console.log(category);
//     };

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
//                 {/* <div>
//                     <label htmlFor="">Nombre Articulo: </label>
//                     <input type="text" {...register("name")} placeholder="Nombre articulo..." />
//                     {errors.name?.message && <p className="text-red-700">{errors.name?.message}</p>}
//                 </div> */}
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
//                 {/* <div>
//                     <label htmlFor="">Descripcion Producto </label>
//                     <textarea {...register("description")} placeholder="Descripcion categoria..."></textarea>
//                     {errors.description?.message && <p className="text-red-700">{errors.description?.message}</p>}
//                 </div> */}
//                 <br />
//                 <br />
//                 <div>
//                     <p>Imagen principal:</p>
//                     <input type="file" {...register("main_image")} onChange={() => setSchemaIsRequired(true)} />
//                     {errors.main_image?.message && <p className="text-red-700">{errors.main_image?.message}</p>}
//                 </div>
//                 <br />
//                 {/*  */}
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
//                     {/* <select {...register("id_direct_category")}>
//                         <option value="">Seleccione una categoria</option>
//                         <option value="wsedrfty-45t6yu">iphones</option>
//                         <option value="wsedrfty-45t6yu-98765">tablets</option>
//                     </select>
//                     {errors.id_direct_category?.message && <p className="text-red-700">{errors.id_direct_category?.message}</p>} */}
//                 </div>
//                 {/* <div>
//                     <p>categoria directa</p>

//                     <select {...register("id_direct_category")}>
//                         <option value="">Seleccione una categoria</option>
//                         <option value="wsedrfty-45t6yu">iphones</option>
//                         <option value="wsedrfty-45t6yu-98765">tablets</option>
//                     </select>
//                     {errors.id_direct_category?.message && <p className="text-red-700">{errors.id_direct_category?.message}</p>}
//                 </div> */}
//                 {/*  */}
//                 <br />
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
//                 {/* <div>
//                     <p>categoria indirecta</p>
//                     <select {...register("id_indirect_category")}>
//                         <option value="">Seleccione una categoria</option>
//                         <option value="dfghyj-98765tyhu7890">dispositivos electronicos</option>
//                         <option value="dfghyj-98765tyh-ytghju7890">Electrodomesticos</option>
//                     </select>
//                     {errors.id_indirect_category?.message && <p className="text-red-700">{errors.id_indirect_category?.message}</p>}
//                 </div> */}
//                 {/* <div>
//                     <p>Marca</p>
//                     <select {...register("brand")}>
//                         <option value="6789-9tyy6898yyuyh-yu7">Apple</option>
//                         <option value="6789-9tyy6898yyuyh-yu7">Samsung</option>
//                     </select>
//                     {errors.brand?.message && <p className="text-red-700">{errors.brand?.message}</p>}
//                 </div> */}
//                 <br />
//                 {/* <div>
//                     <p>Modelo del producto</p>
//                     <select {...register("model")}>
//                         <option value="6789-9tyy6898yyff-dddfduyh-yu7">iphone 15 pro max</option>
//                     </select>
//                     {errors.model?.message && <p className="text-red-700">{errors.model?.message}</p>}
//                 </div> */}
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
//                         type="text"
//                         selectClassName=""
//                         errorClassName="text-red-700"
//                         optionNameForShow="name"
//                     />
//                 </div>
//                 <Divider h={2.5} />
//                 <p className="text-center">Datos adicionales del articulo</p>
//                 //! esto tiene que funcionar dinamicamente para todos los filtros
//                 {/* <div>
//                     <p>Colores del producto</p>
//                     <Controller
//                         name="colors"
//                         control={control}
//                         defaultValue={[]}
//                         render={({ field }) => (
//                             <Select
//                                 {...field}
//                                 options={[
//                                     { value: "1234567", label: "Rojo" },
//                                     { value: "3e4r5678", label: "Verde" },
//                                     { value: "we4r5t6y7u", label: "Azul" },
//                                     { value: "4r5t6yui", label: "Marron" },
//                                     { value: "2345678", label: "Morado" },
//                                 ]}
//                                 isMulti
//                                 placeholder="Selecciona tus frutas favoritas"
//                             />
//                         )}
//                     />
//                     {errors.colors?.message && <p className="text-red-700">{errors.colors?.message}</p>}
//                 </div> */}
//                 {imagesFields.map((field, index) => (
//                     <input key={field.id} {...register(`images.${index}`)} type="file" multiple />
//                 ))}
//                 <button type="button" onClick={() => imageAppend({ image: {} })}>
//                     append image
//                 </button>
//                 {/* {imagesFields.map((image, index) => ((
//                     <div>
//                         <input {...register(`especificaciones.${index}.especificacion`)} />
//                         <input {...register(`especificaciones.${index}.especificacion`)} />
//                         <input {...register(`especificaciones.${index}.key`)} />
//                         <input {...register(`especificaciones.${index}.value`)} />
//                     </div>
//                 ))} */}
//                 <br />
//                 <br />
//                 {/* <div>
//                     <p>otras imagagenes</p>
//                     {images} */}
//                 {/* <input type="file" {...register("main_image")} onChange={() => setSchemaIsRequired(true)} /> */}
//                 {/* {errors.main_image?.message && <p className="text-red-700">{errors.main_image?.message}</p>} */}
//                 {/* <button onClick={addImage} type="button">
//                         agrega imagen
//                     </button>
//                     <button type="button">eliminar imagen</button>
//                 </div> */}
//                 <br />
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
//                                 options={[
//                                     { value: "1234567", label: "Rojo" },
//                                     { value: "3e4r5678", label: "Verde" },
//                                     { value: "we4r5t6y7u", label: "Azul" },
//                                     { value: "4r5t6yui", label: "Marron" },
//                                     { value: "2345678", label: "Morado" },
//                                 ]}
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
//                 {/* <select {...register("direct_category", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}>
//                     <option value="6789-98uyh-yu7">iphones</option>
//                 </select>
//                 {errors.direct_category?.message && <p className="text-red-700">{errors.direct_category?.message}</p>}
//                 <br />
//                 <select {...register("indirect_category", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}>
//                     <option value="6789-9ty8uyh-yu7">telefonos</option>
//                 </select>
//                 {errors.indirect_category?.message && <p className="text-red-700">{errors.indirect_category?.message}</p>} */}
//                 {/* <select
//                     {...register("general_categories", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}
//                 >
//                     <option value="6789-9tyy6898uyh-yu7">regalos que fasinan</option>
//                 </select>
//                 {errors.general_categories?.message && <p className="text-red-700">{errors.general_categories?.message}</p>} */}
//                 {/* {errors.price?.message && <p className="text-red-700">{errors.price?.message}</p>} */}
//                 <br />
//                 <div>
//                     <p>CAntidad disponible</p>
//                     <input
//                         {...register("quantity", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}
//                         placeholder="cantidad articulo..."
//                     />
//                     {errors.quantity?.message && <p className="text-red-700">{errors.quantity?.message}</p>}
//                     <button type="button">Dismonuir</button>
//                     <button type="button">Aumentar</button>
//                 </div>
//                 {/* {errors.name?.message && <p className="text-red-700">{errors.name?.message}</p>} */}
//                 <br />
//                 {/* <div>
//                     <p>Vendedor</p>
//                     <select {...register("id_seller")}>
//                         <option value="6789-9tyy6898yyff-dddfduyh-yu7">empresa</option>
//                     </select>
//                     {errors.id_seller?.message && <p className="text-red-700">{errors.id_seller?.message}</p>}
//                 </div> */}
//                 <br />
//                 {/* <div>
//                     <p>Devolucion</p>
//                     <select {...register("id_return")}>
//                         <option value="6789-9tyy6898yyff-dddfduyh-yu7">iphone 15 pro max</option>
//                     </select>
//                     {errors.id_return?.message && <p className="text-red-700">{errors.id_return?.message}</p>}
//                 </div> */}
//                 <br />
//                 {/* <div>
//                     <p>Metodo de pago</p>
//                     <select {...register("id_payment_method")}>
//                         <option value="6789-9tyy6898yyff-dddfduyh-yu7">iphone 15 pro max</option>
//                     </select>
//                     {errors.id_payment_method?.message && <p className="text-red-700">{errors.id_payment_method?.message}</p>}
//                 </div> */}
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
//                 <div>
//                     <p>Plan de proteccion</p>
//                     <select {...register("id_protection_plan")}>
//                         <option value="6789-9tyy6898yyff-dddfduyh-yu7">iphone 15 pro max</option>
//                     </select>
//                     {errors.id_protection_plan?.message && <p className="text-red-700">{errors.id_protection_plan?.message}</p>}
//                 </div>
//                 {/* <input
//                     type="text"
//                     {...register("price", { type: "note", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}
//                     placeholder="precio articulo..."
//                 />
//                 {errors.name?.message && <p className="text-red-700">{errors.name?.message}</p>} */}
//                 <br />
//                 {/* <input type="file" onChange={addImage} /> */}
//                 {/* <button type="button" onClick={addImage}>
//                     Añadir Imagen
//                 </button> */}
//                 {/* <input type="hidden" {...register("images")} /> */}
//                 <br />
//                 <br />
//                 <div>
//                     {especificaciones}

//                     <select onChange={(e) => setEspecificacionSelected(e.target.value)}>
//                         <option value="445788-88">conectividad</option>
//                     </select>
//                     <button type="button" onClick={addSpecificacion}>
//                         Agregar especificacion
//                     </button>
//                     <button type="button" onClick={addSpecificacion}>
//                         Eliminar especificacion
//                     </button>
//                 </div>
//                 <br />
//                 <br />
//                 <br />
//                 <br />
//                 <div>
//                     destacados
//                     <select name="" id="">
//                         <option value="">key descacados</option>
//                     </select>
//                     <select name="" id="">
//                         <option value="">valor descacados</option>
//                     </select>
//                     <li>{/* render de especificaciones */}</li>
//                     <input type="text" name="" id="" />
//                     <button>Agregar especificacion</button>
//                     <button>eliminar especificacion</button>
//                 </div>
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
//                     <li> </li>
//                     <input type="text" name="" id="" />
//                     <button>Agregar contenido</button>
//                     <button>eliminar contenido</button>
//                 </div>
//                 <div>
//                     medidas
//                     <section>
//                         <option value="">nombre medida</option>
//                     </section>
//                     <section>
//                         <option value="">valor medida</option>
//                     </section>
//                 </div>
//                 <br />
//                 <hr />
//                 <br />
//                 <p>Hola</p>
//                 {/* // TODO: */}
//                 <h1>Opciones</h1>
//                 <select>
//                     {options.map((option) => (
//                         <option {...register("id_option_selected")} value={`${option.id}||+||${option.name}||+||${option.type}`}>
//                             {option.name}
//                         </option>
//                     ))}
//                 </select>
//                 <button onClick={handleClickAddOption}>Agregar opcion</button>
//                 {optionsFields.map((field, index) => (
//                     <div key={field.id}>
//                         {/* {} */}
//                         {/* {watch("options").some((option) => option.id == watch("options")?.[index]?.id_option) && (
//                             <p>{watch("options")?.[index]?.id_option}</p>
//                         )} */}

//                         {/* {optionsRHF.every((option) => option.id != optionsRHF[index]?.id_option) && <p>{optionsRHF[index]?.id_option}</p>} */}
//                         {/* {optionsRHF.length > 0 && optionsRHF.every((option) => option.id_option !== optionsRHF[index]?.id_option) && (
//                             <p>{optionsRHF[index]?.id_option}</p>
//                             )} */}
//                         {/* {optionsRHF.length > 0 && optionsRHF.filter((option) => option.id_option === optionsRHF[index]?.id_option).length === 1 && (
//                             <p>{optionsRHF[index]?.id_option}</p>
//                             )} */}
//                         <select {...register(`options.${index}.id_value_option`)}>
//                             {valuesOptions.map((valueOption) => (
//                                 <option value={valueOption.id}>{valueOption.value}</option>
//                             ))}
//                         </select>
//                         <p>{watch("options")?.[index]?.name_option}</p>
//                         <input {...register(`options.${index}.price`)} />

//                         {watch("options")?.[index]?.type_option == 2 && <input type="file" {...register(`options.${index}.image`)} />}
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
//                 {/* {fields.map((field, index) => (
//                     <li key={field.id}>
//                         <input {...register(`especificaciones.${index}.especificacion`)} />
//                         <input {...register(`especificaciones.${index}.especificacion`)} />
//                         <input {...register(`especificaciones.${index}.key`)} />
//                         <input {...register(`especificaciones.${index}.value`)} />
//                     </li>
//                 ))} */}
//                 {/* <input {...register(`especificaciones.${index}.especificacion`)} />
//                         <input {...register(`especificaciones.${index}.especificacion`)} />
//                         <input {...register(`especificaciones.${index}.key`)} />
//                         <input {...register(`especificaciones.${index}.value`)} /> */}
//                 {fields.map((field, index) => (
//                     <div key={field.id}>
//                         <select {...register(`specs.${index}.key`)}>
//                             {options.map((option) => (
//                                 <option value={option.id}>{option.name}</option>
//                             ))}
//                         </select>
//                         <select {...register(`specs.${index}.value`)}>
//                             {valuesOptions.map((valueOption) => (
//                                 <option value={valueOption.id}>{valueOption.value}</option>
//                             ))}
//                         </select>
//                         <input type="checkbox" {...register(`specs.${index}.type`)} />
//                     </div>
//                 ))}
//                 <button type="button" onClick={() => append({ key: "", value: "", type: false })}>
//                     append
//                 </button>
//                 {/* <div>
//                     <p>metodo de pago</p>
//                     <Select
//                         register={register}
//                         errors={errors}
//                         name="id_payment_method"
//                         items={options}
//                         type="text"
//                         selectClassName=""
//                         errorClassName="text-red-700"
//                         optionNameForShow="name"
//                     />
//                 </div> */}
//                 <br />
//                 <br />
//                 <button>Crear categoria directa</button>
//             </form>
//         </div>
//     );
// };

// export default page;
