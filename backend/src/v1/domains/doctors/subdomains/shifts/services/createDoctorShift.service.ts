import { prisma } from "../../../../../persistence/prisma/client";
import { CreateDoctorShiftDto } from "../dtos/createDoctorShift.dto";

export async function createDoctorShiftService(
  doctorId: string,
  createDoctorShiftDto: CreateDoctorShiftDto
) {
  const { day, start_time, end_time } = createDoctorShiftDto;

  const shift = await prisma.doctorShift.create({
    data: {
      day: day,
      start_time: start_time,
      end_time: end_time,
      doctor: {
        connect: { account_id: doctorId },
      },
    },
  });

  return shift;
}
