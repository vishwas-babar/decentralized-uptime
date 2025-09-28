import WebSocket from "ws";
import { config } from "./config";
import {
   handleMessage,
   handleDisconnection,
   handleError,
} from "./handlers/websocketHandlers";
import { startMonitoring } from "./services/monitoringService";
import { startCleanupTask, shutdownCleanup } from "./services/cleanupService";

export function createWebSocketServer(): WebSocket.Server {
   const wss = new WebSocket.Server({ port: Number(config.PORT) });

   console.log(`Hub WebSocket server started on port ${config.PORT}`);

   wss.on("connection", ws => {
      console.log("New client connected");

      ws.on("message", async message => {
         await handleMessage(ws, message.toString());
      });

      ws.on("close", async () => {
         await handleDisconnection(ws);
      });

      ws.on("error", async error => {
         await handleError(ws, error);
      });
   });

   return wss;
}

export async function startServer(): Promise<void> {
   // Create WebSocket server
   const wss = createWebSocketServer();

   // Start monitoring service
   await startMonitoring();

   // Start cleanup tasks
   startCleanupTask();

   // Graceful shutdown
   process.on("SIGINT", async () => {
      console.log("Shutting down hub server...");

      await shutdownCleanup();

      wss.close(() => {
         process.exit(0);
      });
   });
}
