// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

const typeUserSchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    name: z.string().min(3).max(100),
    description: z.string().min(4).max(255),
    status: z.number().default(1),
});

export default typeUserSchema;
