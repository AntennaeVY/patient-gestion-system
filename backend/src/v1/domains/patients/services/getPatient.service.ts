import { exclude, prisma } from "../../../persistence/prisma/client";

export async function getPatientService(id: string) {
  const patientOrNull = await prisma.account.findUnique({
    where: {
      id: id,
      role: "PATIENT"
    },
    include: {
      contact: true
    }
  });

  if (!patientOrNull)
    return null;

  const patientWithoutPassword = exclude(patientOrNull, ["password"]);

  return patientWithoutPassword;
}
