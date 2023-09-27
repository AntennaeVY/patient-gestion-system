-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('BOOKED', 'PENDING', 'DONE');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "status" "AppointmentStatus" NOT NULL DEFAULT 'BOOKED';
