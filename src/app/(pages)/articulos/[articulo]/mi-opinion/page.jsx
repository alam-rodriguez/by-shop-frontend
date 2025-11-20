"use client";

// React
import React, { use, useEffect, useRef, useState } from "react";

// Next
import { useParams, useRouter } from "next/navigation";

// Sonner
import { Toaster, toast } from "sonner";

// Hooks
import Input from "@/app/components/inputs/Input";

// Zustand
import { zusUser } from "@/app/zustand/user/zusUser";

// Icons
import { Icon } from "@iconify/react";

// React Hook Form
import { useFieldArray, useForm } from "react-hook-form";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";

// Schemas
import reviewSchema from "@/app/schemas/review.schema";

// Requests
import { useGetArticle } from "@/app/hooks/request/articles/requestsArticles";
import {
    useCreateArticleReview,
    useCreateArticleReviewImage,
    useGetLasCartItemUserOfArticle,
    useCreateArticleReviewOption,
    useGetReviewArticleUser,
} from "@/app/hooks/request/articles/requestsArticlesReviews";
import useUploadThing from "@/app/hooks/upload-thing/useUploadThing";
import { useGetCartItemOption } from "@/app/hooks/request/carts/requestsCarts";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";

const page = () => {
    const router = useRouter();
    const { uploadImages } = useUploadThing();

    const { articulo: idArticulo } = useParams();

    const { id: idUser } = zusUser();

    const { isLoading, data } = useGetArticle(idArticulo);

    const { isLoading: isLoadingLasCartItemUserOfArticle, data: dataLasCartItemUserOfArticle } = useGetLasCartItemUserOfArticle(idUser, idArticulo);

    useEffect(() => {
        console.log(dataLasCartItemUserOfArticle);
    }, [dataLasCartItemUserOfArticle]);

    const { isLoading: isLoadingCartItemOption, data: dataCartItemOption } = useGetCartItemOption(dataLasCartItemUserOfArticle?.id_cart);

    useEffect(() => {
        console.log(dataCartItemOption);
    }, [dataCartItemOption]);

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            id_article: idArticulo,
            id_user: idUser,
        },
        resolver: zodResolver(reviewSchema),
    });

    const { data: articleReviewUser, isLoading: isLoadingArticleReviewUser } = useGetReviewArticleUser(idUser, idArticulo);

    useEffect(() => {
        if (isLoadingArticleReviewUser || !articleReviewUser) return;
        console.error(articleReviewUser);
        setStars(articleReviewUser.rating);
        reset(articleReviewUser);
    }, [isLoadingArticleReviewUser, articleReviewUser]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "images",
    });

    const create = async (dataArticleReview) => {
        console.log(dataLasCartItemUserOfArticle);
        console.log(dataCartItemOption);
        // return;

        const loadingToast = toast.loading("Publicando opinión...");

        const { resStatus, resData } = await useCreateArticleReview(idUser, idArticulo, dataArticleReview);
        const idReview = resData.data.id;
        console.log(resStatus);

        console.log(dataArticleReview.images);

        const images = [];
        dataArticleReview.images.forEach((image) => {
            images.push({ imageFile: image.file, folder: "reviews", fileName: dataArticleReview.title });
        });

        console.log(images);
        let resImages = true;
        if (images.length > 0) {
            const imagesUrl = await uploadImages(images);
            console.log(imagesUrl);

            resImages = await useCreateArticleReviewImage(idReview, imagesUrl);
            console.log(resImages);
        }

        const resOptions = await useCreateArticleReviewOption(idReview, dataCartItemOption);
        console.log(resOptions);

        // TODO: MANDAR NOTIFICIONES PARE COMENTARIO

        if (resStatus == 201 && resImages && resOptions) {
            // toast.success("Hemos notificados a los administradores de tu opinion, si lo aprueban se publicara automaticamente", {
            //     id: loadingToast,
            // });
            toast.success("Tu opinio ha sido publicada correctamente", {
                id: loadingToast,
            });
            router.replace(`/articulos/${idArticulo}`);
        } else {
            toast.error("Error al crear opinión", {
                id: loadingToast,
            });
        }
    };

    const update = async (dataArticleReview) => {
        alert("Actualizar comentario");
        return;
        console.log(dataLasCartItemUserOfArticle);
        console.log(dataCartItemOption);
        // return;

        const loadingToast = toast.loading("Publicando opinión...");

        const { resStatus, resData } = await useCreateArticleReview(idUser, idArticulo, dataArticleReview);
        const idReview = resData.data.id;
        console.log(resStatus);

        console.log(dataArticleReview.images);

        const images = [];
        dataArticleReview.images.forEach((image) => {
            images.push({ imageFile: image.file, folder: "reviews", fileName: dataArticleReview.title });
        });

        console.log(images);
        let resImages = true;
        if (images.length > 0) {
            const imagesUrl = await uploadImages(images);
            console.log(imagesUrl);

            resImages = await useCreateArticleReviewImage(idReview, imagesUrl);
            console.log(resImages);
        }

        const resOptions = await useCreateArticleReviewOption(idReview, dataCartItemOption);
        console.log(resOptions);

        // TODO: MANDAR NOTIFICIONES PARE COMENTARIO

        if (resStatus == 201 && resImages && resOptions) {
            // toast.success("Hemos notificados a los administradores de tu opinion, si lo aprueban se publicara automaticamente", {
            //     id: loadingToast,
            // });
            toast.success("Tu opinio ha sido publicada correctamente", {
                id: loadingToast,
            });
            router.replace(`/articulos/${idArticulo}`);
        } else {
            toast.error("Error al crear opinión", {
                id: loadingToast,
            });
        }
    };

    const onSubmit = async (dataArticleReview) => {
        console.log(articleReviewUser);
        if (articleReviewUser) create(dataArticleReview);
        else update(dataArticleReview);
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const [stars, setStars] = useState(0);

    const handleStars = (star) => {
        setStars(star);
        setValue("rating", star);
    };

    const fileInputRef = useRef(null);

    const handleClick = () => fileInputRef.current.click();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        append({ file });
    };

    if (isLoadingLasCartItemUserOfArticle && isLoadingCartItemOption) return <LoadingParagraph />;

    return (
        <form className="m-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4 items-center">
                <img className="w-14 object-cover" src={data?.main_image} />
                <p className="text-xl font-semibold">Que tal estuvo el producto?</p>
            </div>

            <div className="flex justify-between items-center mt-10">
                <div className="flex">
                    <input type="number" {...register("rating")} value={stars} className="hidden" />
                    <Icon className="text-orange-400 w-14 h-14" icon={stars >= 1 ? "mdi:star" : "mdi-light:star"} onClick={() => handleStars(1)} />
                    <Icon className="text-orange-400 w-14 h-14" icon={stars >= 2 ? "mdi:star" : "mdi-light:star"} onClick={() => handleStars(2)} />
                    <Icon className="text-orange-400 w-14 h-14" icon={stars >= 3 ? "mdi:star" : "mdi-light:star"} onClick={() => handleStars(3)} />
                    <Icon className="text-orange-400 w-14 h-14" icon={stars >= 4 ? "mdi:star" : "mdi-light:star"} onClick={() => handleStars(4)} />
                    <Icon className="text-orange-400 w-14 h-14" icon={stars >= 5 ? "mdi:star" : "mdi-light:star"} onClick={() => handleStars(5)} />
                </div>
                <p className="text-blue-500" onClick={() => setStars(0)}>
                    Borrar
                </p>
            </div>

            <div className="flex gap-2 mt-5 flex-col">
                <p>Escribe una opinión</p>
                <Input
                    register={register}
                    errors={errors}
                    type="textarea"
                    name="comment"
                    inputClassName="border-2 border-gray-300 rounded-md p-2 h-40 max-h-40"
                    errorClassName="text-red-700"
                    placeholder="Escribe una opinión"
                />
                {/* <textarea type="text" className="border-2 border-gray-300 rounded-md p-2 h-40 max-h-40" placeholder=""></textarea> */}
            </div>

            {/* {files.length == 0 ? <div className="bg-gray-100 rounded-md border-dashed border-2 border-gray-300 flex items-center justify-center gap-2 mt-5 h-16" onClick={handleClick}>
                <Icon icon="ix:photo-camera-add" width="24" height="24" />
                <p>Compartir un video o una foto</p>
            </div> :  <>
                <div className="flex gap-2 mt-5 h-16">
                    {files.map((file, index) => (
                        <img src={URL.createObjectURL(file)} key={index} alt="Imagen subida" className="w-16 h-16 object-cover" />
                    ))}
                    <div className="bg-gray-100 rounded-md border-2 border-gray-300 grid place-items-center h-16 w-16" onClick={handleClick} >
                        <Icon icon="material-symbols:add-rounded" width="24" height="24" />
                    </div>
                </div>    
            </>}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" /> */}

            {fields.length == 0 && (
                <div
                    className="bg-gray-100 rounded-md border-dashed border-2 border-gray-300 flex items-center justify-center gap-2 mt-5 h-16"
                    onClick={handleClick}
                >
                    <Icon icon="ix:photo-camera-add" width="24" height="24" />
                    <p>Compartir un video o una foto</p>
                </div>
            )}

            {fields.length > 0 && (
                <div className="flex gap-4 mt-5 h-20 overflow-scroll">
                    {fields.map(
                        (file, index) =>
                            file.file && (
                                <div className="w-20 min-w-20 h-full relative rounded-md overflow-hidden" key={index}>
                                    <img src={URL.createObjectURL(file.file)} alt="Imagen subida" className="w-full h-full object-cover" />
                                    <Icon
                                        className="absolute top-0 right-0 text-gray-500"
                                        icon="carbon:close-filled"
                                        width="32"
                                        height="32"
                                        onClick={() => remove(index)}
                                    />
                                </div>
                            )
                    )}
                    <div
                        className="bg-gray-100 rounded-md border-2 border-gray-300 grid place-items-center h-full w-20 min-w-20"
                        onClick={handleClick}
                    >
                        <Icon icon="material-symbols:add-rounded" width="44" height="44" />
                    </div>
                </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

            <div className="flex gap-2 mt-5 flex-col">
                <p>
                    <span className="font-semibold">Ponle titulo a tu opinión</span> (obligatorio)
                </p>
                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="title"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                />
                {/* <input type="text" className="" placeholder=""></input> */}
            </div>

            <div className="flex gap-2 mt-5 flex-col">
                <p>
                    <span className="font-semibold">Cual es tu nombre publico?</span> (obligatorio)
                </p>
                <Input
                    register={register}
                    errors={errors}
                    type="text"
                    name="user_public_name"
                    inputClassName="border-2 border-gray-300 rounded-md p-2"
                    errorClassName="text-red-700"
                    placeholder=""
                />
                {/* <input type="text" className="border-2 border-gray-300 rounded-md p-2" placeholder=""></input> */}
            </div>

            {dataLasCartItemUserOfArticle && dataLasCartItemUserOfArticle.id && (
                <div className="fixed bottom-6 left-0 right-0 mx-4">
                    <button className="bg-yellow-400 text-black rounded-full p-2 w-full">Enviar</button>
                </div>
            )}
        </form>
    );
};

export default page;
