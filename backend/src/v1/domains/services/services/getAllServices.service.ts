import { prisma } from "../../../persistence/prisma/client";

export async function getAllServicesService(skip?: number, take?: number) {
  const services = await prisma.service.findMany({skip: skip, take: take});

  return services;
}
