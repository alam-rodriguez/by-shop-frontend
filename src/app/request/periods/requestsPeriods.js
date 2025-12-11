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
