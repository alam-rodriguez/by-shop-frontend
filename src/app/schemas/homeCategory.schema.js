// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

// CREATE TABLE home_categories (
//             id CHAR(36) NOT NULL PRIMARY KEY,
//             name VARCHAR(100) NOT NULL,
//             description VARCHAR(255) NULL,
//             sort_order INT NOT NULL,
//             status TINYINT DEFAULT 1,
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         );
//         CREATE TABLE home_category_store (
//             id CHAR(36) PRIMARY KEY,
//             home_category_id CHAR(36) NOT NULL,
//             store_id CHAR(36) NOT NULL,
//             top TINYINT DEFAULT 1,
//             status TINYINT DEFAULT 1,
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//             FOREIGN KEY (home_category_id) REFERENCES home_categories(id)
//         );

const homeCategorySchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    name: z.string().min(4).max(100),
    description: z.string().max(255).optional().default(null),
    sort_order: z.number(),
    category_store: z
        .array(
            z.object({
                value: z.string().uuid(),
                label: z.string().min(1),
            })
        )
        .default([]),
    status: z.number().default(1),
});

export default homeCategorySchema;
