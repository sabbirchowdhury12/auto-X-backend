/*
  Warnings:

  - The values [In_Trip] on the enum `EBookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Gasoline,Kerosene] on the enum `EFuelType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Partial] on the enum `EPaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Hyundai,Proton,Mitsubishi,Suzuki,Subaru,Mercedes,Mazda,Honda] on the enum `EVehicleBrand` will be removed. If these variants are still used in the database, this will fail.
  - The values [S,XXXL] on the enum `EVehicleType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `driverId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `promoId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `rentType` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the `rents` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pickUpTime` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EBookingStatus_new" AS ENUM ('Pending', 'Approved', 'End');
ALTER TABLE "bookings" ALTER COLUMN "bookingStatus" DROP DEFAULT;
ALTER TABLE "bookings" ALTER COLUMN "bookingStatus" TYPE "EBookingStatus_new" USING ("bookingStatus"::text::"EBookingStatus_new");
ALTER TYPE "EBookingStatus" RENAME TO "EBookingStatus_old";
ALTER TYPE "EBookingStatus_new" RENAME TO "EBookingStatus";
DROP TYPE "EBookingStatus_old";
ALTER TABLE "bookings" ALTER COLUMN "bookingStatus" SET DEFAULT 'Pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EFuelType_new" AS ENUM ('LPG', 'CNG', 'Petrol', 'Diesel');
ALTER TABLE "vehicles" ALTER COLUMN "fuelType" TYPE "EFuelType_new" USING ("fuelType"::text::"EFuelType_new");
ALTER TYPE "EFuelType" RENAME TO "EFuelType_old";
ALTER TYPE "EFuelType_new" RENAME TO "EFuelType";
DROP TYPE "EFuelType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EPaymentStatus_new" AS ENUM ('Unpaid', 'Paid');
ALTER TABLE "bookings" ALTER COLUMN "paymentStatus" DROP DEFAULT;
ALTER TABLE "bookings" ALTER COLUMN "paymentStatus" TYPE "EPaymentStatus_new" USING ("paymentStatus"::text::"EPaymentStatus_new");
ALTER TYPE "EPaymentStatus" RENAME TO "EPaymentStatus_old";
ALTER TYPE "EPaymentStatus_new" RENAME TO "EPaymentStatus";
DROP TYPE "EPaymentStatus_old";
ALTER TABLE "bookings" ALTER COLUMN "paymentStatus" SET DEFAULT 'Unpaid';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EVehicleBrand_new" AS ENUM ('Toyota', 'Audi', 'BMW', 'Nissan');
ALTER TABLE "vehicles" ALTER COLUMN "brand" TYPE "EVehicleBrand_new" USING ("brand"::text::"EVehicleBrand_new");
ALTER TYPE "EVehicleBrand" RENAME TO "EVehicleBrand_old";
ALTER TYPE "EVehicleBrand_new" RENAME TO "EVehicleBrand";
DROP TYPE "EVehicleBrand_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EVehicleType_new" AS ENUM ('M', 'L', 'XL', 'XXL');
ALTER TABLE "vehicles" ALTER COLUMN "vehicleType" TYPE "EVehicleType_new" USING ("vehicleType"::text::"EVehicleType_new");
ALTER TYPE "EVehicleType" RENAME TO "EVehicleType_old";
ALTER TYPE "EVehicleType_new" RENAME TO "EVehicleType";
DROP TYPE "EVehicleType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_driverId_fkey";

-- DropForeignKey
ALTER TABLE "rents" DROP CONSTRAINT "rents_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "rents" DROP CONSTRAINT "rents_driverId_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "driverId",
DROP COLUMN "promoId",
DROP COLUMN "rentType",
ADD COLUMN     "pickUpTime" TEXT NOT NULL;

-- DropTable
DROP TABLE "rents";

-- DropEnum
DROP TYPE "ERentStatus";

-- DropEnum
DROP TYPE "ERentType";
