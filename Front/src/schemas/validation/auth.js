import { z } from "zod";

export const loginSchema = z
  .object({
    username: z.string().trim(),
    email: z.string().email().trim(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .partial({
    username: true,
    email: true,
  })
  .superRefine(({ username, email }, ctx) => {
    if (!username && !email) {
      ctx.addIssue({
        code: "custom",
        message: "Username or email is required",
        path: ["username", "email"],
      });
    }
  });

  export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Ingrese un nombre válido"),
    username: z.string().trim().min(1, "Ingrese un nombre de usuario válido"),
    email: z.string().email("El email debe ser válido").trim(),
    password: z.string().min(6, "La contraseña debe tener al menos 6 carácteres"),
  })
  .required();
