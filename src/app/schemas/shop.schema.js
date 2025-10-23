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
