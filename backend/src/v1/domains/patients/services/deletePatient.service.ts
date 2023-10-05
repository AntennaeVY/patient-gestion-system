import { exclude, prisma } from "../../../persistence/prisma/client";

export async function deletePatientService(id: string) {
  const patient = await prisma.account.delete({ where: { id: id } });

  await prisma.contact.delete({ where: { id: patient.contact_info } });

  const patientWithoutPassword = exclude(patient, ["password"]);

  return patientWithoutPassword;
}
