import { exclude, prisma } from "../../../persistence/prisma/client";

export async function getAllPatientsService(page: number, size: number) {
  const patients = await prisma.account.findMany({
    where: { role: "PATIENT" },
    include: { contact: true },
    skip: size * (page - 1),
    take: size
  });

  const count = await prisma.account.count({where: {role: "PATIENT"}});
  const pages = count / size;

  if (patients.length == 0) return null;

  const patientsWithoutPassword = patients.map((patient) =>
    exclude(patient, ["password"])
  );

  return {
    pagination: {
      total_records: count,
      current_page: page,
      total_pages: pages,
      next_page: page == pages ? null : page + 1,
      previous_page: page == 1 ? null : page - 1,
    },
    patients: patientsWithoutPassword,
  };
}
