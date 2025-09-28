import { startServer } from "./server";

// Start the hub server
startServer().catch(error => {
   console.error("Failed to start hub server:", error);
   process.exit(1);
});
