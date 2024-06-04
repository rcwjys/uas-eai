/*
  Warnings:

  - You are about to drop the `votes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_candidate_id_fkey`;

-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_voter_name_fkey`;

-- DropTable
DROP TABLE `votes`;

-- CreateTable
CREATE TABLE `Vote` (
    `vote_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `voter_id` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,

    INDEX `Vote_voter_id_idx`(`voter_id`),
    INDEX `Vote_candidate_id_idx`(`candidate_id`),
    PRIMARY KEY (`vote_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_voter_id_fkey` FOREIGN KEY (`voter_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `Candidate`(`candidate_id`) ON DELETE CASCADE ON UPDATE CASCADE;
