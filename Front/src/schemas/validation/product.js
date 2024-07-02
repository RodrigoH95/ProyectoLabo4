import { z } from "zod";

export const createUpdateProductSchema = z
    .object({
        nombre: z.string().trim().min(1, "El nombre es requerido").max(40),
        descripcion: z.string().trim().min(1, "La descripción es requerida"),
        precio: z.coerce.number().min(1, "El precio es requerido"),
        stock: z.coerce.number().min(0, "El stock es requerido").default(0),
        urlImg: z.string().trim().min(1, "La url de la imagen es requerida"),
        categoria: z.string().trim().min(1, "La categoría es requerida"),
        descuento: z.coerce.number().min(0, "El descuento es requerido").max(1, "El descuento no puede ser mayor al 100%").default(0),
        puntaje: z.coerce.number().min(0, "El puntaje es requerido").max(100, "El puntaje no puede ser mayor a 100").default(0),
    })
    .required();

