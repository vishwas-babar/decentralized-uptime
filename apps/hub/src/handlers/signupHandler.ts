import WebSocket from "ws";
import { SignupIncomingMessage, OutgoingMessage } from "@repo/schema/types";
import prisma from "@repo/db";
import { addValidatorSocket } from "../services/validatorManager";

export async function handleValidatorSignup(
   ws: WebSocket,
   { ip, publicKey, signedMessage, callbackId }: SignupIncomingMessage
): Promise<void> {
   try {
      let validator = await prisma.validator.findFirst({
         where: {
            publicKey,
         },
      });

      if (validator) {
         // Update existing validator as connected
         validator = await prisma.validator.update({
            where: { id: validator.id },
            data: {
               isConnected: true,
               lastConnected: new Date(),
               ip, // Update IP in case it changed
            },
         });

         const response: OutgoingMessage = {
            type: "signup",
            data: {
               validatorId: validator.id,
               callbackId,
            },
         };

         ws.send(JSON.stringify(response));

         // Store the socket connection
         await addValidatorSocket(validator.id, ws);

         console.log(`Existing validator ${validator.id} reconnected`);
         return;
      }

      // Create new validator
      validator = await prisma.validator.create({
         data: {
            ip,
            publicKey,
            location: "unknown",
            isConnected: true,
            lastConnected: new Date(),
         },
      });

      const response: OutgoingMessage = {
         type: "signup",
         data: {
            validatorId: validator.id,
            callbackId,
         },
      };

      ws.send(JSON.stringify(response));

      // Store the socket connection
      await addValidatorSocket(validator.id, ws);

      console.log(`New validator ${validator.id} registered`);
   } catch (error) {
      console.error("Error in signup handler:", error);
   }
}
