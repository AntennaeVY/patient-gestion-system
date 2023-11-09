import { prisma } from "../../../persistence/prisma/client";

export async function deleteServiceService(id: string) {
  const service = await prisma.service.findUnique({
    where: {
      id: id,
    },
  });

  if (!service) return null;

  const appointmentServicesPromise = prisma.appointmentsOnServices.deleteMany({
    where: {
      service_id: id,
    },
  });

  const doctorServicesPromise = prisma.doctorsOnServices.deleteMany({
    where: {
      service_id: id,
    },
  });

  const servicePromise = prisma.service.delete({
    where: {
      id: id,
    },
  });

  await prisma.$transaction([
    appointmentServicesPromise,
    doctorServicesPromise,
    servicePromise,
  ]);

  return service;
}
