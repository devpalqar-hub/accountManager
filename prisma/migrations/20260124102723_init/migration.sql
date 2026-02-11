-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN') NOT NULL DEFAULT 'ADMIN',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `clientDetails` TEXT NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `description` TEXT NULL,
    `status` VARCHAR(191) NULL DEFAULT 'ACTIVE',
    `budget` DECIMAL(10, 2) NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_packages` (
    `id` VARCHAR(191) NOT NULL,
    `workPackageName` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `version` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NULL,
    `completionDate` DATETIME(3) NULL,
    `advanceAmount` DECIMAL(10, 2) NULL,
    `miscellaneousAmount` DECIMAL(10, 2) NULL,
    `ongoingCost` DECIMAL(10, 2) NULL,
    `status` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD') NULL DEFAULT 'PENDING',
    `description` TEXT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `accountName` VARCHAR(191) NOT NULL,
    `accountHolderName` VARCHAR(191) NOT NULL,
    `bankName` VARCHAR(191) NULL,
    `accountNumber` VARCHAR(191) NULL,
    `ifscCode` VARCHAR(191) NULL,
    `accountType` VARCHAR(191) NULL,
    `openingBalance` DECIMAL(10, 2) NULL,
    `currentBalance` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` TEXT NULL,
    `transactionRef` VARCHAR(191) NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `addedBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_packages` ADD CONSTRAINT `work_packages_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
