// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

const shopPlanSchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    name: z.string().min(4).max(255),
    description: z.string().max(255).optional().nullable(),
    price: z.number().min(0),
    duration_days: z.number().min(1),
    commission_rate: z.number().min(0).max(100),
    rank: z.number().min(0),
    status: z.number().default(1),
});

export default shopPlanSchema;
