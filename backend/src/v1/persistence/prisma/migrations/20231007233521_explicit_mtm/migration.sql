/*
  Warnings:

  - You are about to drop the `_AppointmentToService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DoctorToService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_contact_info_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentToService" DROP CONSTRAINT "_AppointmentToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentToService" DROP CONSTRAINT "_AppointmentToService_B_fkey";

-- DropForeignKey
ALTER TABLE "_DoctorToService" DROP CONSTRAINT "_DoctorToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_DoctorToService" DROP CONSTRAINT "_DoctorToService_B_fkey";

-- DropTable
DROP TABLE "_AppointmentToService";

-- DropTable
DROP TABLE "_DoctorToService";

-- CreateTable
CREATE TABLE "DoctorsOnServices" (
    "doctor_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "DoctorsOnServices_pkey" PRIMARY KEY ("doctor_id","service_id")
);

-- CreateTable
CREATE TABLE "AppointmentsOnServices" (
    "appointment_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "AppointmentsOnServices_pkey" PRIMARY KEY ("appointment_id","service_id")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_contact_info_fkey" FOREIGN KEY ("contact_info") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorsOnServices" ADD CONSTRAINT "DoctorsOnServices_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorsOnServices" ADD CONSTRAINT "DoctorsOnServices_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsOnServices" ADD CONSTRAINT "AppointmentsOnServices_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsOnServices" ADD CONSTRAINT "AppointmentsOnServices_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
