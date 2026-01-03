// Zod
import z from "zod";

// uuid
import { v4 as uuidv4 } from "uuid";

// Validators
import { imageValidator } from "./validators";

// const deliveryApplicationSchema = z.object({
//     id: z
//         .string()
//         .uuid()
//         .default(() => uuidv4()),
//     full_name: z.string().min(4).max(100),
//     birthdate: z.string(),
//     has_license: z.boolean(),
//     has_insurance: z.boolean(),
//     vehicle_type: z.enum(["motorcycle", "car", "bicycle"]),
//     dni_number: z.string().min(4).max(20),
//     phone_number: z.string().min(7).max(15),
//     vehicle_brand: z.string().min(2).max(50),
//     vehicle_model: z.string().min(2).max(50),
//     vehicle_plate: z.string().min(2).max(20),
//     country_id: z.string().uuid(),
//     province_id: z.string().uuid(),
//     municipality_id: z.string().uuid(),
//     neighborhood_id: z.string().uuid(),
//     address_details: z
//         .string()
//         .trim()
//         .min(4, "Los detalles de la dirección deben tener al menos 4 caracteres.")
//         .max(255, "Los detalles de la dirección no pueden tener más de 255 caracteres."),
//     image_from_dni: z.union([
//         z.custom(
//             (file) => {
//                 return file instanceof File && file.type.startsWith("image/");
//             },
//             {
//                 message: "Debes seleccionar una imagen válida",
//             }
//         ),
//         z.string().url(),
//     ]),
//     image_back_dni: z.union([
//         z.custom(
//             (file) => {
//                 return file instanceof File && file.type.startsWith("image/");
//             },
//             {
//                 message: "Debes seleccionar una imagen válida",
//             }
//         ),
//         z.string().url(),
//     ]),
//     image_plate: z.union([
//         z.custom(
//             (file) => {
//                 return file instanceof File && file.type.startsWith("image/");
//             },
//             {
//                 message: "Debes seleccionar una imagen válida",
//             }
//         ),
//         z.string().url(),
//     ]),
//     status: z.enum(["pending", "approved", "rejected"]).default("pending"),
// });

const deliveryApplicationSchema = z.object({
    id: z
        .string()
        .uuid()
        .default(() => uuidv4()),

    full_name: z.string().min(4).max(100),
    dni_number: z.string().min(4).max(20),
    phone_number: z.string().min(7).max(15),
    // email: z.string().email(),

    vehicle_type: z.enum(["motorcycle", "car", "bicycle"]),
    vehicle_brand: z.string().min(2).max(50),
    vehicle_model: z.string().min(2).max(50),
    vehicle_plate: z.string().min(2).max(20),

    country_id: z.string().uuid(),
    province_id: z.string().uuid(),
    municipality_id: z.string().uuid(),
    neighborhood_id: z.string().uuid(),

    address_details: z.string().trim().min(4).max(255),

    image_from_dni: z.union([imageValidator, z.string().url()]),
    image_back_dni: z.union([imageValidator, z.string().url()]),
    image_plate: z.union([imageValidator, z.string().url()]),

    has_license: z.boolean().default(true),
    has_insurance: z.boolean().default(false),

    status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export default deliveryApplicationSchema;
