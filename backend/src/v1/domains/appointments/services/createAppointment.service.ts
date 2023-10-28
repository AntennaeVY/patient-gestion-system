import { randomUUID } from "crypto";
import { prisma } from "../../../persistence/prisma/client";
import { CreateAppointmentDto } from "../dtos/createAppointment.dto";

export async function createAppointmentService(
  createAppointmentDto: CreateAppointmentDto
) {
  const { patient_id, doctor_id, services, ...appointmentData } =
    createAppointmentDto;

  const id = randomUUID();

  const connectServices = services.map((service_id) => {
    return {
      appointment_id_service_id: {
    	appointment_id: id,
        service_id: service_id,
      },
    };
  });

  const appointment = await prisma.appointment.create({
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
	  services: {
		connect: connectServices
	  }
    },
  });

  return appointment;
}
