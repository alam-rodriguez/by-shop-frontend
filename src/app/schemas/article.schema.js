// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

// hooks
import useApp from "@/app/hooks/app/useApp";
const { getDateForDB } = useApp();

const createArticleSchema = (isRequired) => {
    return z
        .object({
            id_shop: z.string(),
            id: z
                .string()
                .uuid()
                .default(() => uuidv4()),
            status: z.number().default(1),
            slug: z.string().optional(),
            name: z.string().min(4).max(255),
            description: z.string().min(4),
            id_direct_category: z.string().min(1),
            // id_indirect_category: z.string().min(1),
            id_indirect_category: z.string().nullable().default(null),
            id_payment_method: z.string().nullable().default(null),
            // main_image: isRequired
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
            main_image: z.union([
                z.string().url(),
                z.custom(
                    (file) => {
                        return file instanceof File && file.type.startsWith("image/");
                    },
                    {
                        message: "Debes seleccionar una imagen válida",
                    }
                ),
            ]),
            id_model: z.string().min(1),
            view: z.number(),
            id_currency: z.string().uuid(),
            price: z.number(),
            quantity: z.number().default(1),
            // general_categories: z.array(),
            // general_categories: z
            //     .array(
            //         z.object({
            //             value: z.string(),
            //             label: z.string(),
            //         })
            //     )
            //     .nonempty("Debe seleccionar al menos una opción"),
            general_categories: z
                .array(
                    z.object({
                        value: z.string(),
                        label: z.string(),
                    })
                )
                .optional(),

            options: z.array(z.any()).optional(),
            // colors: z.array(z.string()),

            // // colors: z.string().min(1).max(55),
            // colors: z.array(z.string()),

            // type: z.number(),
            // id_seller: z.string(),
            // //! TODO: TERMINAR
            // id_return: z.string(),
            // id_protection_plan: z.string(),
            // id_metodo_pago: z.number(),
            // id_plan_proteccion: z.number(),
            // especificaciones: z.any(),
            // detalles_adicionales: z.any(),
            box_content: z
                .array(
                    z.object({
                        value: z.string(),
                        label: z.string(),
                    })
                )
                .optional(),
            specs: z.array(z.any()).optional(),
            // images: z.array(z.any()).optional(),
            images: z.any(),
            additional_details: z.string().optional(),
            highlighted_paragraphs: z.array(z.any()).optional(),
            // medidas: z.any(),

            // direct_category: z.number(),
            // indirect_category: z.number(),
            // general_categories: z.array(z.string()),
            // brand: z.string().min(1),
            created_date: z.string().default(() => getDateForDB()),
        })
        .transform((data) => {
            return {
                ...data,
                slug: data.name.toLowerCase().replace(/ /g, "-"),
            };
        });
};

export default createArticleSchema;
