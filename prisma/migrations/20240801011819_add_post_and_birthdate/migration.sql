/*
  Warnings:

  - Added the required column `choiceId` to the `Statistics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Statistics" ADD COLUMN     "choiceId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_choiceId_fkey" FOREIGN KEY ("choiceId") REFERENCES "Choice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
