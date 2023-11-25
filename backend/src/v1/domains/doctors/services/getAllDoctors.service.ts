import { exclude, prisma } from "../../../persistence/prisma/client";

export async function getAllDoctorsService(page: number, size: number, options?: any) {
  const doctors = await prisma.account.findMany({
    where: { role: "DOCTOR" },
    skip: size * (page - 1),
    take: size,
    ...options
  });

  const count = await prisma.doctor.count();
  const pages = count / size;

  if (doctors.length == 0) return null;

  const doctorsWithoutPassword = doctors.map((doctor) => exclude(doctor, ["password"]));

  return {
    pagination: {
      total_records: count,
      current_page: page,
      total_pages: pages,
      next_page: page == pages ? null : page + 1,
      previous_page: page == 1 ? null : page - 1,
    },
    doctors: doctorsWithoutPassword,
  };
}
