// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

// hooks
import useApp from "../hooks/app/useApp";
const { getDate, getDateForDB } = useApp();

const createShopSchema = (isRequired) => {
    return z.object({
        id: z
            .string()
            .uuid()
            .default(() => uuidv4()),
        name: z.string().min(4).max(255),
        description: z.string().min(4).max(255),
        type: z.number(),
        status: z.number().default(1),
        logo: z.union([
            z.custom(
                (file) => {
                    return file instanceof File && file.type.startsWith("image/");
                },
                {
                    message: "Debes seleccionar una imagen válida",
                }
            ),
            z.string().url(),
        ]),
        country_id: z.string().uuid(),
        province_id: z.string().uuid(),
        municipality_id: z.string().uuid(),
        neighborhood_id: z.string().uuid(),
        postal_code: z
            .string()
            .trim()
            .regex(/^\d{4,6}$/, "El código postal debe tener entre 4 y 6 dígitos.")
            .optional()
            .nullable()
            .default(null),
        phone_number: z
            .string()
            .trim()
            .min(7, "El número de teléfono debe tener al menos 7 dígitos.")
            .max(15, "El número de teléfono no puede tener más de 15 dígitos.")
            .regex(
                /^\+?[0-9\s\-()]{7,15}$/,
                "El número de teléfono solo puede contener números, espacios, guiones o paréntesis, y puede comenzar con '+'."
            ),
        street: z
            .string()
            .trim()
            .min(3, "La calle debe tener al menos 3 caracteres.")
            .max(255, "La calle no puede tener más de 255 caracteres.")
            .regex(/^[a-zA-ZÀ-ÿ0-9\s.,#\-]+$/, "La calle solo puede contener letras, números, espacios y los caracteres ., # o -."),
        address_details: z
            .string()
            .trim()
            .max(255, "Los detalles de la dirección no pueden tener más de 255 caracteres.")
            .optional()
            .nullable()
            .default(null),
        local_number: z
            .string()
            .trim()
            .min(1, "El número de casa debe tener al menos 1 carácter.")
            .max(50, "El número de casa no puede tener más de 50 caracteres.")
            .regex(/^[a-zA-Z0-9\s\-#/]+$/, "El número de casa solo puede contener letras, números, espacios y los caracteres -, # o /.")
            .optional()
            .nullable()
            .default(null),
        latitude: z
            .number({
                invalid_type_error: "La latitud debe ser un número.",
            })
            .min(-90, "La latitud mínima es -90.")
            .max(90, "La latitud máxima es 90."),
        longitude: z
            .number({
                invalid_type_error: "La longitud debe ser un número.",
            })
            .min(-180, "La longitud mínima es -180.")
            .max(180, "La longitud máxima es 180."),
        district_id: z.string().uuid().optional().nullable().default(null),
        // logo: isRequired
        //     ? z
        //           .any()
        //           .refine((files) => files, { message: "Debes seleccionar una imagen" })
        //           .refine((files) => files[0]?.type.startsWith("image/"), { message: "El archivo debe ser una imagen" })
        //     : z.union([
        //           z.string().url(),
        //           z
        //               .any()
        //               .optional()
        //               .refine(
        //                   (files) => {
        //                       if (!files || (files instanceof FileList && files.length === 0)) return true;
        //                       if (files instanceof FileList) {
        //                           return files[0]?.type?.startsWith("image/");
        //                       }
        //                       return false;
        //                   },
        //                   {
        //                       message: "El archivo debe ser una imagen o el campo puede estar vacío",
        //                   }
        //               ),
        //       ]),
        // create_date: z.string().default(() => getDateForDB()),
    });
};

const shopSchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    name: z.string().min(4).max(255),
    type: z.number(),
    status: z.number().default(1),
    logo: z
        .any()
        .refine((files) => files, { message: "Debes seleccionar una imagen" })
        .refine((files) => files[0]?.type.startsWith("image/"), { message: "El archivo debe ser una imagen" }),
    create_date: z.string().default(() => getDateForDB()),
});

export default createShopSchema;
