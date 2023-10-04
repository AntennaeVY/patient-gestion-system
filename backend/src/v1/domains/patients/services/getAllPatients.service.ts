import { exclude, prisma } from "../../../persistence/prisma/client";

export async function getAllPatientsService() {
  const patients = await prisma.account.findMany({
    where: { role: "PATIENT" },
	include: { contact: true }
  });

  return patients.map(patient => exclude(patient, ["password"]));
}
