import WebSocket from "ws";
import { IncomingMessage } from "@repo/schema/types";
import {
   findValidatorBySocket,
   removeValidatorSocket,
   markValidatorDisconnected,
} from "../services/validatorManager";
import { executeCallback } from "../services/callbackManager";
import { handleValidatorSignup } from "../handlers/signupHandler";
import { verifyMessage } from "../utils/crypto";

export async function handleMessage(
   ws: WebSocket,
   message: string
): Promise<void> {
   try {
      const data: IncomingMessage = JSON.parse(message);

      if (data.type === "signup") {
         const verified = await verifyMessage(
            `Signed message for ${data.data.callbackId}, ${data.data.publicKey}`,
            data.data.publicKey,
            data.data.signedMessage
         );

         if (verified) {
            await handleValidatorSignup(ws, data.data);
         } else {
            console.log("Failed to verify signup message");
         }
      } else if (data.type === "validate") {
         executeCallback(data.data.callbackId, data);
      }
   } catch (error) {
      console.error("Error processing message:", error);
   }
}

export async function handleDisconnection(ws: WebSocket): Promise<void> {
   console.log("Client disconnected");

   const validatorId = await findValidatorBySocket(ws);
   if (validatorId) {
      removeValidatorSocket(validatorId);
      await markValidatorDisconnected(validatorId);
   }
}

export async function handleError(ws: WebSocket, error: Error): Promise<void> {
   console.error("WebSocket error:", error);

   const validatorId = await findValidatorBySocket(ws);
   if (validatorId) {
      removeValidatorSocket(validatorId);
      await markValidatorDisconnected(validatorId);
      console.log(
         `Validator ${validatorId} marked as disconnected due to error`
      );
   }
}
