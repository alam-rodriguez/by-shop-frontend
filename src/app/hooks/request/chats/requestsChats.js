// uuid
import { v4 as uuidv4 } from "uuid";

// Requests
import {
    createChat,
    createChatMessage,
    createChatParticipant,
    getChatIdByParticipants,
    getChatMessages,
    getChatsByUser,
} from "@/app/request/chats/requestsChats";
import { useQuery } from "@tanstack/react-query";
import { isUUID } from "../../app/app";

export const useCreateChat = async (id) => {
    const { data, status } = await createChat(id);
    return status == 201 || 200;
};

export const useCreateChatParticipant = async (chat_id, user_id) => {
    const { data, status } = await createChatParticipant(chat_id, user_id);
    return status == 201 || 200;
};

export const useCreateChatMessage = async (chat_id, sender_id, message) => {
    const { data, status } = await createChatMessage(uuidv4(), chat_id, sender_id, message);
    return status == 201;
};

export const useGetChatMessages = (chatId) =>
    useQuery({
        queryKey: [`chats-${chatId}`],
        // staleTime: Infinity,
        enabled: isUUID(chatId),
        queryFn: () => getChatMessages(chatId),
    });

export const useGetChatIdByParticipants = async (senderId, receiverId) => {
    const { data, status, chatId } = await getChatIdByParticipants(senderId, receiverId);
    return { data, status, chatId };
};

export const useGetChatsByUser = (userId) =>
    useQuery({
        queryKey: [`chats-user-${userId}`],
        // staleTime: Infinity,
        enabled: isUUID(userId),
        queryFn: () => getChatsByUser(userId),
    });
