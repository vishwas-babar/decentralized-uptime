import { Keypair } from "@solana/web3.js";

import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'

export async function signMessage(
   message: string,
   keypair: Keypair
): Promise<string> {
   const messageBytes = naclUtil.decodeUTF8(message);
   const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
   return JSON.stringify(Array.from(signature));
}

export function createKeypairFromEnv(privateKeyEnv: string): Keypair {
   if (!privateKeyEnv) {
      throw new Error("PRIVATE_KEY environment variable is required");
   }

   try {
      const privateKeyArray = JSON.parse(privateKeyEnv);
      return Keypair.fromSecretKey(Uint8Array.from(privateKeyArray));
   } catch (error) {
      throw new Error(
         "Invalid PRIVATE_KEY format. Expected JSON array of numbers."
      );
   }
}

