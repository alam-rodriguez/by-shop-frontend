// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

const shopCodeSchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    shops_plans_id: z.string().uuid(),
    code: z.string().min(4).max(100),
    used_at: z.date().optional().nullable().default(null),
    status: z.number().default(1),
});

export default shopCodeSchema;
