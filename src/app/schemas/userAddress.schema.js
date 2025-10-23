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
    country: z.string().min(4).max(255),
    full_name: z.string().min(4).max(255),
    number: z.string().min(1).max(15),
    address_1: z.string().min(1).max(255),
    address_2: z.string().max(255).default(""),
    neighborhood: z.string().min(1).max(255),
    province: z.string().min(1).max(255),
    // postal_code: z.number().min(1).max(6),
    postal_code: z.string().min(0).max(6).regex(/^\d*$/),
    status: z.number().default(1),
    preferred_address: z.boolean(),
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
