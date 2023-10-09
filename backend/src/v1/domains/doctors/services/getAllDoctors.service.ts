import { exclude, prisma } from "../../../persistence/prisma/client";

export async function getAllDoctorsService(skip?: number, take?: number, options?: any) {
  const doctors = await prisma.account.findMany({
    where: { role: "DOCTOR" },
    skip: skip,
    take: take,
    ...options
  });

  return doctors.map((doctor) => exclude(doctor, ["password"]));
}
