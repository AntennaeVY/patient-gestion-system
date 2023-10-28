-- DropIndex
DROP INDEX "Appointment_report_url_key";

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "report_url" DROP NOT NULL;
