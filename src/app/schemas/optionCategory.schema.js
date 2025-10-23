// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

// hooks
import useApp from "../hooks/app/useApp";
const { getDate, getDateForDB } = useApp();

const optionCategorySchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    name: z.string().min(3).max(55),
    status: z.number(),
});

export default optionCategorySchema;
