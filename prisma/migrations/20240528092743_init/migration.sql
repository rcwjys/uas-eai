-- CreateTable
CREATE TABLE `User` (
    `user_id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `user_email` VARCHAR(100) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,
    `user_refresh_token` VARCHAR(255) NOT NULL,
    `user_attempt` INTEGER NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_user_email_key`(`user_email`),
    UNIQUE INDEX `User_user_refresh_token_key`(`user_refresh_token`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Candidate` (
    `candidate_id` VARCHAR(191) NOT NULL,
    `candidate_name` VARCHAR(50) NOT NULL,
    `candidate_biography` TEXT NOT NULL,
    `candidate_vision` TEXT NOT NULL,
    `candidate_mission` TEXT NOT NULL,

    UNIQUE INDEX `Candidate_candidate_name_key`(`candidate_name`),
    PRIMARY KEY (`candidate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Votes` (
    `vote_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `voter_id` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Votes_voter_id_key`(`voter_id`),
    UNIQUE INDEX `Votes_candidate_id_key`(`candidate_id`),
    PRIMARY KEY (`vote_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_voter_id_fkey` FOREIGN KEY (`voter_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `Candidate`(`candidate_id`) ON DELETE CASCADE ON UPDATE CASCADE;
