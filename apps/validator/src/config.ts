import dotenv from "dotenv";
import { getEnv } from "@repo/server-utils";
dotenv.config();

export const config = {
   PORT: getEnv("VALIDATOR_PORT", "12002"),
   HUB_WS_URL: getEnv("HUB_WS_URL", "ws://localhost:8081"),
   PRIVATE_KEY: getEnv("PRIVATE_KEY"), // Solana private key as JSON array string
};
