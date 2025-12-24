import api from "@/app/api/api";

export const createPeriod = async (period) => {
    try {
        const res = await api.post(`/periods`, period);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};

export const getActivePeriod = async () => {
    try {
        const res = await api.get(`/periods/active`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};

export const getActivePeriodByShop = async (shopId) => {
    try {
        const res = await api.get(`/periods/active/by-shop/${shopId}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};

export const fetchGetShopsActivePeriod = async () => {
    try {
        const res = await api.get(`/periods/active/shops`);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};

export const fetchGetActivePeriodsForAllShops = async () => {
    try {
        const res = await api.get(`/periods/active/all-shops`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};

export const fetchGetShopsPeriodsByPeriodId = async (periodId) => {
    try {
        const res = await api.get(`/periods/${periodId}/shops`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};

export const fetchCreatePeriodPayoutShop = async (periodPayout) => {
    try {
        const res = await api.post(`/periods/payouts/shops`, periodPayout);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};

export const fetchGetPeriods = async () => {
    try {
        const res = await api.get(`/periods`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};

export const fetchGetPeriodsByShop = async (shopId) => {
    try {
        const res = await api.get(`/periods/by-shop/${shopId}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};

export const fetchGetPeriodById = async (id) => {
    try {
        const res = await api.get(`/periods/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error crear la moneda.");
    }
};
