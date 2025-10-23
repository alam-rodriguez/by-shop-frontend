import { generateUploadButton, generateUploadDropzone, generateReactHelpers } from "@uploadthing/react";

// No es necesario importar tipos en JavaScript
export const UploadButton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();
export const { useUploadThing, uploadFiles } = generateReactHelpers();
