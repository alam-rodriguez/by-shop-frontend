import api from "@/app/api/api";

export const sendPushNotificationsForNewsOrders = async (orderId) => {
    try {
        const res = await api.post(`/web-push-notification/send-notification-for-news-orders/${orderId}`);
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const sendPushNotificationsToClientForOrderUpdate = async (userId, payload) => {
    try {
        const res = await api.post(`/web-push-notification/send-notification-client-update-status-order/${userId}`, { payload });
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const sendPushNotificationsToDeliveriesForNewOrder = async (payload) => {
    try {
        const res = await api.post(`/web-push-notification//send-notification-for-new-order-to-deliveries`);
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};
