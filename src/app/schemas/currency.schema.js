// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

const currencySchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    name: z.string().min(4).max(55),
    description: z.string().min(4).max(255),
    symbol: z.string().min(1).max(55),
    exchange_rate: z.number(),
    iso_code: z.string().min(2).max(3),
    main_currency: z.number().default(1),
    status: z.number().default(1),
});

export default currencySchema;
