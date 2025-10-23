import React from "react";

// Icons
import { Icon } from "@iconify/react";

const Note = ({ note }) => {
    return (
        <div className="m-4">
            {note != "" && (
                <p className="tracking-tighter-">
                    <span className="font-semibold">Nota:</span>
                    {note}
                </p>
            )}

            <p className="mt-5">
                <Icon icon="uil:comment-alt-message" className="inline-block text-gray-500 text-2xl me-3" />
                <span className="text-blue-800">Informar de un problema con este producto o vendedor</span>
            </p>
        </div>
    );
};

export default Note;
