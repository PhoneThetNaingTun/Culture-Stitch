/*
  Warnings:

  - Added the required column `categoryTypeId` to the `ProductCategories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductCategories" ADD COLUMN     "categoryTypeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProductCategoryTypes" (
    "id" TEXT NOT NULL,
    "categroyTypeName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductCategoryTypes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductCategories" ADD CONSTRAINT "ProductCategories_categoryTypeId_fkey" FOREIGN KEY ("categoryTypeId") REFERENCES "ProductCategoryTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
