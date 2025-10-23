"use client";

import React from "react";

import { useUploadThing as useUploadThingFromUploadThin } from "@/utils/uploadthing";
import useApp from "../app/useApp";
import deleteFile from "@/app/api/uploadthing/uploadDeleteFiles";

const useUploadThing = () => {
    const { changeFileName } = useApp();

    const { startUpload } = useUploadThingFromUploadThin("imageUploader", {
        onClientUploadComplete: (res) => {
            console.log("Upload completed:", res);
            alert("Upload Completed!");
        },
        onUploadError: (error) => {
            console.error("Upload failed:", error);
            alert(`Error: ${error.message}`);
        },
        onUploadProgress: (progress) => {
            console.log(`⏳ Upload progress: ${(progress * 100).toFixed(2)}%`);
            // Aquí puedes actualizar una barra de progreso en UI
        },
    });

    const { startUpload: startUploadImages } = useUploadThingFromUploadThin("imagesUploader", {
        onClientUploadComplete: (res) => {
            console.log("Upload completed:", res);
            alert("Upload Completed!");
        },
        onUploadError: (error) => {
            console.error("Upload failed:", error);
            alert(`Error: ${error.message}`);
        },
        onUploadProgress: (progress) => {
            console.log(`⏳ Upload progress: ${(progress * 100).toFixed(2)}%`);
            // Aquí puedes actualizar una barra de progreso en UI
        },
    });

    const uploadImage = async (imageFile, folder, fileName) => {
        try {
            const image = changeFileName(imageFile, `${folder}/${fileName}`);
            console.log(image);
            return await startUpload([image]);
        } catch (error) {
            console.log(error);
        }
    };

    const uploadImages = async (images) => {
        // let status = true;
        console.log(images);
        const imagesreadyForUpload = [];
        for (const image of images) {
            // if (res.status != 201) status = res.status;
            const imageForUpload = changeFileName(image.imageFile, `${image.folder}/${image.fileName}`);
            imagesreadyForUpload.push(imageForUpload);
        }
        console.log(imagesreadyForUpload);
        return await startUploadImages(imagesreadyForUpload);
    };

    const deleteImage = async (imageUrl) => {
        const imageUrlArray = imageUrl.split("/");
        const imageKey = imageUrlArray[imageUrlArray.length - 1];
        console.log(imageKey);

        // const res = await deleteFile();
    };

    const deleteImages = async (imagesUrl) => {
        const imagesKeys = [];
        imagesUrl.forEach((imageUrl) => {
            const imageUrlArray = imageUrl.split("/");
            imagesKeys.push(imageUrlArray[imageUrlArray.length - 1]);
        });
        console.log(imagesKeys);
        const res = await deleteFile(imagesKeys);
        return res.success;
    };

    return { uploadImage, uploadImages, deleteImages, deleteImage };
};

export default useUploadThing;
