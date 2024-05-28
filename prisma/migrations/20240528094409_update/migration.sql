-- AlterTable
ALTER TABLE `user` ADD COLUMN `user_role` ENUM('students', 'himpunan', 'lecture') NOT NULL DEFAULT 'students';
