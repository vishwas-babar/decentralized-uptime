import WebSocket from "ws";
import { v4 as uuid } from "uuid";
import {
   OutgoingMessage,
   IncomingMessage,
   SignupOutgoingMessage,
   ValidateOutgoingMessage,
} from "@repo/schema/types";
import { Keypair } from "@solana/web3.js";
import { signMessage } from "../utils/crypto";
import { config } from "../config";

export class ValidatorClient {
   private ws: WebSocket | null = null;
   private keypair: Keypair;
   private validatorId: string | null = null;
   private callbacks: {
      [callbackId: string]: (data: SignupOutgoingMessage) => void;
   } = {};
   private reconnectInterval: NodeJS.Timeout | null = null;
   private isShuttingDown = false;

   constructor(keypair: Keypair) {
      this.keypair = keypair;
   }

   public async connect(): Promise<void> {
      return new Promise((resolve, reject) => {
         try {
            console.log(`Connecting to hub at ${config.HUB_WS_URL}...`);
            this.ws = new WebSocket(config.HUB_WS_URL);

            this.ws.on("open", async () => {
               console.log("Connected to hub WebSocket server");
               await this.handleSignup();
               resolve();
            });

            this.ws.on("message", async data => {
               await this.handleMessage(data.toString());
            });

            this.ws.on("close", () => {
               console.log("Disconnected from hub");
               if (!this.isShuttingDown) {
                  this.scheduleReconnect();
               }
            });

            this.ws.on("error", error => {
               console.error("WebSocket error:", error);
               if (!this.isShuttingDown) {
                  this.scheduleReconnect();
               }
               reject(error);
            });
         } catch (error) {
            reject(error);
         }
      });
   }

   private async handleSignup(): Promise<void> {
      if (!this.ws) return;

      const callbackId = uuid();

      this.callbacks[callbackId] = (data: SignupOutgoingMessage) => {
         this.validatorId = data.validatorId;
         console.log(`Registered as validator: ${this.validatorId}`);
      };

      const signedMessage = await signMessage(
         `Signed message for ${callbackId}, ${this.keypair.publicKey.toBase58()}`,
         this.keypair
      );

      const message: IncomingMessage = {
         type: "signup",
         data: {
            callbackId,
            ip: "127.0.0.1", // This could be made dynamic
            publicKey: this.keypair.publicKey.toBase58(),
            signedMessage,
         },
      };

      this.ws.send(JSON.stringify(message));
   }

   private async handleMessage(data: string): Promise<void> {
      try {
         const message: OutgoingMessage = JSON.parse(data);

         if (message.type === "signup") {
            const callback = this.callbacks[message.data.callbackId];
            if (callback) {
               callback(message.data);
               delete this.callbacks[message.data.callbackId];
            }
         } else if (message.type === "validate") {
            await this.handleValidateRequest(message.data);
         }
      } catch (error) {
         console.error("Error processing message:", error);
      }
   }

   private async handleValidateRequest(
      data: ValidateOutgoingMessage
   ): Promise<void> {
      if (!this.ws || !this.validatorId) {
         console.error("Cannot validate: no connection or validator ID");
         return;
      }

      console.log(`Validating ${data.url}...`);
      const startTime = Date.now();

      try {
         const signature = await signMessage(
            `Replying to ${data.callbackId}`,
            this.keypair
         );

         // Use dynamic import for node-fetch since it's ESM
         const fetch = (await import("node-fetch")).default;
         const controller = new AbortController();
         const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

         const response = await fetch(data.url, {
            signal: controller.signal,
         });

         clearTimeout(timeoutId);

         const endTime = Date.now();
         const latency = endTime - startTime;
         const status = response.ok ? "UP" : "DOWN";

         const responseMessage: IncomingMessage = {
            type: "validate",
            data: {
               callbackId: data.callbackId,
               status,
               latency,
               websiteId: data.websiteId,
               validatorId: this.validatorId,
               signedMessage: signature,
            },
         };

         this.ws.send(JSON.stringify(responseMessage));
         console.log(
            `Validation complete for ${data.url}: ${status} (${latency}ms)`
         );
      } catch (error) {
         console.error(`Validation failed for ${data.url}:`, error);

         // Send error response
         const signature = await signMessage(
            `Replying to ${data.callbackId}`,
            this.keypair
         );
         const errorResponse: IncomingMessage = {
            type: "validate",
            data: {
               callbackId: data.callbackId,
               status: "DOWN",
               latency: Date.now() - startTime,
               websiteId: data.websiteId,
               validatorId: this.validatorId,
               signedMessage: signature,
            },
         };

         this.ws?.send(JSON.stringify(errorResponse));
      }
   }

   private scheduleReconnect(): void {
      if (this.reconnectInterval) {
         clearInterval(this.reconnectInterval);
      }

      console.log("Reconnecting in 5 seconds...");
      this.reconnectInterval = setTimeout(() => {
         this.connect().catch(error => {
            console.error("Reconnection failed:", error);
            this.scheduleReconnect();
         });
      }, 5000);
   }

   public disconnect(): void {
      this.isShuttingDown = true;

      if (this.reconnectInterval) {
         clearInterval(this.reconnectInterval);
         this.reconnectInterval = null;
      }

      if (this.ws) {
         this.ws.close();
         this.ws = null;
      }

      console.log("Validator client disconnected");
   }

   public isConnected(): boolean {
      return this.ws?.readyState === WebSocket.OPEN;
   }

   public getValidatorId(): string | null {
      return this.validatorId;
   }
}
