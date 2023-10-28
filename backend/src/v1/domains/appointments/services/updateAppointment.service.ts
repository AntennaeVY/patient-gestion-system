import { prisma } from "../../../persistence/prisma/client";
import { UpdateAppointmentDto } from "../dtos/updateAppointment.dto";

export async function updateAppointmentService(
  id: string,
  updateAppointmentDto: UpdateAppointmentDto
) {
  const { patient_id, doctor_id, services, ...appointmentData } =
    updateAppointmentDto;

  let connectServices = {};

  if (services)
    connectServices = {
      deleteMany: {},
      connect: services.map((service_id) => {
        return {
          appointment_id_service_id: {
            appointment_id: id,
            service_id: service_id,
          },
        };
      }),
    };

  const appointment = await prisma.appointment.update({
    where: {
      id: id,
    },
    data: {
      ...appointmentData,
      doctor: {
        update: {
          account_id: doctor_id,
        },
      },
      patient: {
        update: {
          id: patient_id,
        },
      },
	  ...connectServices
    },
  });

  return appointment;
}
