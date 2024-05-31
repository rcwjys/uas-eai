-- AlterTable
ALTER TABLE `user` MODIFY `user_role` ENUM('students', 'himpunan', 'lecture', 'admin') NOT NULL DEFAULT 'students';
