import { email, z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6),
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
