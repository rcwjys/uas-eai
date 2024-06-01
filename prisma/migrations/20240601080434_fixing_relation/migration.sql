/*
  Warnings:

  - You are about to drop the column `candidate_name` on the `votes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[candidate_id]` on the table `Votes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `candidate_id` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_candidate_name_fkey`;

-- AlterTable
ALTER TABLE `votes` DROP COLUMN `candidate_name`,
    ADD COLUMN `candidate_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Votes_candidate_id_key` ON `Votes`(`candidate_id`);

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `Candidate`(`candidate_id`) ON DELETE CASCADE ON UPDATE CASCADE;
