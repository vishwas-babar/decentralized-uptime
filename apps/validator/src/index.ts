import express, { Request, Response } from "express";
import { config } from "./config";
import { createKeypairFromEnv } from "./utils/crypto";
import { ValidatorClient } from "./services/validatorClient";

const app = express();

// Middleware
app.use(express.json());

let validatorClient: ValidatorClient | null = null;

// Initialize validator client
async function initializeValidator() {
   try {
      if (!config.PRIVATE_KEY) {
         throw new Error("PRIVATE_KEY environment variable is required");
      }

      const keypair = createKeypairFromEnv(config.PRIVATE_KEY);
      validatorClient = new ValidatorClient(keypair);

      await validatorClient.connect();
      console.log("✅ Validator client connected to hub");
   } catch (error) {
      console.error("❌ Failed to initialize validator:", error);
      process.exit(1);
   }
}

// Start server
app.listen(Number(config.PORT), () => {
   console.log(
      `✅ Validator HTTP Server running at http://localhost:${config.PORT}`
   );

   // Initialize validator client after HTTP server starts
   initializeValidator();
});

// Graceful shutdown
process.on("SIGINT", () => {
   console.log("Shutting down validator service...");

   if (validatorClient) {
      validatorClient.disconnect();
   }

   process.exit(0);
});

process.on("SIGTERM", () => {
   console.log("Shutting down validator service...");

   if (validatorClient) {
      validatorClient.disconnect();
   }

   process.exit(0);
});
