// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

// hooks
import useApp from "@/app/hooks/app/useApp";
const { getDateForDB } = useApp();

const createCategorySchema = (isRequired) => {
    return z
        .object({
            id: z
                .string()
                .uuid()
                .default(() => uuidv4()),
            name: z.string().min(4).max(255),
            // slug: z.string().min(4).max(255),
            slug: z.string().optional(),
            description: z.string().min(4).max(255),
            color: z.string().min(1).max(55),
            view: z.number(),
            type: z.number(),
            status: z.number().default(1),
            // image: isRequired
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
            // image: isRequired
            //     ? z.custom(
            //           (file) => {
            //               return file instanceof File && file.type.startsWith("image/");
            //           },
            //           {
            //               message: "Debes seleccionar una imagen válida",
            //           }
            //       )
            //     : z.union([
            //           z.string().url(),
            //           z.custom(
            //               (file) => {
            //                   return file instanceof File && file.type.startsWith("image/");
            //               },
            //               {
            //                   message: "Debes seleccionar una imagen válida",
            //               }
            //           ),
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
            created_date: z.string().default(() => getDateForDB()),
        })
        .transform((data) => {
            return {
                ...data,
                slug: data.name.toLowerCase().replace(/ /g, "-"),
            };
        });
};

export default createCategorySchema;
