import api from "@/app/api/api";

export const fetchGetPeriodsForDelivery = async (deliveryId) => {
    try {
        const res = await api.get(`/periods/for-delivery/${deliveryId}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};

export const fetchGetPeriodByIdAndDeliveryUserId = async (periodId, deliveryId) => {
    try {
        const res = await api.get(`/periods/${periodId}/delivery/${deliveryId}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};

export const fetchCreatePeriodPayoutDelivery = async (periodPayout) => {
    try {
        const res = await api.post(`/periods/payouts/deliveries`, periodPayout);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};
