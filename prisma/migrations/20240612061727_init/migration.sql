-- CreateTable
CREATE TABLE `APUC_studentprofile` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `INSTITUTIONCODE` VARCHAR(10) NULL,
    `APPLNO` VARCHAR(15) NULL,
    `APPLDATE` VARCHAR(12) NULL,
    `AcademicYear` VARCHAR(7) NULL,
    `StudentType` VARCHAR(6) NULL,
    `StudentName` VARCHAR(255) NULL,
    `AdmissionNo` VARCHAR(25) NULL,
    `Class` VARCHAR(100) NULL,
    `SECTION` VARCHAR(35) NULL,
    `DOB` VARCHAR(12) NULL,
    `Gender` VARCHAR(6) NULL,
    `CONTACT` VARCHAR(10) NULL,
    `EmailID` VARCHAR(255) NULL,
    `FirstName` VARCHAR(255) NULL,
    `LastName` VARCHAR(255) NULL,
    `FatherName` VARCHAR(255) NULL,
    `MotherName` VARCHAR(255) NULL,
    `POB` VARCHAR(255) NULL,
    `MotherTounge` VARCHAR(255) NULL,
    `Nationality` VARCHAR(6) NULL,
    `Religion` VARCHAR(25) NULL,
    `Caste` VARCHAR(25) NULL,
    `SubCaste` VARCHAR(25) NULL,
    `AadharNo` VARCHAR(16) NULL,
    `StsNo` VARCHAR(25) NULL,
    `AcademicFeeStructure` VARCHAR(255) NULL,
    `FEEAMOUNT` VARCHAR(25) NULL,
    `PrevCollegeName` VARCHAR(255) NULL,
    `Remarks` VARCHAR(255) NULL,
    `StudentStatus` VARCHAR(255) NULL,
    `FlatNo` VARCHAR(255) NULL,
    `Street` VARCHAR(255) NULL,
    `Town` VARCHAR(255) NULL,
    `District` VARCHAR(255) NULL,
    `Pincode` VARCHAR(6) NULL,
    `LedgerName` VARCHAR(255) NULL,
    `DueStatus` VARCHAR(3) NULL,
    `ProfileCreateBy` VARCHAR(255) NULL,
    `PROFILECREATEDON` VARCHAR(12) NULL,
    `PROFILECREATETIME` VARCHAR(30) NULL,
    `StudentOldorNew` VARCHAR(10) NULL,
    `LedFlag` VARCHAR(3) NULL,
    `state` VARCHAR(50) NULL,
    `studentid` VARCHAR(30) NULL,
    `SMSContact` VARCHAR(10) NULL,
    `HostelName` VARCHAR(255) NULL,
    `WardenName` VARCHAR(255) NULL,
    `ReportingDate` DATE NULL,
    `hostelId` INTEGER NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hostel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(10) NOT NULL,
    `email` VARCHAR(10) NOT NULL,
    `password` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `APUC_studentprofile` ADD CONSTRAINT `APUC_studentprofile_hostelId_fkey` FOREIGN KEY (`hostelId`) REFERENCES `Hostel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
