// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

// hooks
import useApp from "../hooks/app/useApp";
const { getDate, getDateForDB } = useApp();

const optionSchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    name: z.string().min(4).max(55),
    id_option_category: z.string().uuid(),
    require_image: z.number().default(0),
    require_color: z.number().default(0),
    require_quantity: z.number().default(0),
    require_price: z.number().default(0),
    type: z.number().default(0),
    status: z.number().default(1),
});

export default optionSchema;
