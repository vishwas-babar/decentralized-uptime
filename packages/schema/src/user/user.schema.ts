import { z } from "zod";

export const UserSchema = z.object({
   name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
   email: z.string().email("Please enter a valid email address"),
   password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginUserSchema = z.object({
   email: UserSchema.shape.email,
   password: UserSchema.shape.password,
});

export const RegisterUserSchema = z.object({
   name: UserSchema.shape.name,
   email: UserSchema.shape.email,
   password: UserSchema.shape.password,
});
