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
} from "@/app/hooks/request/chats/requestsChats";
import { zusUser } from "@/app/zustand/user/zusUser";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { isUUID } from "@/app/hooks/app/app";
import { useRouter } from "next/navigation";

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
            refetchChatMessages({ queryKey: [`chats-${chatIdByParticipants}`, chatIdByParticipants] });
        }
    };

    useEffect(() => {
        if (!isUUID(userId) || !isUUID(receiverId)) return;
        getChatIdByParticipants(userId, receiverId);
    }, [userId, receiverId]);

    const handleClickSendMessage = async () => {
        console.log(text);

        // let chatId = uuidv4();

        // const { chatId: chatIdByParticipants } = await useGetChatIdByParticipants(userId, receiverId);

        // if (chatIdByParticipants) chatId = chatIdByParticipants;

        // console.log(chatIdByParticipants);

        const idChat = isUUID(chatId) ? chatId : uuidv4();

        const resChat = await useCreateChat(idChat);
        const resParticipantSender = await useCreateChatParticipant(idChat, userId);
        const resParticipantReceiver = await useCreateChatParticipant(idChat, receiverId);

        const resChatMessage = await useCreateChatMessage(idChat, userId, text);

        if (resChat && resParticipantSender && resParticipantReceiver && resChatMessage) console.log("Mensage Enviado");

        await getChatIdByParticipants(userId, receiverId);
        setText("");
        // refetchChatMessages();
        socket.emit("sendMessage", {
            chatId: idChat,
            senderId: userId,
            message: text,
        });
    };

    const { data: chatMessages, refetch: refetchChatMessages } = useGetChatMessages(chatId);

    useEffect(() => {
        console.log(chatMessages);
    }, [chatMessages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

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
            refetchChatMessages();
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage); // <-- LIMPIAR
        };
    }, []);

    return (
        <div className="relative h-screen- m-4- overflow-hidden">
            <div className="flex justify-between items-center fixed top-0 left-0 w-full p-4 bg-white z-50">
                <div className="flex gap-4 items-center">
                    <Icon icon="solar:arrow-left-linear" className="text-2xl" onClick={() => router.back()} />
                    <p>Customer Service</p>
                </div>
                <div className="flex gap-4 items-center">
                    <Icon icon="solar:phone-outline" width="24" height="24" />
                    <Icon icon="solar:menu-dots-circle-linear" width="24" height="24" />
                </div>
            </div>
            {/* <Spacer /> */}
            <div className="fixed top-0 left-0 w-full px-4 flex flex-col gap-4 overflow-scroll no-scrollbar h-screen pt-20 pb-24">
                {/* <Spacer space={100} /> */}
                <div className="bg-slate-400/25 rounded-xl px-2 py-1 self-center text-xs">
                    <span>Hoy</span>
                </div>
                {chatMessages &&
                    chatMessages.map((chatMessage) => {
                        if (userId == chatMessage.sender_id) {
                            return (
                                <div
                                    key={chatMessage.id}
                                    className="relative bg-black w-4/5 text-white rounded-xl rounded-tr-none px-2 py-1 self-end text-base"
                                >
                                    <span>{chatMessage.message}</span>
                                    <span className="absolute right-2 bottom-2 text-gray-500 text-xs">{chatMessage.hour}</span>
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={chatMessage.id}
                                    className="relative bg-slate-400/25 w-4/5 rounded-xl rounded-tl-none px-2 py-1 self-start text-base"
                                >
                                    <span className="inline-block w-4/5">{chatMessage.message}</span>
                                    <span className="absolute right-2 bottom-2 text-gray-500 text-xs">{chatMessage.hour}</span>
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
            <div className="absolute- bottom-8- w-full- flex items-center justify-between fixed bottom-0 left-0 w-full p-4 bg-white z-50">
                <div className="w-10/12 border border-black rounded-lg flex justify-between items-center p-4">
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
                    <div className="size-10 bg-black rounded-full grid place-content-center" onClick={handleClickSendMessage}>
                        <Icon icon="famicons:send" className="text-2xl text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
