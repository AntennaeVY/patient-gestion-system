import { prisma } from "../../../../../persistence/prisma/client";
import { UpdateDoctorShiftDto } from "../dtos/updateDoctorShift.dto";

export async function updateDoctorShiftService(
  id: string,
  updateDoctorShiftDto: UpdateDoctorShiftDto
) {
  const { day, start_time, end_time } = updateDoctorShiftDto;

  const shift = await prisma.doctorShift.update({
    where: {
      id: id,
    },
    data: {
      day: day,
      start_time: start_time,
      end_time: end_time,
    },
  });

  return shift;
}
