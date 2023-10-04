-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PATIENT', 'RECEPCIONIST', 'DOCTOR');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "Account" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL,
    "avatar_url" VARCHAR(255) NOT NULL,
    "contact_info" TEXT NOT NULL,
    "birthday" DATE NOT NULL,
    "gender" "Gender" NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "suite" VARCHAR(50),
    "primary_phone" VARCHAR(20) NOT NULL,
    "secondary_phone" VARCHAR(20),

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" VARCHAR(50) NOT NULL,
    "signature_url" VARCHAR(255) NOT NULL,
    "certificate_url" VARCHAR(255) NOT NULL,
    "account_id" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "report_url" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "room" VARCHAR(50) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorShift" (
    "id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "day" "Weekday" NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,

    CONSTRAINT "DoctorShift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_avatar_url_key" ON "Account"("avatar_url");

-- CreateIndex
CREATE UNIQUE INDEX "Account_contact_info_key" ON "Account"("contact_info");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_primary_phone_key" ON "Contact"("primary_phone");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_signature_url_key" ON "Doctor"("signature_url");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_certificate_url_key" ON "Doctor"("certificate_url");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_account_id_key" ON "Doctor"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_report_url_key" ON "Appointment"("report_url");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_contact_info_fkey" FOREIGN KEY ("contact_info") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorShift" ADD CONSTRAINT "DoctorShift_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
