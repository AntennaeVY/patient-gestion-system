import { prisma } from "../../../persistence/prisma/client";

export async function deleteServiceService(id: string) {
  const service = await prisma.service.delete({ where: { id: id } });

  return service;
}
