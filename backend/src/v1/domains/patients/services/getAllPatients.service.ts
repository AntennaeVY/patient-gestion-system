import { exclude, prisma } from "../../../persistence/prisma/client";

export async function getAllPatientsService(skip?: number, take?: number) {
  const patients = await prisma.account.findMany({
    where: { role: "PATIENT" },
    include: { contact: true },
    skip: skip,
    take: take
  });

  return patients.map((patient) => exclude(patient, ["password"]));
}
