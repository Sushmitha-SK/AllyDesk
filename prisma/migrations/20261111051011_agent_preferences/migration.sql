-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "aiDraftsEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "pendingAfterReply" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "signature" TEXT;
