// TanStack Query
import { useQuery } from "@tanstack/react-query";

// Requests
import {
    fetchCreateDeliveryApplication,
    fetchGetAllDeliveriesApplication,
    fetchGetDeliveryApplication,
    fetchGetDeliveryApplicationByApplicationId,
    fetchUpdateDeliveryStatusApplication,
} from "@/app/request/applications/requestsDeliveriesApplications";

// Hooks
import { isUUID } from "../../app/app";

export const createDeliveryApplication = async (application) => {
    const { data, status, message } = await fetchCreateDeliveryApplication(application);
    return status == 201;
};

export const getDeliveryApplication = (id) =>
    useQuery({
        queryKey: [`delivery-applications-${id}`],
        enabled: isUUID(id),
        queryFn: () => fetchGetDeliveryApplication(id),
    });

export const getDeliveryApplicationByApplicationId = (id) =>
    useQuery({
        queryKey: [`delivery-application-${id}`],
        enabled: isUUID(id),
        queryFn: () => fetchGetDeliveryApplicationByApplicationId(id),
    });

export const getAllDeliveriesApplication = () =>
    useQuery({
        queryKey: [`deliveries-applications`],
        queryFn: () => fetchGetAllDeliveriesApplication(),
    });

export const updateDeliveryStatusApplication = async (applicationId, status) => {
    const { data, status: resStatus, message } = await fetchUpdateDeliveryStatusApplication(applicationId, status);
    return resStatus == 200;
};
