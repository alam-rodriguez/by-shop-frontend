// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

// hooks
import useApp from "../hooks/app/useApp";
const { getDate, getDateForDB } = useApp();

const payMethodSchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    name: z.string().min(4).max(255),
    description: z.string().min(4).max(255),
    type: z.number().default(1),
    require_image: z.number().default(1),
    bank_name: z.string().max(55).nullable().default(null),
    is_paypal_method: z.number().default(0),
    bank_account: z.number().nullable().default(null),
    status: z.number().default(1),
});

export default payMethodSchema;
