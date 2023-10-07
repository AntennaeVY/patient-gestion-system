import { prisma } from "../../../persistence/prisma/client";
import { UpdateServiceDto } from "../dtos/updateService.dto";

export async function updateServiceService(
  id: string,
  updateServiceDto: UpdateServiceDto
) {
  const service = await prisma.service.update({
    where: { id: id },
    data: updateServiceDto,
  });

  return service;
}
