"use client";

import { io } from "socket.io-client";

// const socket = io("http://localhost:4000");
const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL_SOCKET);

// uuid
import { v4 as uuidv4 } from "uuid";

import Spacer from "@/app/components/home/Spacer";
import {
    useCreateChat,
    useCreateChatMessage,
    useCreateChatParticipant,
    useGetChatIdByParticipants,
    useGetChatMessages,
    useGetChatOtherParticipantInfo,
    useSendPushNotificationForNewMessage,
} from "@/app/hooks/request/chats/requestsChats";
import { zusUser } from "@/app/zustand/user/zusUser";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { isUUID } from "@/app/hooks/app/app";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const page = () => {
    // const { id: chatId } = useParams();
    const { id: receiverId } = useParams();
    const { id: userId } = zusUser();

    const router = useRouter();

    const bottomRef = useRef(null);

    const [text, setText] = useState("");

    const handleChaneText = (e) => setText(e.target.value);

    const [chatId, setChatId] = useState(null);

    const getChatIdByParticipants = async (senderId, receiverId) => {
        const { chatId: chatIdByParticipants } = await useGetChatIdByParticipants(senderId, receiverId);
        if (chatIdByParticipants) {
            socket.emit("joinChat", chatIdByParticipants);
            setChatId(chatIdByParticipants);
            // refetchChatMessages({ queryKey: [`chats-${chatIdByParticipants}`, chatIdByParticipants] });
        }
    };

    useEffect(() => {
        if (!isUUID(userId) || !isUUID(receiverId)) return;
        getChatIdByParticipants(userId, receiverId);
    }, [userId, receiverId]);

    const handleClickSendMessage = async () => {
        console.log(text);

        sendMessageMutation.mutate({
            sender_id: userId,
            message: text,
        });

        setText("");

        return;

        // let chatId = uuidv4();

        // const { chatId: chatIdByParticipants } = await useGetChatIdByParticipants(userId, receiverId);

        // if (chatIdByParticipants) chatId = chatIdByParticipants;

        // console.log(chatIdByParticipants);

        const idChat = isUUID(chatId) ? chatId : uuidv4();

        const resChat = await useCreateChat(idChat);
        const resParticipantSender = await useCreateChatParticipant(idChat, userId);
        const resParticipantReceiver = await useCreateChatParticipant(idChat, receiverId);

        const resChatMessage = await useCreateChatMessage(idChat, userId, text);

        // const payloadPushNotification = {
        //     title: "Nuevo Mensaje",
        //     body: text,
        //     url: "",
        // };

        const payloadPushNotification = {
            title: otherParticipant.name,
            body: text,
            url: `/usuario/chats/${receiverId}`, // Para abrir el chat directo
        };

        const resPushNotificatoin = await useSendPushNotificationForNewMessage(receiverId, payloadPushNotification);

        if (resChat && resParticipantSender && resParticipantReceiver && resChatMessage && resPushNotificatoin) console.log("Mensage Enviado");

        await getChatIdByParticipants(userId, receiverId);

        // refetchChatMessages();
        socket.emit("sendMessage", {
            chatId: idChat,
            senderId: userId,
            message: text,
        });
    };

    const sendMessageToBackend = async (message) => {
        const text = message.message;

        const idChat = isUUID(chatId) ? chatId : uuidv4();

        let resCreateChat = true;

        if (chatId != idChat) {
            const resChat = await useCreateChat(idChat);
            const resParticipantSender = await useCreateChatParticipant(idChat, userId);
            const resParticipantReceiver = await useCreateChatParticipant(idChat, receiverId);
            await getChatIdByParticipants(userId, receiverId);

            resCreateChat = resChat && resParticipantSender && resParticipantReceiver;
        }

        const resChatMessage = await useCreateChatMessage(idChat, userId, text);

        const payloadPushNotification = {
            title: otherParticipant.name,
            body: text,
            url: `/usuario/chats/${receiverId}`, // Para abrir el chat directo
        };

        if (!(resCreateChat && resChatMessage)) {
            toast.error("Error al enviar mensaje");
            router.prefetch();
            return;
        }

        socket.emit("sendMessage", {
            chatId: idChat,
            senderId: userId,
            message: text,
        });
        await useSendPushNotificationForNewMessage(receiverId, payloadPushNotification);
    };

    const { data: otherParticipant } = useGetChatOtherParticipantInfo(receiverId);

    // const { data: backendMessages, refetch: refetchChatMessages } = useGetChatMessages(chatId);

    const { data: backendMessages = [] } = useGetChatMessages(chatId);

    const [localMessages, setLocalMessages] = useState([]);

    let allMessages = [...backendMessages, ...localMessages]
        .filter((m) => m && m.created_at) // elimina undefined o mensajes sin fecha
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    // allMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    // allMessages = [...allMessages].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    const sendMessageMutation = useMutation({
        mutationFn: sendMessageToBackend,
        onMutate: async (newMessage) => {
            setLocalMessages((prev) => [
                ...prev,
                {
                    ...newMessage,
                    id: uuidv4(), // ID temporal
                    created_at: new Date().toISOString(),
                    hour: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
            ]);
        },
    });

    // const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        console.log(allMessages);
    }, [backendMessages, localMessages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [backendMessages, localMessages]);

    // socket.on("sendMessage", (data) => {
    //     const { chatId, message, senderId } = data;

    //     io.to(`chat_${chatId}`).emit("newMessage", {
    //         senderId,
    //         message,
    //         created_at: new Date(),
    //     });
    // });
    // socket.on("newMessage", (data) => {
    //     console.log("Nuevo mensaje recibido:", data);
    //     refetchChatMessages();

    //     // ejemplo: actualizar estado
    //     // setChatMessages((prev) => [...prev, data]);
    // });

    useEffect(() => {
        const handleNewMessage = (data) => {
            console.log("Nuevo mensaje recibido:", data);
            if (data.senderId != userId) {
                const newMessage = {
                    id: crypto.randomUUID(), // si el backend no envía id único
                    chat_id: data.chatId,
                    sender_id: data.senderId,
                    message: data.message,
                    created_at: new Date().toISOString(),
                    hour: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    isPending: false,
                };
                setLocalMessages((prev) => [...prev, newMessage]);
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage); // <-- LIMPIAR
        };
    }, [userId]);

    function formatChatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();

        // Resetear horas para comparar solo fechas
        const d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const d2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const diffTime = d1 - d2;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        // 0 = hoy
        if (diffDays === 0) {
            return "Hoy";
        }

        // 1 = ayer
        if (diffDays === 1) {
            return "Ayer";
        }

        // Si es este mismo año → "20 de julio"
        const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

        if (date.getFullYear() === now.getFullYear()) {
            return `${date.getDate()} de ${months[date.getMonth()]}`;
        }

        // Si es de otro año → "20/07/2023"
        return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
    }

    function isDifferentDay(date1, date2) {
        return date1.getDate() !== date2.getDate() || date1.getMonth() !== date2.getMonth() || date1.getFullYear() !== date2.getFullYear();
    }

    return (
        <div className="relative h-screen- m-4- overflow-hidden">
            <div className="flex justify-between items-center fixed top-0 left-0 w-full p-4 bg-white- bg-gray-100 z-50">
                <div className="flex gap-4 items-center">
                    <Icon icon="solar:arrow-left-linear" className="text-2xl" onClick={() => router.back()} />
                    <p>{otherParticipant && otherParticipant.name}</p>
                </div>
                <div className="flex gap-4 items-center">
                    <Icon icon="solar:phone-outline" width="24" height="24" />
                    <Icon icon="solar:menu-dots-circle-linear" width="24" height="24" />
                </div>
            </div>
            {/* <Spacer /> */}
            <div className="fixed top-0 left-0 w-full px-4 flex flex-col gap-4 overflow-scroll no-scrollbar h-screen pt-20 pb-24">
                {/* <Spacer space={100} /> */}
                {/* <div className="bg-slate-400/25 rounded-xl px-2 py-1 self-center text-xs">
                    <span>Hoy</span>
                </div> */}
                {/* {lastMessage &&
                    (() => {
                        const currentDate = new Date(lastMessage.created_at);
                        const previousDate = index > 0 ? new Date(messages[index - 1].created_at) : null;

                        const mustShowDate = index === 0 || isDifferentDay(currentDate, previousDate);

                        const isMine = userId === lastMessage.sender_id;

                        return (
                            <div key={lastMessage.id}>
                                {mustShowDate && (
                                    <div className="grid place-content-center mb-4">
                                        <div className="bg-slate-400/25 rounded-xl px-2 py-1 inline-block text-xs">
                                            <span>{formatChatDate(lastMessage.created_at)}</span>
                                        </div>
                                    </div>
                                )}

                                {isMine ? (
                                    <div className="flex justify-end">
                                        <div className="relative bg-black w-4/5 text-white rounded-xl rounded-tr-none px-2 py-1 text-base">
                                            <span>{lastMessage.message}</span>
                                            <span className="absolute right-2 bottom-2 text-gray-500 text-xs">{lastMessage.hour}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-start">
                                        <div className="relative bg-slate-400/25 w-4/5 rounded-xl rounded-tl-none px-2 py-1 text-base">
                                            <span className="inline-block w-4/5">{lastMessage.message}</span>
                                            <span className="absolute right-2 bottom-2 text-gray-500 text-xs">{lastMessage.hour}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })()} */}
                {allMessages &&
                    allMessages.map((chatMessage, index) => {
                        const currentDate = new Date(chatMessage.created_at);
                        const previousDate = index > 0 ? new Date(allMessages[index - 1].created_at) : null;

                        const mustShowDate = index === 0 || isDifferentDay(currentDate, previousDate);

                        if (userId == chatMessage.sender_id) {
                            return (
                                <div key={chatMessage.id}>
                                    {mustShowDate && (
                                        <div className="grid place-content-center mb-4">
                                            <div className="bg-slate-400/25 rounded-xl px-2 py-1 inline-block text-xs">
                                                <span>{formatChatDate(chatMessage.created_at)}</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-end">
                                        <div className="relative right-0 bg-black w-4/5 text-white rounded-xl rounded-tr-none px-2 py-1 self-end text-base">
                                            <span>{chatMessage.message}</span>
                                            <span className="absolute right-2 bottom-2 text-gray-500 text-xs ">{chatMessage.hour}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={chatMessage.id}>
                                    {/* {mustShowDate && <div className="text-center text-gray-500 my-4">{formatChatDate(chatMessage.created_at)}</div>} */}
                                    {mustShowDate && (
                                        <div className="grid place-content-center mb-4">
                                            <div className="bg-slate-400/25 rounded-xl px-2 py-1 inline-block text-xs">
                                                <span>{formatChatDate(chatMessage.created_at)}</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-start">
                                        <div className="relative bg-slate-400/25 w-4/5 rounded-xl rounded-tl-none px-2 py-1 self-start text-base">
                                            <span className="inline-block w-4/5">{chatMessage.message}</span>
                                            <span className="absolute right-2 bottom-2 text-gray-500 text-xs">{chatMessage.hour}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                <div ref={bottomRef} />
                {/* <div className="relative bg-slate-400/25 w-4/5 rounded-xl rounded-tl-none px-2 py-1 self-start text-base">
                    <span className="inline-block w-4/5">Hello, good morning</span>
                    <span className="absolute right-2 bottom-2 text-gray-500 text-xs">09:41</span>
                </div>
                <div className="relative bg-slate-400/25 w-4/5 rounded-xl rounded-tl-none px-2 py-1 self-start text-base">
                    <span className="inline-block w-4/5">I am a customer service. Is there anything i can help you with?</span>
                    <span className="absolute right-2 bottom-2 text-gray-500 text-xs">09:41</span>
                </div>
                <div className="relative bg-black w-4/5 text-white rounded-xl rounded-tr-none px-2 py-1 self-end text-base">
                    <span>Hi im having problems with mt order & payment</span>
                    <span className="absolute right-2 bottom-2 text-gray-500 text-xs">09:41</span>
                </div>
                <div className="relative bg-black w-4/5 text-white rounded-xl rounded-tr-none px-2 py-1 self-end text-base">
                    <span>Can you help me?</span>
                    <span className="absolute right-2 bottom-2 text-gray-500 text-xs">09:41</span>
                </div>
                <div className="relative bg-slate-400/25 w-4/5 rounded-xl rounded-tl-none px-2 py-1 self-start text-base">
                    <span className="inline-block w-4/5">Hello, good morning</span>
                    <span className="absolute right-2 bottom-2 text-gray-500 text-xs">09:41</span>
                </div>
                <div className="relative bg-slate-400/25 w-4/5 rounded-xl rounded-tl-none px-2 py-1 self-start text-base">
                    <span className="inline-block w-4/5">I am a customer service. Is there anything i can help you with?</span>
                    <span className="absolute right-2 bottom-2 text-gray-500 text-xs">09:41</span>
                </div> */}
            </div>
            {/* <Spacer /> */}
            <div className="absolute- bottom-8- w-full- flex items-center justify-between fixed bottom-0 left-0 w-full p-4 bg-white_ bg-gray-100 z-50">
                <div className="w-10/12 border border-black rounded-lg flex justify-between items-center p-4_ p-2">
                    <input
                        className="border-none outline-none bg-transparent focus:outline-none focus:ring-0 appearance-none"
                        type="text"
                        value={text}
                        placeholder="Escribe..."
                        onChange={handleChaneText}
                    />
                    <Icon icon="stash:image" className="text-2xl" />
                </div>
                <div className="w-2/12 flex justify-end">
                    <div
                        className="size-10 bg-black rounded-full grid place-content-center"
                        onClick={text.length > 0 ? handleClickSendMessage : null}
                    >
                        <Icon icon="famicons:send" className="text-2xl text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
