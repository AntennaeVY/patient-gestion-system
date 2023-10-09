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

  await prisma.account.deleteMany({
    where: {
      id: id,
      contact: { id: doctor.contact_info },
      doctor: { account_id: doctor.id },
    },
  });

  const doctorWithoutPassword = exclude(doctor, ["password"]);

  return doctorWithoutPassword;
}
