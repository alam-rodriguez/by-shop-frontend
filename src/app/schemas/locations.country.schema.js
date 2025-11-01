// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

const locationCountrySchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    name: z.string().min(4).max(100),
    description: z.string().max(255).optional(),
    iso_code: z.string().min(2).max(10),
    latitude: z.number().min(-90, "Latitude cannot be less than -90").max(90, "Latitude cannot be greater than 90").optional(),
    longitude: z.number().min(-180, "Longitude cannot be less than -180").max(180, "Longitude cannot be greater than 180").optional(),
    status: z.number().default(1),
});

export default locationCountrySchema;
