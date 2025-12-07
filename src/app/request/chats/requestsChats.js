import api from "@/app/api/api";

export const createChat = async (id) => {
    try {
        const res = await api.post(`/chats`, { id });
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const createChatParticipant = async (chat_id, user_id) => {
    try {
        const res = await api.post(`/chats/participants`, { chat_id, user_id });
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const createChatMessage = async (id, chat_id, sender_id, message) => {
    try {
        const res = await api.post(`/chats/message`, { id, chat_id, sender_id, message });
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const getChatMessages = async (chatId) => {
    try {
        const res = await api.get(`/chats/${chatId}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const getChatIdByParticipants = async (senderId, receiverId) => {
    try {
        const res = await api.get(`/chats/get-id/${senderId}/${receiverId}`);
        return { status: res.status, data: res.data.data, message: res.data.message, chatId: res.data.chatId };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener la monedas.");
    }
};

export const getChatsByUser = async (userId) => {
    try {
        const res = await api.get(`/chats/user/${userId}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};
