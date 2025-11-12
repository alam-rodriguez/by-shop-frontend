// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

const advertisementSchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    name: z.string().min(4).max(100),
    description: z.string().min(4).max(255).optional(),
    article_id: z.string().uuid(),
    link: z.union([z.string().url(), z.string().min(1)]),
    sort_order: z.number(),
    status: z.number().default(1),
});

export default advertisementSchema;
