import React from "react";

// Request
import { createPaymentMethod, getPaymentMethods, updatePaymentMethod } from "@/app/request/payment_methods/requestsPaymentMethods";
// import { createBrand, getBrands, updateBrand } from "@/app/request/brands/requestsBrands";

// Zustand
// import { zusAdminBrands } from "@/app/zustand/admin/brands/zusAdminbrands";
import { zusAdminPaymentMethods } from "@/app/zustand/admin/payment-methods/zusPaymentMethods";

const useRequestsPaymentMethods = () => {
    const { setPaymentMethods } = zusAdminPaymentMethods();

    const useGetPaymentMethods = async () => {
        const { res, data } = await getPaymentMethods();
        console.log(data);
        if (data.length > 0) setPaymentMethods(data.data, 1);
        else setPaymentMethods(data.data, 2);
    };

    const useCreatePaymentMethod = async (brand) => {
        const { res, data } = await createPaymentMethod(brand);
        console.log(res);
        console.log(data);
        return res.status == 201;
    };

    const useUpdatePaymentMethod = async (brand) => {
        const { res, data } = await updatePaymentMethod(brand);
        return res.status == 200;
    };

    return { useGetPaymentMethods, useCreatePaymentMethod, useUpdatePaymentMethod };
};

export default useRequestsPaymentMethods;
