import { randomUUID } from "crypto";
import { prisma } from "../../../persistence/prisma/client";
import { CreateAppointmentDto } from "../dtos/createAppointment.dto";

export async function createAppointmentService(
  createAppointmentDto: CreateAppointmentDto
) {
  const { patient_id, doctor_id, services, ...appointmentData } =
    createAppointmentDto;

  const id = randomUUID();

  const appointmentPromise = prisma.appointment.create({
    data: {
      ...appointmentData,
      id: id,
      doctor: {
        connect: {
          account_id: doctor_id,
        },
      },
      patient: {
        connect: {
          id: patient_id,
        },
      },
    },
  });

  const appointmentOnServicesPromises = services.map((service_id) => {
    return prisma.appointmentsOnServices.create({
      data: {
        appointment_id: id,
        service_id: service_id,
      },
    });
  });

  await prisma.$transaction([
    appointmentPromise,
    ...appointmentOnServicesPromises,
  ]);
}
