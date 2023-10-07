-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_contact_info_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentsOnServices" DROP CONSTRAINT "AppointmentsOnServices_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentsOnServices" DROP CONSTRAINT "AppointmentsOnServices_service_id_fkey";

-- DropForeignKey
ALTER TABLE "DoctorsOnServices" DROP CONSTRAINT "DoctorsOnServices_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "DoctorsOnServices" DROP CONSTRAINT "DoctorsOnServices_service_id_fkey";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_contact_info_fkey" FOREIGN KEY ("contact_info") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorsOnServices" ADD CONSTRAINT "DoctorsOnServices_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorsOnServices" ADD CONSTRAINT "DoctorsOnServices_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsOnServices" ADD CONSTRAINT "AppointmentsOnServices_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsOnServices" ADD CONSTRAINT "AppointmentsOnServices_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
