/*
  Warnings:

  - A unique constraint covering the columns `[publicKey]` on the table `Validator` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Validator" ADD COLUMN     "isConnected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastConnected" TIMESTAMP(3),
ADD COLUMN     "lastDisconnected" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Validator_publicKey_key" ON "Validator"("publicKey");
