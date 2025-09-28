import dotenv from "dotenv";
import { getEnv } from "@repo/server-utils";
dotenv.config();

export const config = {
   PORT: getEnv("PORT"),
   COST_PER_VALIDATION: Number(getEnv("COST_PER_VALIDATION")), // in lamports
};
