// Zod
import z from "zod";

export const imageValidator = z.custom(
    (file) => {
        return (
            file instanceof File &&
            typeof file.type === "string" &&
            file.type.startsWith("image/") &&
            typeof file.size === "number" &&
            file.size <= 5 * 1024 * 1024 // 5MB
        );
    },
    {
        message: "Imagen inválida o muy pesada (máx 5MB)",
    }
);
