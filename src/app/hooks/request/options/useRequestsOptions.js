import React from "react";

// Request
import { createOption, getOptions, updateOption } from "@/app/request/options/requestsOptions";
import { getOptionsValues, createOptionValue, updateOptionValue } from "@/app/request/options/requestsOptions";

// Zustand
import { zusAdminOptions } from "@/app/zustand/admin/options/zusAdminOptions";

const useRequestsOptions = () => {
    const { setOptions, setValuesOptions } = zusAdminOptions();

    const useGetOptions = async () => {
        const { res, data } = await getOptions();
        console.log(data);
        if (data.length > 0) setOptions(data.data, 1);
        else setOptions(data.data, 2);
    };

    const useCreateOption = async (option) => {
        const { res, data } = await createOption(option);
        console.log(res);
        console.log(data);
        return res.status == 201;
    };

    const useUpdateOption = async (option) => {
        const { res, data } = await updateOption(option);
        console.log(res);
        console.log(data);
        return res.status == 200;
    };

    const useGetOptionsValues = async () => {
        const { res, data } = await getOptionsValues();
        console.log(data);
        if (data.length > 0) setValuesOptions(data.data, 1);
        else setValuesOptions(data.data, 2);
    };

    const useCreateOptionValue = async (option) => {
        const { res, data } = await createOptionValue(option);
        console.log(res);
        console.log(data);
        return res.status == 201;
    };

    const useUpdateOptionValue = async (option) => {
        const { res, data } = await updateOptionValue(option);
        console.log(res);
        console.log(data);
        return res.status == 200;
    };

    return { useGetOptions, useCreateOption, useUpdateOption, useGetOptionsValues, useCreateOptionValue, useUpdateOptionValue };
};

export default useRequestsOptions;
