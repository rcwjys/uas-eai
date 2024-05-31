-- AlterTable
ALTER TABLE `user` ADD COLUMN `token_created_at` DATETIME(3) NULL,
    ADD COLUMN `token_expired_at` DATETIME(3) NULL;
