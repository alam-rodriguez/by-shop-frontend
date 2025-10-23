// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

// hooks
import useApp from "@/app/hooks/app/useApp";
const { getDateForDB } = useApp();

const generalCategoryGroupSchema = z
    .object({
        id: z
            .string()
            .uuid()
            .default(() => uuidv4()),
        name: z.string().min(4).max(255),
        slug: z.string().optional(),
        description: z.string().min(4).max(255),
        status: z.number().default(1),
        general_categories: z.array(z.any()).optional(),
    })
    .transform((data) => {
        return {
            ...data,
            slug: data.name.toLowerCase().replace(/ /g, "-"),
        };
    });

export default generalCategoryGroupSchema;
