"use client";

import React, { use, useEffect, useRef, useState } from "react";

// react-hook-form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createShopSchema from "@/app/schemas/shop.schema";

// hooks
import useUploadThing from "@/app/hooks/upload-thing/useUploadThing.js";
import useRequestsShops from "@/app/hooks/request/shops/useRequestsShops";
import { zusAdminShops } from "@/app/zustand/admin/shops/zusAdminShops";

const page = () => {
    const wanCreate = false;

    const { uploadImage } = useUploadThing();
    const { useCreateShop, useUpdateShop } = useRequestsShops();

    const { shopSelected } = zusAdminShops();

    const [schemaIsRequired, setSchemaIsRequired] = useState(wanCreate);

    // useEffect(() => {
    //     console.log(wanCreate);
    //     console.log(schemaIsRequired);
    // }, [schemaIsRequired]);

    const shopSchema = createShopSchema(schemaIsRequired);

    const defaultValues = {
        ...shopSelected,
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: zodResolver(shopSchema),
    });

    const create = async (data) => {
        const resImage = await uploadImage(data.logo[0], "folder", "nombre.png");
        const imageUrl = resImage[0].url;
        data.logo = imageUrl;

        const res = await useUpdateShop(data);
        console.log(res);
    };
    const edit = async (data) => {
        console.log(data.logo);
        return;
        if (typeof data.logo[0] == "object") {
            // borrar nueva image y subir nueva imagen
        }

        console.log(typeof data.logo[0]);
        // const resImage = await uploadImage(data.logo[0], "folder", "nombre.png");
        // const imageUrl = resImage[0].url;
        // data.logo = imageUrl;

        // const res = await useUpdateShop(data);
        // console.log(res);
    };

    const onSubmit = async (data) => {
        edit(data);
        // if (create) create(data);
        // else edit(data);

        //     console.log(typeof data.logo[0]);
        // console.log(data);
        // return;
        // const resImage = await uploadImage(data.logo[0], "folder", "nombre.png");
        // const imageUrl = resImage[0].url;
        // data.logo = imageUrl;
        // const res = await useUpdateShop(data);
        // console.log(res);
    };

    return (
        <div className="m-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="nombre..." {...register("name")} />
                {errors.name?.message && <p className="text-red-700">{errors.name?.message}</p>}
                <br />
                <input type="file" placeholder="nombre..." {...register("logo")} onChange={() => setSchemaIsRequired(true)} />
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
