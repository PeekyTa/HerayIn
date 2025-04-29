/*
  Warnings:

  - You are about to drop the column `activite_principal` on the `Artisan` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Artisan` table. All the data in the column will be lost.
  - You are about to drop the column `instagram_link` on the `Artisan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Artisan` DROP COLUMN `activite_principal`,
    DROP COLUMN `instagram`,
    DROP COLUMN `instagram_link`,
    ADD COLUMN `actPrincipal` VARCHAR(191) NOT NULL DEFAULT 'Non',
    ADD COLUMN `lien` VARCHAR(191) NULL,
    ADD COLUMN `reseauSocial` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Espace` (
    `idEspace` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `adresse` VARCHAR(191) NULL,
    `capacite` INTEGER NULL,
    `prixEspace` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idEspace`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageEspace` (
    `idImgEspace` INTEGER NOT NULL AUTO_INCREMENT,
    `img_url` VARCHAR(191) NOT NULL,
    `imageType` ENUM('PRINCIPALE', 'SECONDAIRE') NOT NULL DEFAULT 'PRINCIPALE',
    `idEspace` INTEGER NOT NULL,

    PRIMARY KEY (`idImgEspace`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreneauReserve` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idEspace` INTEGER NOT NULL,
    `idArtisan` VARCHAR(191) NOT NULL,
    `date_debut` DATETIME(3) NOT NULL,
    `date_fin` DATETIME(3) NOT NULL,
    `prix_total` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CreneauReserve_idEspace_date_debut_date_fin_idx`(`idEspace`, `date_debut`, `date_fin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ImageEspace` ADD CONSTRAINT `ImageEspace_idEspace_fkey` FOREIGN KEY (`idEspace`) REFERENCES `Espace`(`idEspace`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreneauReserve` ADD CONSTRAINT `CreneauReserve_idEspace_fkey` FOREIGN KEY (`idEspace`) REFERENCES `Espace`(`idEspace`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreneauReserve` ADD CONSTRAINT `CreneauReserve_idArtisan_fkey` FOREIGN KEY (`idArtisan`) REFERENCES `Artisan`(`idArtisan`) ON DELETE RESTRICT ON UPDATE CASCADE;
