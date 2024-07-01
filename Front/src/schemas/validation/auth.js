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
