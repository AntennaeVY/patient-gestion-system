import { prisma } from "../../../persistence/prisma/client";

export async function getAppointmentService(id: string) {
  const appointmentOrNull = await prisma.appointment.findUnique({
    where: {
      id: id,
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
      patient: {
        select: {
          id: true,
          name: true,
          last_name: true,
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
    },
  });

  return appointmentOrNull;
}
