// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

// hooks
import useApp from "../hooks/app/useApp";
const { getDate, getDateForDB } = useApp();

const optionValueSchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    id_option: z.string().uuid(),
    name: z.string().min(2).max(255),
    status: z.number().default(1),
});

export default optionValueSchema;
