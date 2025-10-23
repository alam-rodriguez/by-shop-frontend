import React from "react";

// Request
import { createBrand, getBrands, updateBrand } from "@/app/request/brands/requestsBrands";

// Zustand
import { zusAdminBrands } from "@/app/zustand/admin/brands/zusAdminbrands";

const useRequestsBrands = () => {
    const { setBrands } = zusAdminBrands();

    const useGetBrands = async () => {
        const { res, data } = await getBrands();
        console.log(data);
        if (data.length > 0) setBrands(data.data, 1);
        else setBrands(data.data, 2);
    };

    const useCreateBrand = async (brand) => {
        const { res, data } = await createBrand(brand);
        console.log(res);
        console.log(data);
        return res.status == 201;
    };

    const useUpdateBrand = async (brand) => {
        const { res, data } = await updateBrand(brand);
        return res.status == 200;
    };

    return { useGetBrands, useCreateBrand, useUpdateBrand };
};

export default useRequestsBrands;
