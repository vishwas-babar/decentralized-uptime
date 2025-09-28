import WebSocket from "ws";
import { v4 as uuid } from "uuid";
import { IncomingMessage, OutgoingMessage } from "@repo/schema/types";
import prisma from "@repo/db";
import { config } from "../config";
import { validatorSockets } from "../services/validatorManager";
import { addCallback, setCallbackTimeout } from "../services/callbackManager";
import { verifyMessage } from "../utils/crypto";

export async function startMonitoring(): Promise<void> {
   // Monitor websites every minute
   setInterval(async () => {
      try {
         const websitesToMonitor = await prisma.website.findMany({
            where: {
               disabled: false,
            },
         });

         // Get all connected validators from database
         const connectedValidators = await prisma.validator.findMany({
            where: {
               isConnected: true,
            },
         });

         if (connectedValidators.length === 0) {
            console.log("No validators available for monitoring");
            return;
         }

         console.log(
            `Monitoring ${websitesToMonitor.length} websites with ${connectedValidators.length} validators`
         );

         for (const website of websitesToMonitor) {
            connectedValidators.forEach(validator => {
               // Check if we have an active socket for this validator
               const socket = validatorSockets.get(validator.id);
               if (!socket || socket.readyState !== WebSocket.OPEN) {
                  console.log(
                     `Validator ${validator.id} socket not available, skipping`
                  );
                  return;
               }

               const callbackId = uuid();

               console.log(
                  `Sending validate request to validator ${validator.id} for ${website.url}`
               );

               const request: OutgoingMessage = {
                  type: "validate",
                  data: {
                     url: website.url,
                     callbackId,
                     websiteId: website.id,
                  },
               };

               socket.send(JSON.stringify(request));

               addCallback(callbackId, async (data: IncomingMessage) => {
                  if (data.type === "validate") {
                     const { validatorId, status, latency, signedMessage } =
                        data.data;

                     const verified = await verifyMessage(
                        `Replying to ${callbackId}`,
                        validator.publicKey,
                        signedMessage
                     );

                     if (!verified) {
                        console.log(
                           `Failed to verify response from validator ${validatorId}`
                        );
                        return;
                     }

                     try {
                        await prisma.$transaction(async tx => {
                           await tx.websiteTick.create({
                              data: {
                                 websiteId: website.id,
                                 validatorId,
                                 status,
                                 latency,
                                 createdAt: new Date(),
                              },
                           });

                           await tx.validator.update({
                              where: { id: validatorId },
                              data: {
                                 pendingPayouts: {
                                    increment: config.COST_PER_VALIDATION,
                                 },
                              },
                           });
                        });

                        console.log(
                           `Recorded tick for website ${website.url} by validator ${validatorId}: ${status} (${latency}ms)`
                        );
                     } catch (error) {
                        console.error("Error saving validation result:", error);
                     }
                  }
               });

               // Set timeout to cleanup callback if no response
               setCallbackTimeout(callbackId);
            });
         }
      } catch (error) {
         console.error("Error in monitoring interval:", error);
      }
   }, 60 * 1000); // Every minute
}
