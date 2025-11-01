// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

// hooks
import useApp from "@/app/hooks/app/useApp";
// import { zusUser } from "../zustand/user/zusUser";
const { getDateForDB } = useApp();

// import { id } from "@/app/zustand/user/zusUser";

const userAddressSchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    id_user: z.string().uuid(),
    country: z.string().min(4).max(255).optional().nullable().default(null),
    full_name: z.string().min(4).max(255),
    number: z.string().min(1).max(15).optional().nullable().default(null),
    address_1: z.string().min(1).max(255).optional().nullable().default(null),
    address_2: z.string().max(255).default("").nullable().default(null),
    neighborhood: z.string().min(1).max(255).optional().nullable().default(null),
    province: z.string().min(1).max(255).optional().nullable().default(null),
    // postal_code: z.number().min(1).max(6),
    // postal_code: z.number().min(0).max(6).optional().default(null),
    postal_code: z
        .string()
        // .trim()
        .regex(/^\d{4,6}$/, "El código postal debe tener entre 4 y 6 dígitos.")
        .optional()
        .nullable()
        .default(null),
    status: z.number().default(1),
    preferred_address: z.boolean(),
    country_id: z.string().uuid(),
    province_id: z.string().uuid(),
    municipality_id: z.string().uuid(),
    neighborhood_id: z.string().uuid(),
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
    address_details: z.string().trim().max(255, "Los detalles de la dirección no pueden tener más de 255 caracteres.").optional(), // quítalo si debe ser obligatorio
    house_number: z
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
});

export default userAddressSchema;

// const createOfferSchema = (isRequired) => {
//     return z.object({
//         id: z
//             .string()
//             .uuid()
//             .default(() => uuidv4()),
//         name: z.string().min(4).max(255),
//         description: z.string().min(4).max(255),
//         percent_discount: z.number().min(0).max(100),
//         date_start: z.string().date(),
//         date_end: z.string().date(),
//         directs_categories: z.array(z.any().optional()),
//         indirects_categories: z.array(z.any().optional()),
//         general_categories: z.array(z.any().optional()),
//         articles: z.array(z.any().optional()),
//         status: z.number().default(1),
//         image: isRequired
//             ? z.custom(
//                   (file) => {
//                       return file instanceof File && file.type.startsWith("image/");
//                   },
//                   {
//                       message: "Debes seleccionar una imagen válida",
//                   }
//               )
//             : z.union([
//                   z.string().url(),
//                   z.custom(
//                       (file) => {
//                           return file instanceof File && file.type.startsWith("image/");
//                       },
//                       {
//                           message: "Debes seleccionar una imagen válida",
//                       }
//                   ),
//               ]),
//     });
//     // .transform((data) => {
//     //     return {
//     //         ...data,
//     //         slug: data.name.toLowerCase().replace(/ /g, "-"),
//     //     };
//     // });
// };

// export default createOfferSchema;
