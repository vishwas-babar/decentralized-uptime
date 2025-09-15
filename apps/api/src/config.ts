import dotenv from "dotenv";
import { getEnv } from "@repo/server-utils";
dotenv.config();

export const config = {
  PORT: getEnv("PORT"),
  JWT_SECRET: getEnv("JWT_SECRET"),
};
