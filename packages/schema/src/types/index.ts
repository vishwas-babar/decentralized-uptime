import z from "zod";
import { LoginUserSchema, RegisterUserSchema } from "../user/user.schema";

export type LoginUser = z.infer<typeof LoginUserSchema>;

export type RegisterUser = z.infer<typeof RegisterUserSchema>;

export * from "./session.type";
