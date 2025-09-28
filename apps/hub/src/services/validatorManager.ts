import WebSocket from "ws";
import prisma from "@repo/db";

// Keep a map of validatorId to WebSocket for sending messages
export const validatorSockets: Map<string, WebSocket> = new Map();

export async function addValidatorSocket(
   validatorId: string,
   socket: WebSocket
): Promise<void> {
   validatorSockets.set(validatorId, socket);
}

export function removeValidatorSocket(validatorId: string): void {
   validatorSockets.delete(validatorId);
}

export function getValidatorSocket(validatorId: string): WebSocket | undefined {
   return validatorSockets.get(validatorId);
}

export async function markValidatorDisconnected(
   validatorId: string
): Promise<void> {
   try {
      await prisma.validator.update({
         where: { id: validatorId },
         data: {
            isConnected: false,
            lastDisconnected: new Date(),
         },
      });
      console.log(
         `Validator ${validatorId} marked as disconnected in database`
      );
   } catch (error) {
      console.error(
         `Error updating validator ${validatorId} disconnect status:`,
         error
      );
   }
}

export async function findValidatorBySocket(
   socket: WebSocket
): Promise<string | null> {
   for (const [validatorId, validatorSocket] of validatorSockets.entries()) {
      if (validatorSocket === socket) {
         return validatorId;
      }
   }
   return null;
}
