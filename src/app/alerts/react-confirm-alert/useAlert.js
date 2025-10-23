import React from "react";

// react-confirm-alert
import { confirmAlert } from "react-confirm-alert";

const useAlert = () => {
    // const confirmAlertCustom = async ({ head = "", content = "", confirmText = "Sí", confirmFn = () => {}, cancelText = "No" }) =>
    //     confirmAlert({
    //         customUI: ({ onClose }) => {
    //             return (
    //                 <div className="bg-white p-5 rounded-md shadow-md max-w-sm w-full mx-auto border text-center">
    //                     <h1 className="text-lg font-semibold mb-4 text-gray-800">{head}</h1>
    //                     <p className="mb-6 text-gray-700">{content}</p>
    //                     <div className="flex justify-center gap-4">
    //                         <button
    //                             onClick={() => {
    //                                 // confirmFn();
    //                                 onClose();
    //                                 return true;
    //                             }}
    //                             className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition"
    //                         >
    //                             {confirmText}
    //                         </button>
    //                         <button
    //                             onClick={() => {
    //                                 onClose();
    //                                 return false;
    //                             }}
    //                             className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition"
    //                         >
    //                             {cancelText}
    //                         </button>
    //                     </div>
    //                 </div>
    //             );
    //         },
    //     });

    const confirmAlertCustom = ({ head = "", content = "", confirmText = "Sí", cancelText = "No" }) => {
        return new Promise((resolve) => {
            confirmAlert({
                customUI: ({ onClose }) => {
                    const handleConfirm = () => {
                        onClose();
                        resolve(true);
                    };

                    const handleCancel = () => {
                        onClose();
                        resolve(false);
                    };

                    return (
                        <div
                            className="bg-white p-5 rounded-md shadow-md max-w-sm w-full mx-auto border text-center min-w-96"
                            style={{ minWidth: "23rem" }}
                        >
                            <h1 className="text-lg font-semibold mb-4 text-gray-800">{head}</h1>
                            <p className="mb-6 text-gray-700">{content}</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    type="button"
                                    onClick={handleConfirm}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition"
                                >
                                    {confirmText}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition"
                                >
                                    {cancelText}
                                </button>
                            </div>
                        </div>
                    );
                },
            });
        });
    };

    return { confirmAlertCustom };
};

export default useAlert;
