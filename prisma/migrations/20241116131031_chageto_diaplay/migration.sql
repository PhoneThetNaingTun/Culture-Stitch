-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "onDisplay" SET DEFAULT false;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "isArchived" DROP NOT NULL;
