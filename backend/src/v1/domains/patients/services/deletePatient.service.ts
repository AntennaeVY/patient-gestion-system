import { exclude, prisma } from "../../../persistence/prisma/client";

export async function deletePatientService(id: string) {
  const patient = await prisma.account.findUnique({
    where: { id: id, role: "PATIENT" },
    include: {
      contact: true,
    },
  });

  if (!patient) return null;

  await prisma.account.deleteMany({
    where: { id: id, contact: { id: patient?.contact_info } },
  });

  const patientWithoutPassword = exclude(patient, ["password"]);

  return patientWithoutPassword;
}
