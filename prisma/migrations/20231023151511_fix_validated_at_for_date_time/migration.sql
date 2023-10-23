/*
  Warnings:

  - The `validated_at` column on the `check_ins` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "validated_at",
ADD COLUMN     "validated_at" TIMESTAMP(3);
