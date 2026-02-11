-- CreateTable
CREATE TABLE `transaction_logs` (
    `id` VARCHAR(191) NOT NULL,
    `transactionType` ENUM('CREDIT', 'DEBIT') NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `accountName` VARCHAR(191) NOT NULL,
    `performedBy` VARCHAR(191) NOT NULL,
    `performedByEmail` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `referenceId` VARCHAR(191) NULL,
    `referenceType` VARCHAR(191) NULL,
    `projectId` VARCHAR(191) NULL,
    `projectTitle` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `transaction_logs_accountId_idx`(`accountId`),
    INDEX `transaction_logs_performedBy_idx`(`performedBy`),
    INDEX `transaction_logs_transactionType_idx`(`transactionType`),
    INDEX `transaction_logs_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
