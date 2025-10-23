import React from "react";

// Request
import { createModel, getModels, updateModel } from "@/app/request/models/requestsModels";
import { createBrand, getBrands, updateBrand } from "@/app/request/brands/requestsBrands";

// Zustand
import { zusAdminBrands } from "@/app/zustand/admin/brands/zusAdminbrands";
import { zusAdminModels } from "@/app/zustand/admin/models/zusAdminModels";

const useRequestsModels = () => {
    // const { setBrands } = zusAdminBrands();
    const { setModels } = zusAdminModels();

    const useGetModels = async () => {
        const { res, data } = await getModels();
        console.log(data);
        if (data.length > 0) setModels(data.data, 1);
        else setModels(data.data, 2);
    };

    const useCreateModel = async (brand) => {
        const { res, data } = await createModel(brand);
        console.log(res);
        console.log(data);
        return res.status == 201;
    };

    const useUpdateModel = async (brand) => {
        const { res, data } = await updateModel(brand);
        console.log(res);
        console.log(data);
        return res.status == 200;
    };

    return { useGetModels, useCreateModel, useUpdateModel };
};

export default useRequestsModels;
