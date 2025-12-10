// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

const periodSchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),
    start_date: z.date(),
    end_date: z.date(),
    status: z.number().default(1),
});

export default periodSchema;

// CREATE TABLE periods (
//                 id CHAR(36) NOT NULL PRIMARY KEY,
//                 start_date DATE NOT NULL,
//                 end_date DATE NOT NULL,
//                 status ENUM('open', 'closed') DEFAULT 'open',
//                 -- Fecha real del cierre contable
//                 closed_at DATETIME NULL,
//                 -- Campos opcionales pero muy útiles
//                 total_gross DECIMAL(10,2) DEFAULT 0,   -- ventas brutas del periodo
//                 total_commission DECIMAL(10,2) DEFAULT 0, -- comisiones totales
//                 total_net DECIMAL(10,2) DEFAULT 0, -- lo que se pagará a tiendas (suma de todos los payouts)
//                 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//             );
