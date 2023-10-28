import { exclude, prisma } from "../../../persistence/prisma/client";

export async function deleteAppointmentService(id: string) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: id },
	include: {
		services: {
			select: {
				service: {
					select: {
						id: true,
						name: true, 
						price: true,
					}
				},
			}
		},
		doctor: {
			select: {
				account: {
					select: {
						id: true,
						name: true, 
						last_name: true,
					}
				}
			}
		},
		patient: {
			select: {
				id: true,
				name: true, 
				last_name: true
			}
		}
	}
  });

  if (!appointment) return null;

  await prisma.appointment.deleteMany({
	where: {
		id: id
	}
  });


  return appointment
}
