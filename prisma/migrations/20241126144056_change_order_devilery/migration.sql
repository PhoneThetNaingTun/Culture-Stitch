/*
  Warnings:

  - You are about to drop the column `address` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `city` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderStatus` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Delivering', 'Delivered');

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "address",
DROP COLUMN "image",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "orderStatus" "Status" NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT;
