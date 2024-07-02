import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(40),
    userName: z.string().trim().min(1, "Username is required"),
    email: z.string().email().trim(),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().trim(),
  })
  .required()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const updateUserSchema = z
  .object({
    name: z.string().trim().max(40),
    username: z.string().trim(),
    email: z.string().email().trim(),
  })
  .partial();
