import { prisma } from "../../../../../persistence/prisma/client";

export async function deleteDoctorShiftService(id: string) {
  const shift = await prisma.doctorShift.findUnique({ where: { id: id } });

  if (!shift) return null;

  await prisma.doctorShift.delete({ where: { id: id } });

  return shift;
}
