/*
  Warnings:

  - The `token_created_at` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `token_expired_at` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `token_created_at`,
    ADD COLUMN `token_created_at` INTEGER NULL,
    DROP COLUMN `token_expired_at`,
    ADD COLUMN `token_expired_at` INTEGER NULL;
