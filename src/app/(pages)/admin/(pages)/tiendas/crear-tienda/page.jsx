"use client";

import React from "react";

// react-hook-form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createShopSchema from "@/app/schemas/shop.schema";

// hooks
import useUploadThing from "@/app/hooks/upload-thing/useUploadThing.js";
import useRequestsShops from "@/app/hooks/request/shops/useRequestsShops";

const page = () => {
    const { uploadImage } = useUploadThing();
    const { useCreateShop } = useRequestsShops();

    const shopSchema = createShopSchema(true);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(shopSchema),
    });

    const onSubmit = async (data) => {
        const resImage = await uploadImage(data.logo[0], "folder", "nombre.png");
        const imageUrl = resImage[0].url;

        data.logo = imageUrl;
        const res = await useCreateShop(data);
        console.log(res);
    };

    return (
        <div className="m-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="nombre..." {...register("name")} />
                {errors.name?.message && <p className="text-red-700">{errors.name?.message}</p>}
                <br />
                <input type="file" placeholder="nombre..." {...register("logo")} />
                {errors.logo?.message && <p className="text-red-700">{errors.logo?.message}</p>}
                <br />
                <select
                    type="number"
                    {...register("type", { type: "number", setValueAs: (value) => (value === "" ? undefined : parseFloat(value)) })}
                >
                    <option value={1}>normal</option>
                    <option value={2}>especia</option>
                </select>
                {errors.type?.message && <p className="text-red-700">{errors.type?.message}</p>}
                <br />
                <button type="submit">Crear Tienda</button>
            </form>
        </div>
    );
};

export default page;
