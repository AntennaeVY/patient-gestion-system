import { prisma } from "../../../persistence/prisma/client";

export async function getServiceService(id: string) {
  const serviceOrNull = await prisma.service.findUnique({ where: { id: id } });

  return serviceOrNull;
}
