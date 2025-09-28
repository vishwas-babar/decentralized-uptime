import z from "zod";
import { LoginUserSchema, RegisterUserSchema } from "../user/user.schema";
import { UrlSchema } from "../user/website.schema";

export type LoginUser = z.infer<typeof LoginUserSchema>;

export type RegisterUser = z.infer<typeof RegisterUserSchema>;

export * from "./session.type";
export * from "./wss.type";

export type CreateUrlSchema = z.infer<typeof UrlSchema>;
