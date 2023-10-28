import { prisma } from "../../../persistence/prisma/client";

export async function getAllAppointmentsService(options: {
  skip?: number;
  take?: number;
  doctor_id?: string;
  patient_id?: string;
}) {
  const { skip, take, doctor_id, patient_id } = options;

  const appointments = await prisma.appointment.findMany({
    where: {
      doctor_id: doctor_id,
      patient_id: patient_id,
    },
    include: {
      services: {
        select: {
          service: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
      doctor: {
        select: {
          account: {
            select: {
              id: true,
              name: true,
              last_name: true,
            },
          },
        },
      },
      patient: {
        select: {
          id: true,
          name: true,
          last_name: true,
        },
      },
    },
    skip: skip,
    take: take,
  });

  if (appointments.length == 0) return null;

  return appointments;
}
