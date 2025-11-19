import {
    sendPushNotificationsForNewsOrders,
    sendPushNotificationsToClientForOrderUpdate,
    sendPushNotificationsToDeliveriesForNewOrder,
} from "@/app/request/web-push-notifications/webPushNotifications";

export const useSendPushNotificationsForNewsOrders = async (orderId) => {
    const { message, status } = await sendPushNotificationsForNewsOrders(orderId);
    return status == 200;
};

export const useSendPushNotificationsToClientForOrderUpdate = async (userId, payload) => {
    const { message, status } = await sendPushNotificationsToClientForOrderUpdate(userId, payload);
    return status == 201;
};

export const useSendPushNotificationsToDeliveriesForNewOrder = async () => {
    const { message, status } = await sendPushNotificationsToDeliveriesForNewOrder();
    return status == 201;
};
