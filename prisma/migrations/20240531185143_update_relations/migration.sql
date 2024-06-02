-- CreateTable
CREATE TABLE `Aspiration_Address` (
    `aspiration_address_id` VARCHAR(191) NOT NULL,
    `aspiration_address` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Aspiration_Address_aspiration_address_key`(`aspiration_address`),
    PRIMARY KEY (`aspiration_address_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aspiration` (
    `aspiration_id` VARCHAR(191) NOT NULL,
    `aspiration_status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    `aspiration` TEXT NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `aspiration_address_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`aspiration_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Aspiration` ADD CONSTRAINT `Aspiration_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aspiration` ADD CONSTRAINT `Aspiration_aspiration_address_id_fkey` FOREIGN KEY (`aspiration_address_id`) REFERENCES `Aspiration_Address`(`aspiration_address_id`) ON DELETE CASCADE ON UPDATE CASCADE;
