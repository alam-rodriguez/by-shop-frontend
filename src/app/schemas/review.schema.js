// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

const reviewSchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    // id_user: z.string().uuid(),
    id_user: z.string(),
    id_article: z.string().uuid(),
    user_public_name: z.string().min(4).max(255),
    title: z.string().min(4).max(255),
    rating: z.number().min(0).max(5),
    comment: z.string().min(3),
    status: z.number().default(1),
    images: z.array(z.any()),
});

export default reviewSchema;
