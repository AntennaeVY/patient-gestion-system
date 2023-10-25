import { prisma } from "../../../../../persistence/prisma/client";

export async function getAllDoctorShiftsService(
  doctorId: string,
  skip?: number,
  take?: number, 
) {
  const shifts = await prisma.doctorShift.findMany({
    where: { doctor_id: doctorId },
    skip: skip, 
    take: take
  });

  return shifts;
}
