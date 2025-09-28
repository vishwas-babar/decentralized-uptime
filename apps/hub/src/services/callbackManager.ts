import { IncomingMessage } from "@repo/schema/types";

export const CALLBACKS: {
   [callbackId: string]: (data: IncomingMessage) => void;
} = {};

export function addCallback(
   callbackId: string,
   callback: (data: IncomingMessage) => void
): void {
   CALLBACKS[callbackId] = callback;
}

export function executeCallback(
   callbackId: string,
   data: IncomingMessage
): boolean {
   const callback = CALLBACKS[callbackId];
   if (callback) {
      callback(data);
      delete CALLBACKS[callbackId];
      return true;
   }
   return false;
}

export function removeCallback(callbackId: string): void {
   delete CALLBACKS[callbackId];
}

export function setCallbackTimeout(
   callbackId: string,
   timeoutMs: number = 30000
): void {
   setTimeout(() => {
      if (CALLBACKS[callbackId]) {
         console.log(`Timeout for validation callback ${callbackId}`);
         delete CALLBACKS[callbackId];
      }
   }, timeoutMs);
}
