import { prisma } from "../../../persistence/prisma/client";

export async function getAllAppointmentsService(options: {
  page: number;
  size: number;
  doctor_id?: string;
  patient_id?: string;
}) {
  const { page, size, doctor_id, patient_id } = options;

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
    skip: size * (page - 1),
    take: size,
  });

  const count = await prisma.appointment.count();
  const pages = count / size;

  if (appointments.length == 0) return null;

  return {
    pagination: {
      total_records: count,
      current_page: page,
      total_pages: pages,
      next_page: page == pages ? null : page + 1,
      previous_page: page == 1 ? null : page - 1,
    },
    appointments: appointments,
  };
}
