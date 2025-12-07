"use client";

import Spacer from "@/app/components/home/Spacer";
import ImageA from "@/app/components/others/ImageA";
import LoadingParagraph from "@/app/components/others/LoadingParagraph";
import { useGetChatsByUser } from "@/app/hooks/request/chats/requestsChats";
import { zusUser } from "@/app/zustand/user/zusUser";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
// uuid
import { v4 as uuidv4 } from "uuid";

const page = () => {
    const { id: userId } = zusUser();

    const router = useRouter();

    const { data } = useGetChatsByUser(userId);

    useEffect(() => {
        console.log(data);
    }, [data]);

    if (!data) return <LoadingParagraph text="Cargando chats..." />;
    return (
        <div className="m-4">
            <Spacer />
            <div className="flex gap-4">
                <Icon icon="solar:arrow-left-linear" className="text-2xl" onClick={() => router.back()} />
                <p className="font-bold text-xl">Chats abiertos</p>
            </div>
            <Spacer />
            <div className="flex flex-col gap-4">
                {data &&
                    data.map((chat) => (
                        <Chat key={chat.chat_id} userName={chat.other_user_name} userId={chat.other_user_id} userPicture={chat.other_user_picture} />
                    ))}

                {data && data.length === 0 && <p className="font-bold">Lo siento, No tienes ningun chat abierto</p>}
            </div>
        </div>
    );
};

export default page;

const Chat = ({ userName, userId, userPicture }) => {
    const router = useRouter();

    return (
        <div className="flex gap-3">
            <ImageA
                className="size-12 rounded-full"
                src={userPicture ? userPicture : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
            />

            <div className="flex flex-col justify-center">
                <p className="font-bold">{userName}</p>
                <p className="text-xs text-gray-500">+1-300-555-0135</p>
            </div>
            <button
                className="ml-auto bg-black text-white rounded-full px-4 py-1 self-center text-xs"
                onClick={() => router.push(`/usuario/chats/${userId}`)}
            >
                Entrar
            </button>
        </div>
    );
};
