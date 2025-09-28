import WebSocket from "ws";
import prisma from "@repo/db";
import { validatorSockets } from "../services/validatorManager";

export async function cleanupDisconnectedValidators(): Promise<void> {
   try {
      const connectedValidators = await prisma.validator.findMany({
         where: {
            isConnected: true,
         },
      });

      for (const validator of connectedValidators) {
         const socket = validatorSockets.get(validator.id);

         // If socket doesn't exist or is closed, mark validator as disconnected
         if (!socket || socket.readyState !== WebSocket.OPEN) {
            validatorSockets.delete(validator.id);

            await prisma.validator.update({
               where: { id: validator.id },
               data: {
                  isConnected: false,
                  lastDisconnected: new Date(),
               },
            });

            console.log(
               `Validator ${validator.id} marked as disconnected during cleanup`
            );
         }
      }
   } catch (error) {
      console.error("Error during validator cleanup:", error);
   }
}

export function startCleanupTask(): void {
   // Run cleanup every 5 minutes
   setInterval(cleanupDisconnectedValidators, 5 * 60 * 1000);
}

export async function shutdownCleanup(): Promise<void> {
   // Mark all connected validators as disconnected
   try {
      await prisma.validator.updateMany({
         where: {
            isConnected: true,
         },
         data: {
            isConnected: false,
            lastDisconnected: new Date(),
         },
      });
      console.log("All validators marked as disconnected");
   } catch (error) {
      console.error(
         "Error marking validators as disconnected during shutdown:",
         error
      );
   }
}
