/*
  Warnings:

  - Changed the type of `start_time` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `end_time` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `start_time` on the `DoctorShift` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `end_time` on the `DoctorShift` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `duration` on the `Service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "start_time",
ADD COLUMN     "start_time" VARCHAR(10) NOT NULL,
DROP COLUMN "end_time",
ADD COLUMN     "end_time" VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE "DoctorShift" DROP COLUMN "start_time",
ADD COLUMN     "start_time" VARCHAR(10) NOT NULL,
DROP COLUMN "end_time",
ADD COLUMN     "end_time" VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "duration",
ADD COLUMN     "duration" VARCHAR(10) NOT NULL;
