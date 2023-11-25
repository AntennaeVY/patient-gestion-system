import { exclude, prisma } from "../../../persistence/prisma/client";

export async function deleteDoctorService(id: string) {
  const doctor = await prisma.account.findUnique({
    where: { id: id, role: "DOCTOR" },
    include: {
      contact: true,
      doctor: true,
    },
  });

  if (!doctor) return null;

  const contactPromise = prisma.contact.delete({
    where: {
      id: doctor.contact_info,
    },
  });

  const doctorPromise = prisma.doctor.delete({
    where: {
      account_id: doctor.id,
    },
  });

  const accountPromise = prisma.account.delete({
    where: {
      id: id,
    },
  });

  const doctorServicesPromise = prisma.doctorsOnServices.deleteMany({
    where: {
      doctor_id: id,
    },
  });

  const doctorShiftsPromise = prisma.doctorShift.deleteMany({
    where: {
      doctor_id: id,
    },
  });

  const doctorAppointments = prisma.appointment.deleteMany({
    where: {
      doctor_id: id,
    },
  });

  await prisma.$transaction([
    doctorServicesPromise,
    doctorShiftsPromise,
    doctorAppointments,
    doctorPromise,
    accountPromise,
    contactPromise,
  ]);

  const doctorWithoutPassword = exclude(doctor, ["password"]);

  return doctorWithoutPassword;
}
