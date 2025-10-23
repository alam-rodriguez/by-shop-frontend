// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

// hooks
import useApp from "@/app/hooks/app/useApp";
const { getDateForDB } = useApp();

const createOfferSchema = (isRequired) => {
    return z.object({
        id: z
            .string()
            .uuid()
            .default(() => uuidv4()),
        name: z.string().min(4).max(255),
        description: z.string().min(4).max(255),
        percent_discount: z.number().min(0).max(100),
        date_start: z.string().date(),
        date_end: z.string().date(),
        directs_categories: z.array(z.any().optional()),
        indirects_categories: z.array(z.any().optional()),
        general_categories: z.array(z.any().optional()),
        articles: z.array(z.any().optional()),
        status: z.number().default(1),
        // image: isRequired
        //     ?
        //     z
        //         .custom((file) => {
        //         return file instanceof File && file.type.startsWith("image/");
        //         }, {
        //         message: "Debes seleccionar una imagen válida",
        //         })
        //     : z.union([
        //           z.string().url(),
        //           z
        //         .custom((file) => {
        //         return file instanceof File && file.type.startsWith("image/");
        //         }, {
        //         message: "Debes seleccionar una imagen válida",
        //         })
        //       ]),
        image: z.union([
            z.custom(
                (file) => {
                    return file instanceof File && file.type.startsWith("image/");
                },
                {
                    message: "Debes seleccionar una imagen válida",
                }
            ),
            z.string().url(),
            z.null(),
        ]),
    });
    // .transform((data) => {
    //     return {
    //         ...data,
    //         slug: data.name.toLowerCase().replace(/ /g, "-"),
    //     };
    // });
};

export default createOfferSchema;
