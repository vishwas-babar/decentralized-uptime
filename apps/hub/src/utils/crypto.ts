import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";

export async function verifyMessage(
   message: string,
   publicKey: string,
   signature: string
): Promise<boolean> {
   try {
      const messageBytes = nacl_util.decodeUTF8(message);
      const signatureBytes = new Uint8Array(JSON.parse(signature));
      const publicKeyBytes = new PublicKey(publicKey).toBytes();

      const result = nacl.sign.detached.verify(
         messageBytes,
         signatureBytes,
         publicKeyBytes
      );

      return result;
   } catch (error) {
      console.error("Error verifying message:", error);
      return false;
   }
}
