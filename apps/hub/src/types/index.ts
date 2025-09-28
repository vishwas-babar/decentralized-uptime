import WebSocket from "ws";

export interface ValidatorSocket {
   validatorId: string;
   socket: WebSocket;
   publicKey: string;
}

export interface CallbackFunction {
   (data: any): void;
}

export interface CallbackMap {
   [callbackId: string]: CallbackFunction;
}
