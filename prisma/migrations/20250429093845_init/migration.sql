-- CreateTable
CREATE TABLE `Utilisateur` (
    `idUser` VARCHAR(191) NOT NULL,
    `nomUser` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mdp` VARCHAR(191) NOT NULL,
    `statuCmx` VARCHAR(191) NULL,

    UNIQUE INDEX `Utilisateur_email_key`(`email`),
    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visiteur` (
    `idVisiteur` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Visiteur_idUser_key`(`idUser`),
    PRIMARY KEY (`idVisiteur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `idAdmin` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_idUser_key`(`idUser`),
    PRIMARY KEY (`idAdmin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Membre` (
    `idMembre` VARCHAR(191) NOT NULL,
    `numGSM` INTEGER NOT NULL,
    `photoProfil` VARCHAR(191) NULL,
    `idUser` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Membre_idUser_key`(`idUser`),
    PRIMARY KEY (`idMembre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artisan` (
    `idArtisan` VARCHAR(191) NOT NULL,
    `specialite` VARCHAR(191) NOT NULL,
    `experience` INTEGER NOT NULL,
    `tel` INTEGER NOT NULL,
    `photo` VARCHAR(191) NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `ville` VARCHAR(191) NOT NULL,
    `workshop` BOOLEAN NOT NULL DEFAULT false,
    `activite_principal` VARCHAR(191) NOT NULL,
    `certificat` VARCHAR(191) NULL,
    `marque` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `instagram_link` VARCHAR(191) NULL,
    `decouverte` VARCHAR(191) NULL,
    `autre_source` VARCHAR(191) NULL,
    `is_approved` BOOLEAN NOT NULL DEFAULT false,
    `idUser` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Artisan_idUser_key`(`idUser`),
    PRIMARY KEY (`idArtisan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FAQ` (
    `idFAQ` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `reponse` VARCHAR(191) NOT NULL,
    `cree_a` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiee_a` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idFAQ`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `idArticle` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(191) NOT NULL,
    `dateArticle` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `contenuArticle` VARCHAR(191) NOT NULL,
    `imageArticle` VARCHAR(191) NULL,

    PRIMARY KEY (`idArticle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Atelier` (
    `idAtelier` INTEGER NOT NULL AUTO_INCREMENT,
    `nomAtelier` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `dateDebut` DATETIME(3) NOT NULL,
    `lieu` VARCHAR(191) NOT NULL,
    `duree` INTEGER NOT NULL,
    `places_dispo` INTEGER NOT NULL,
    `prix` INTEGER NOT NULL,
    `imgAtelier` VARCHAR(191) NULL,
    `idArtisan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idAtelier`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `idReservation` VARCHAR(191) NOT NULL,
    `dateReservation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idAtelier` INTEGER NOT NULL,
    `idMembre` VARCHAR(191) NULL,
    `idArtisan` VARCHAR(191) NULL,

    PRIMARY KEY (`idReservation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feedback` (
    `idFeedback` INTEGER NOT NULL AUTO_INCREMENT,
    `note` INTEGER NOT NULL,
    `commentaire` VARCHAR(191) NULL,
    `idAtelier` INTEGER NOT NULL,
    `idMembre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idFeedback`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Visiteur` ADD CONSTRAINT `Visiteur_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Utilisateur`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Utilisateur`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Membre` ADD CONSTRAINT `Membre_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Utilisateur`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artisan` ADD CONSTRAINT `Artisan_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Utilisateur`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atelier` ADD CONSTRAINT `Atelier_idArtisan_fkey` FOREIGN KEY (`idArtisan`) REFERENCES `Artisan`(`idArtisan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_idAtelier_fkey` FOREIGN KEY (`idAtelier`) REFERENCES `Atelier`(`idAtelier`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_idMembre_fkey` FOREIGN KEY (`idMembre`) REFERENCES `Membre`(`idMembre`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_idArtisan_fkey` FOREIGN KEY (`idArtisan`) REFERENCES `Artisan`(`idArtisan`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_idAtelier_fkey` FOREIGN KEY (`idAtelier`) REFERENCES `Atelier`(`idAtelier`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_idMembre_fkey` FOREIGN KEY (`idMembre`) REFERENCES `Membre`(`idMembre`) ON DELETE RESTRICT ON UPDATE CASCADE;
