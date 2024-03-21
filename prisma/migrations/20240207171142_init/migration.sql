-- CreateEnum
CREATE TYPE "ERole" AS ENUM ('CUSTOMER', 'DRIVER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "EGender" AS ENUM ('Male', 'Female', 'Others');

-- CreateEnum
CREATE TYPE "EDriverStatus" AS ENUM ('Available', 'Unavailable', 'In_A_Trip', 'Accident', 'On_Vacation');

-- CreateEnum
CREATE TYPE "ERentType" AS ENUM ('Daily', 'Weekly', 'Monthly');

-- CreateEnum
CREATE TYPE "EFuelType" AS ENUM ('LPG', 'CNG', 'Petrol', 'Diesel', 'Gasoline', 'Kerosene');

-- CreateEnum
CREATE TYPE "EVehicleType" AS ENUM ('S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- CreateEnum
CREATE TYPE "EVehicleBrand" AS ENUM ('Toyota', 'Hyundai', 'Audi', 'Proton', 'Mitsubishi', 'BMW', 'Suzuki', 'Subaru', 'Nissan', 'Mercedes', 'Mazda', 'Honda');

-- CreateEnum
CREATE TYPE "EVehicleStatus" AS ENUM ('Available', 'In_A_Trip', 'Accident', 'Maintenance');

-- CreateEnum
CREATE TYPE "EBookingStatus" AS ENUM ('Pending', 'Approved', 'In_Trip', 'End');

-- CreateEnum
CREATE TYPE "EPaymentStatus" AS ENUM ('Unpaid', 'Partial', 'Paid');

-- CreateEnum
CREATE TYPE "ERentStatus" AS ENUM ('Pending', 'Active', 'End');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ERole" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "licenseNo" TEXT NOT NULL,
    "licenseExpire" TIMESTAMP(3) NOT NULL,
    "nidNo" TEXT NOT NULL,
    "status" "EDriverStatus" NOT NULL DEFAULT 'Available',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "address" TEXT,
    "image" TEXT,
    "contactNo" TEXT NOT NULL,
    "emergContact" TEXT,
    "gender" "EGender",
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "mileage" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    "images" TEXT[],
    "overview" TEXT NOT NULL,
    "basePrice" INTEGER NOT NULL,
    "fuelType" "EFuelType" NOT NULL,
    "passengerCapacity" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "plateNo" TEXT NOT NULL,
    "chassisNo" TEXT NOT NULL,
    "status" "EVehicleStatus" NOT NULL DEFAULT 'Available',
    "owner" TEXT,
    "vehicleType" "EVehicleType" NOT NULL,
    "brand" "EVehicleBrand" NOT NULL,
    "year" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "rentalRate" INTEGER NOT NULL,
    "driverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "pickUpDateTime" TIMESTAMP(3) NOT NULL,
    "returnDateTime" TIMESTAMP(3) NOT NULL,
    "pickUpLocation" TEXT NOT NULL,
    "dropOffLocation" TEXT NOT NULL,
    "rentType" "ERentType" NOT NULL,
    "bookingStatus" "EBookingStatus" NOT NULL DEFAULT 'Pending',
    "paymentStatus" "EPaymentStatus" NOT NULL DEFAULT 'Unpaid',
    "vehicleId" TEXT NOT NULL,
    "promoId" TEXT,
    "driverId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rents" (
    "id" TEXT NOT NULL,
    "downPayment" INTEGER,
    "discount" INTEGER,
    "startTime" DATE NOT NULL,
    "endTime" DATE NOT NULL,
    "overTime" DATE,
    "damageCompensation" INTEGER,
    "refund" INTEGER,
    "totalCost" INTEGER NOT NULL,
    "rentType" "ERentType" NOT NULL DEFAULT 'Daily',
    "rentStatus" "ERentStatus" NOT NULL DEFAULT 'Pending',
    "bookingId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_userId_key" ON "drivers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_driverId_key" ON "vehicles"("driverId");

-- CreateIndex
CREATE UNIQUE INDEX "rents_bookingId_key" ON "rents"("bookingId");

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
