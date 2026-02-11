-- CreateTable
CREATE TABLE `expenses` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `expenseDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reference` VARCHAR(191) NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NULL,
    `addedBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
