const bs58 = require("bs58").default;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// --- IMPORTANT ---
// 1. Paste your Base58 private key string here.
// 2. RUN THIS SCRIPT ONCE to create the id.json file.
// 3. DO NOT save this file with your key in it to public places like GitHub.
const base58PrivateKey = process.env.PRIVATE_KEY;

try {
   // Decode the Base58 string into a byte array (Uint8Array)
   const secretKeyBytes = bs58.decode(base58PrivateKey);

   if (secretKeyBytes.length !== 64) {
      console.error(
         "Error: Invalid private key. The decoded key should be 64 bytes long."
      );
      // Optional: Log the actual length to help debug
      console.error(`Decoded key length is: ${secretKeyBytes.length}`);
   } else {
      // Convert the Uint8Array to a regular JavaScript array to be stringified
      const jsonString = JSON.stringify(Array.from(secretKeyBytes));

      // Write the JSON array to the id.json file
      fs.writeFileSync("id.json", jsonString);

      console.log("Successfully created id.json from your Base58 private key!");
   }
} catch (error) {
   console.error(
      "Failed to decode the Base58 private key. Please ensure it is correct.",
      error.message
   );
}
