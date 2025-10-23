import React from "react";

// Icons
import { Icon } from "@iconify/react";

// Hooks
import { useGetArticleBoxContents } from "@/app/hooks/request/articles/requestsArticles";

// Components
import Divider from "@/app/components/home/Divider";

const BoxContain = ({ idArticle, boxContents }) => {
    const { data, isLoading } = useGetArticleBoxContents(idArticle);

    if (isLoading || data.length == 0) return <></>;
    return (
        <>
            <div className="m-4">
                <p className="text-xl font-semibold mb-1">Contenido de la caja</p>
                <div>
                    {data.map((content) => (
                        <p key={content.id}>
                            <Icon icon="material-symbols-light:circle" className="inline-block me-2 mb-1" style={{ fontSize: 9 }} />
                            <span className="tracking-tight">
                                {content.name} - {content.description}
                            </span>
                        </p>
                    ))}
                </div>
            </div>
            <Divider h={2.5} />
        </>
    );
};

export default BoxContain;
