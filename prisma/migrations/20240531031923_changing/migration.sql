/*
  Warnings:

  - You are about to drop the column `candidate_id` on the `votes` table. All the data in the column will be lost.
  - You are about to drop the column `voter_id` on the `votes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[voter_name]` on the table `Votes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[candidate_name]` on the table `Votes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `candidate_name` to the `Votes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voter_name` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_candidate_id_fkey`;

-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_voter_id_fkey`;

-- AlterTable
ALTER TABLE `votes` DROP COLUMN `candidate_id`,
    DROP COLUMN `voter_id`,
    ADD COLUMN `candidate_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `voter_name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Votes_voter_name_key` ON `Votes`(`voter_name`);

-- CreateIndex
CREATE UNIQUE INDEX `Votes_candidate_name_key` ON `Votes`(`candidate_name`);

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_voter_name_fkey` FOREIGN KEY (`voter_name`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_candidate_name_fkey` FOREIGN KEY (`candidate_name`) REFERENCES `Candidate`(`candidate_name`) ON DELETE CASCADE ON UPDATE CASCADE;
