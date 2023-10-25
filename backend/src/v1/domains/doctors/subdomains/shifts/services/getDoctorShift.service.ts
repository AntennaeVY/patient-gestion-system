import { prisma } from "../../../../../persistence/prisma/client";

export async function getDoctorShiftService(id: string) {
  const shift = await prisma.doctorShift.findUnique({ where: { id: id } });

  return shift;
}
